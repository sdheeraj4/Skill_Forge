const { z } = require('zod');

// Content is plain text, including examples. Never interpret it as markup or code.
const plain = (max = 1200, min = 1) => z.string().trim().min(min).max(max)
    .refine(value => !/<\/?[a-z!][^>]*>/i.test(value) && !/javascript\s*:|<script|onerror\s*=/i.test(value), 'Use plain text, without HTML or scripts.');
const list = (min = 1) => z.array(plain()).min(min).max(12);
const example = z.object({
    title: plain(160), language: plain(30), code: plain(4000),
    output: z.string().max(2000), explanation: list()
}).strict();
const moduleSchema = z.object({
    title: plain(160), duration: plain(40), summary: plain(1500), keyPoints: list(3),
    concepts: z.array(z.object({ title: plain(160), explanation: plain(3000) }).strict()).min(1).max(8),
    example: example.nullable(), commonMistakes: list(), bestPractices: list(), recap: list(),
    recommendedSearch: plain(200)
}).strict();
const courseSchema = z.object({
    title: plain(160), description: plain(2000), learningOutcomes: list(),
    modules: z.array(moduleSchema).min(5).max(10),
    questions: z.array(z.object({
        moduleIndex: z.number().int().min(0).max(9), difficulty: z.enum(['easy', 'medium', 'hard']),
        topic: plain(160), question: plain(1200), options: z.array(plain(600)).length(4),
        correctIndex: z.number().int().min(0).max(3), explanation: plain(2000)
    }).strict()).length(10)
}).strict();
const inputSchema = z.object({
    topic: plain(100, 2).refine(s => /\p{L}{2}/u.test(s) && new Set(s.toLowerCase().replace(/\W/g, '')).size > 1, 'Enter a meaningful topic.'),
    level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
    learningGoal: plain(600, 10).refine(s => /\p{L}{2}/u.test(s), 'Describe your learning goal.'),
    moduleCount: z.number().int().min(5).max(10)
}).strict();

function validateCourse(value, count) {
    const course = courseSchema.parse(value);
    const fail = message => { throw new Error(message); };
    if (course.modules.length !== count) fail('Module count must match the request.');
    const normalized = s => s.toLowerCase().replace(/\s+/g, ' ').trim();
    if (new Set(course.modules.map(m => normalized(m.title))).size !== count) fail('Module titles must be unique.');
    if (new Set(course.questions.map(q => normalized(q.question))).size !== 10) fail('Questions must be unique.');
    const covered = new Set();
    for (const q of course.questions) {
        if (q.moduleIndex >= count) fail('Invalid module reference.');
        covered.add(q.moduleIndex);
        if (new Set(q.options.map(normalized)).size !== 4) fail('Answer options must be distinct.');
    }
    if (covered.size !== count) fail('Each module needs a question.');
    for (const [difficulty, total] of Object.entries({ easy: 3, medium: 4, hard: 3 })) {
        if (course.questions.filter(q => q.difficulty === difficulty).length !== total) fail('Difficulty split must be 3/4/3.');
    }
    if (new Set(course.questions.map(q => q.correctIndex)).size < 2) fail('Vary correct answer positions.');
    // Also check optional output text with the same plain-text rule.
    for (const m of course.modules) if (m.example?.output) plain(2000).parse(m.example.output);
    return course;
}

// Refinements are enforced by validateCourse; Gemini receives the structural schema.
const jsonSchema = z.toJSONSchema(courseSchema);
delete jsonSchema.$schema;
module.exports = { inputSchema, validateCourse, jsonSchema };
