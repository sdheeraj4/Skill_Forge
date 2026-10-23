const express = require("express");
const db = require("../db");
const requireAuth = require("../middleware/auth");
const { buildRecommendations, buildReportCard } = require("../utils/learningEngine");

const repository = require("../services/courseRepository");
const router = express.Router();
router.use(requireAuth);

async function loadUserState(userId) {
    const [[userRows], [enrollmentRows], [progressRows], [quizRows]] = await Promise.all([
        db.execute("SELECT id, name, email, interests, skill_level, learning_goal FROM users WHERE id = ?", [userId]),
        db.execute("SELECT course_id, enrolled_at FROM enrollments WHERE user_id = ? ORDER BY enrolled_at DESC", [userId]),
        db.execute("SELECT course_id, module_id, completed FROM progress WHERE user_id = ?", [userId]),
        db.execute("SELECT * FROM quiz_results WHERE user_id = ? ORDER BY submitted_at DESC, id DESC", [userId])
    ]);

    if (!userRows.length) {
        const error = new Error("User not found.");
        error.status = 404;
        throw error;
    }

    return {
        courses: await repository.getAccessibleCourses(userId),
        user: userRows[0],
        enrollmentRows,
        progressRows,
        quizRows
    };
}

router.get("/recommendations", async (req, res, next) => {
    try {
        const state = await loadUserState(req.session.userId);
        const recommendations = buildRecommendations(state);
        res.json({ recommendations });
    } catch (error) {
        next(error);
    }
});

router.get("/dashboard", async (req, res, next) => {
    try {
        const state = await loadUserState(req.session.userId);
        const report = buildReportCard(state);
        const recommendations = buildRecommendations(state);

        res.json({
            learner: report.candidate,
            summary: report.summary,
            currentCourses: report.courses.filter((course) => course.status !== "Completed"),
            recentResults: report.courses.filter((course) => course.bestScore !== null),
            recommendations
        });
    } catch (error) {
        next(error);
    }
});

router.get("/report-card", async (req, res, next) => {
    try {
        const state = await loadUserState(req.session.userId);
        const reportCard = buildReportCard(state);
        const recommendations = buildRecommendations({ ...state, limit: 3 });

        res.json({
            generatedAt: new Date().toISOString(),
            reportCard,
            recommendations
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
