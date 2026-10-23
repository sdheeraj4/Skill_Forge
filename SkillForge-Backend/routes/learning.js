const express = require("express");
const db = require("../db");
const repository = require("../services/courseRepository");
const requireAuth = require("../middleware/auth");
const { evaluateQuiz, getPerformance, completedModuleCounts, latestResultsByCourse } = require("../utils/learningEngine");

const router = express.Router();
router.use(requireAuth);


async function ensureEnrollment(userId, courseId) {
    const [rows] = await db.execute(
        "SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?",
        [userId, courseId]
    );
    return rows.length > 0;
}

router.post("/enroll/:courseId", async (req, res, next) => {
    try {
        const course = await repository.getAccessibleCourseById(req.session.userId, req.params.courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found." });
        }

        await db.execute(
            `INSERT INTO enrollments (user_id, course_id)
             VALUES (?, ?)
             ON DUPLICATE KEY UPDATE enrolled_at = enrolled_at`,
            [req.session.userId, course.id]
        );

        res.status(201).json({ message: `Enrolled in ${course.title}.`, courseId: course.id });
    } catch (error) {
        next(error);
    }
});

router.get("/my-learning", async (req, res, next) => {
    try {
        const userId = req.session.userId;
        const [enrollments] = await db.execute(
            "SELECT course_id, enrolled_at FROM enrollments WHERE user_id = ? ORDER BY enrolled_at DESC",
            [userId]
        );
        const [progressRows] = await db.execute(
            "SELECT course_id, module_id, completed FROM progress WHERE user_id = ?",
            [userId]
        );
        const [quizRows] = await db.execute(
            "SELECT * FROM quiz_results WHERE user_id = ? ORDER BY submitted_at DESC, id DESC",
            [userId]
        );

        const moduleCounts = completedModuleCounts(progressRows);
        const latest = latestResultsByCourse(quizRows);

        const courses = await repository.getAccessibleCourses(userId);
        const learning = enrollments.map((enrollment) => {
            const course = courses.find(item => item.id === enrollment.course_id);
            if (!course) {
                return null;
            }

            const completedIds = [...(moduleCounts.get(course.id) || new Set())].filter(id => course.modules.some(m => m.id === id));
            const completedModules = completedIds.length;
            const progressPercent = Math.round((completedModules / course.modules.length) * 100);
            const result = latest.get(course.id);
            const score = result ? Number(result.score) : null;
            const status = completedModules !== course.modules.length
                ? "In Progress"
                : result
                    ? score >= 60 ? "Completed" : "Revision Required"
                    : "Assessment Pending";

            return {
                courseId: course.id,
                title: course.title,
                level: course.level,
                category: course.category,
                completedModules,
                completedModuleIds: completedIds,
                totalModules: course.modules.length,
                progressPercent,
                assessmentScore: score,
                performance: result ? getPerformance(score).label : null,
                status,
                enrolledAt: enrollment.enrolled_at
            };
        }).filter(Boolean);

        res.json({ courses: learning });
    } catch (error) {
        next(error);
    }
});

router.post("/progress", async (req, res, next) => {
    try {
        const { courseId, moduleId, completed = true } = req.body;
        if (typeof completed !== "boolean") return res.status(400).json({ message: "Completed must be a boolean." });
        const course = await repository.getAccessibleCourseById(req.session.userId, courseId);

        if (!course) {
            return res.status(404).json({ message: "Course not found." });
        }

        if (!course.modules.some((module) => module.id === moduleId)) {
            return res.status(400).json({ message: "Module does not belong to this course." });
        }

        if (!(await ensureEnrollment(req.session.userId, courseId))) {
            return res.status(403).json({ message: "Enroll in this course before updating progress." });
        }

        await db.execute(
            `INSERT INTO progress (user_id, course_id, module_id, completed, completed_at)
             VALUES (?, ?, ?, ?, CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE NULL END)
             ON DUPLICATE KEY UPDATE
                completed = VALUES(completed),
                completed_at = CASE WHEN VALUES(completed) = 1 THEN CURRENT_TIMESTAMP ELSE NULL END`,
            [req.session.userId, courseId, moduleId, completed ? 1 : 0, completed ? 1 : 0]
        );

        const [rows] = await db.execute(
            "SELECT module_id FROM progress WHERE user_id = ? AND course_id = ? AND completed = 1",
            [req.session.userId, courseId]
        );

        res.json({
            message: completed ? "Module marked complete." : "Module marked incomplete.",
            completedModules: rows.length,
            totalModules: course.modules.length,
            progressPercent: Math.round((rows.length / course.modules.length) * 100)
        });
    } catch (error) {
        next(error);
    }
});

