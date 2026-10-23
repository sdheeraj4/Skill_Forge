const test = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const session = require('express-session');
const db = require('../db');
const repository = require('../services/courseRepository');
const curated = repository.getCuratedCourses();
const { templateCourse } = require('../services/courseTemplates');
const { createRouter } = require('../routes/generatedCourses');

test('offline HTTP API: auth, generation, ownership, progress and assessment', async t => {
    const owned = { ...structuredClone(curated[0]), id: 'gen-private', title: 'Private course', source: 'template' };
    let complete = false, enrolled = false;
    const originalExecute = db.execute;
    const originalGet = repository.getAccessibleCourseById;
    const originalList = repository.getAccessibleCourses;
    db.execute = async sql => {
        if (sql.startsWith('SELECT id FROM enrollments')) return [[{ id: 1 }]];
        if (sql.startsWith('SELECT module_id')) return [complete ? owned.modules.map(m => ({ module_id: m.id })) : []];
        return [{ insertId: 1 }];
    };
    repository.getAccessibleCourseById = async (user, id) => id === owned.id ? user === 1 ? owned : null : curated.find(c => c.id === id);
    repository.getAccessibleCourses = async user => user === 1 ? [...curated, owned] : curated;
    let releaseGeneration;
    let blockGeneration = false;
    const app = express(); app.use(express.json());
    app.use(session({ secret: 'test-session-only', resave: false, saveUninitialized: false }));
    // This login shortcut exists only in this isolated test app.
    app.post('/test-session/:id', (req,res) => { req.session.userId = Number(req.params.id); res.json({}); });
    app.use('/api', createRouter({
        generate: async input => { if (blockGeneration) await new Promise(resolve => { releaseGeneration = resolve; }); return { course: templateCourse(input), source: 'template' }; },
        repo: { async saveGeneratedCourse(user, input, course, source) { assert.equal(user, 1); assert.equal(course.modules.length, 5); assert.equal(source, 'template'); enrolled = true; return owned.id; } }
    }));
    app.use('/api', require('../routes/courses'));
    app.use('/api', require('../routes/learning'));
    app.use((err,req,res,next) => res.status(err.status || 500).json({ message: 'Controlled error' }));
    const server = app.listen(0, '127.0.0.1'); await new Promise(resolve => server.once('listening', resolve));
    t.after(async () => { db.execute = originalExecute; repository.getAccessibleCourseById = originalGet; repository.getAccessibleCourses = originalList; await new Promise(resolve => server.close(resolve)); });
    const base = `http://127.0.0.1:${server.address().port}`;
    async function request(path, { cookie, body, method = body ? 'POST' : 'GET' } = {}) {
        const response = await fetch(base + path, { method, headers: { 'Content-Type': 'application/json', ...(cookie ? { Cookie: cookie } : {}) }, ...(body ? { body: JSON.stringify(body) } : {}) });
        return { status: response.status, data: await response.json(), cookie: response.headers.get('set-cookie')?.split(';')[0] };
    }
    const a = (await request('/test-session/1', { body: {} })).cookie;
    const b = (await request('/test-session/2', { body: {} })).cookie;
    const input = { topic: 'Python', level: 'Beginner', learningGoal: 'Learn Python for small programs.', moduleCount: 5 };
    assert.equal((await request('/api/generated-courses', { body: input })).status, 401);
    assert.equal((await request('/api/generated-courses', { cookie: a, body: { ...input, moduleCount: 11 } })).status, 400);
    const created = await request('/api/generated-courses', { cookie: a, body: input });
    assert.equal(created.status, 201); assert.equal(enrolled, true);
    assert.equal((await request('/api/courses')).data.courses.length, 10);
    assert.equal((await request('/api/courses/' + owned.id, { cookie: a })).status, 200);
    for (const cookie of [b, undefined]) assert.equal((await request('/api/courses/' + owned.id, { cookie })).status, 404);
    for (const [path, body] of [['/api/enroll/' + owned.id, {}], ['/api/progress', { courseId: owned.id, moduleId: owned.modules[0].id }], ['/api/quiz/submit', { courseId: owned.id, answers: Array(10).fill(0) }]]) {
        assert.equal((await request(path, { cookie: b, body })).status, 404);
    }
    assert.equal((await request('/api/quiz/' + owned.id, { cookie: b })).status, 404);
    assert.equal((await request('/api/quiz/' + owned.id, { cookie: a })).status, 403);
    assert.equal((await request('/api/enroll/' + curated[0].id, { cookie: a, body: {} })).status, 201);
    assert.equal((await request('/api/progress', { cookie: a, body: { courseId: owned.id, moduleId: owned.modules[0].id } })).status, 200);
    complete = true;
    const quiz = await request('/api/quiz/' + owned.id, { cookie: a });
    assert.equal(quiz.status, 200); assert.equal(quiz.data.questions.length, 10);
    assert.ok(quiz.data.questions.every(q => !('correct' in q) && !('correct_option' in q) && !('explanation' in q)));
    for (const value of [null, '', '0', -1, 4, 0.5]) {
        const answers = Array(10).fill(0); answers[0] = value;
        assert.equal((await request('/api/quiz/submit', { cookie: a, body: { courseId: owned.id, answers } })).status, 400);
    }
    const submitted = await request('/api/quiz/submit', { cookie: a, body: { courseId: owned.id, answers: owned.quiz.map(q => q.correct), score: 0 } });
    assert.equal(submitted.status, 201); assert.equal(submitted.data.score, 100);
    blockGeneration = true;
    const first = request('/api/generated-courses', { cookie: a, body: input });
    while (!releaseGeneration) await new Promise(resolve => setImmediate(resolve));
    assert.equal((await request('/api/generated-courses', { cookie: a, body: input })).status, 429);
    releaseGeneration(); assert.equal((await first).status, 201);
});
