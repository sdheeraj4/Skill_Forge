const express = require('express');
const requireAuth = require('../middleware/auth');
const repository = require('../services/courseRepository');
const { generateCourse } = require('../services/courseGenerator');
const { inputSchema } = require('../services/courseValidation');

function createRouter({ generate = generateCourse, repo = repository } = {}) {
    const router = express.Router();
    const active = new Set();
    router.post('/generated-courses', requireAuth, async (req, res, next) => {
        const parsed = inputSchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).json({ message: 'Enter a meaningful topic (2–100 characters), a level, a goal (10–600 characters) and 5–10 modules.' });
        const userId = req.session.userId;
        if (active.has(userId)) return res.status(429).json({ message: 'Your course is already being generated. Please wait.' });
        active.add(userId);
        try {
            const { course, source } = await generate(parsed.data);
            const courseId = await repo.saveGeneratedCourse(userId, parsed.data, course, source);
            res.status(201).json({ courseId, source, message: 'Course created and added to My Learning.' });
        } catch (error) { next(error); }
        finally { active.delete(userId); }
    });
    return router;
}
module.exports = createRouter();
module.exports.createRouter = createRouter;