router.get("/quiz/:courseId", async (req, res, next) => {
    try {
        const course = await repository.getAccessibleCourseById(req.session.userId, req.params.courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found." });
        }

        if (!(await ensureEnrollment(req.session.userId, course.id))) {
            return res.status(403).json({ message: "Enroll in the course before taking its assessment." });
        }

        const [completedRows] = await db.execute(
            "SELECT module_id FROM progress WHERE user_id = ? AND course_id = ? AND completed = 1",
            [req.session.userId, course.id]
        );

        const completedIds = new Set(completedRows.map((row) => row.module_id));
        const allModulesComplete = course.modules.every((module) => completedIds.has(module.id));

        if (!allModulesComplete) {
            return res.status(403).json({
                message: `Complete all ${course.modules.length} modules before taking the course assessment.`,
                completedModules: completedIds.size,
                totalModules: course.modules.length
            });
        }

        const questions = course.quiz.map(({ id, moduleId, difficulty, topic, question, options }) => ({ id, moduleId, difficulty, topic, question, options }));
        res.json({
            courseId: course.id,
            courseTitle: course.title,
            totalQuestions: questions.length,
            difficultyPattern: "3 Easy, 4 Medium, 3 Hard",
            questions
        });
    } catch (error) {
        next(error);
    }
});

router.post("/quiz/submit", async (req, res, next) => {
    try {
        const { courseId, answers } = req.body;
        const course = await repository.getAccessibleCourseById(req.session.userId, courseId);

        if (!course) {
            return res.status(404).json({ message: "Course not found." });
        }

        if (!(await ensureEnrollment(req.session.userId, course.id))) {
            return res.status(403).json({ message: "Enroll in the course before submitting its assessment." });
        }

        const [completedRows] = await db.execute(
            "SELECT module_id FROM progress WHERE user_id = ? AND course_id = ? AND completed = 1",
            [req.session.userId, course.id]
        );
        const completedIds = new Set(completedRows.map((row) => row.module_id));

        if (!course.modules.every((module) => completedIds.has(module.id))) {
            return res.status(403).json({ message: "Complete all course modules before submitting the assessment." });
        }

        let evaluation;
        try {
            evaluation = evaluateQuiz(course, answers);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }

        await db.execute(
            `INSERT INTO quiz_results
             (user_id, course_id, score, correct_answers, total_questions, performance, weak_modules, answers_json)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                req.session.userId,
                course.id,
                evaluation.score,
                evaluation.correctAnswers,
                evaluation.totalQuestions,
                evaluation.performance.label,
                JSON.stringify(evaluation.weakModules),
                JSON.stringify(evaluation.review)
            ]
        );

        const courses = await repository.getAccessibleCourses(req.session.userId);
        const nextCourses = evaluation.score >= 75
            ? course.nextCourseIds.map((id) => courses.find((item) => item.id === id)).filter(Boolean).map((item) => ({ id: item.id, title: item.title }))
            : [];

        res.status(201).json({
            courseId: course.id,
            courseTitle: course.title,
            score: evaluation.score,
            correctAnswers: evaluation.correctAnswers,
            totalQuestions: evaluation.totalQuestions,
            performance: evaluation.performance.label,
            action: evaluation.performance.action,
            weakModules: evaluation.weakModules,
            nextCourses,
            message: evaluation.score >= 75
                ? "Assessment completed. You are ready for the next recommended course."
                : evaluation.score >= 60
                    ? "Assessment completed. Review weak topics before continuing."
                    : "Assessment completed. Revisit the weak modules and retake the assessment."
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
