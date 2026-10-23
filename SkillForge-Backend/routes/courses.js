const express = require("express");
const repository = require("../services/courseRepository");

const router = express.Router();

function courseSummary(course) {
    return {
        id: course.id,
        title: course.title,
        category: course.category,
        level: course.level,
        duration: course.duration,
        description: course.description,
        skills: course.skills,
        moduleCount: course.modules.length,
        assessmentQuestions: course.quiz.length,
        source: course.source || "curated",
        learningGoal: course.learningGoal,
        learningOutcomes: course.learningOutcomes
    };
}

router.get("/courses", async (req, res, next) => {
    try {
        const { category, level, search } = req.query;
        let result = await repository.getAccessibleCourses(req.session?.userId);

        if (category) {
            result = result.filter((course) => course.category.toLowerCase() === String(category).toLowerCase());
        }

        if (level) {
            result = result.filter((course) => course.level.toLowerCase() === String(level).toLowerCase());
        }

        if (search) {
            const value = String(search).toLowerCase();
            result = result.filter((course) =>
                [course.title, course.description, course.category, ...course.skills]
                    .join(" ")
                    .toLowerCase()
                    .includes(value)
            );
        }

        res.json({ courses: result.map(courseSummary) });
    } catch (error) { next(error); }
});

router.get("/courses/:courseId", async (req, res, next) => {
    try {
        const course = await repository.getAccessibleCourseById(req.session?.userId, req.params.courseId);

        if (!course) {
            return res.status(404).json({ message: "Course not found." });
        }

        res.json({
            course: {
                ...courseSummary(course),
                interests: course.interests,
                nextCourseIds: course.nextCourseIds,
                modules: course.modules
            }
        });
    } catch (error) { next(error); }
});

module.exports = router;
