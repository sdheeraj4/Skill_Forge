// Explicit local integration check. Creates two disposable users, then removes only those users.
process.env.GEMINI_API_KEY = '';
process.env.ALLOW_TEMPLATE_FALLBACK = 'true';
const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const app = require('../server');
const db = require('../db');
const repo = require('../services/courseRepository');
const users = [];
const server = app.listen(0, '127.0.0.1');
async function run() {
    await new Promise(resolve => server.once('listening', resolve));
    const base = `http://127.0.0.1:${server.address().port}/api`;
    async function req(path, cookie, body) {
        const r = await fetch(base + path, { method: body ? 'POST' : 'GET', headers: { 'Content-Type': 'application/json', ...(cookie ? { Cookie: cookie } : {}) }, ...(body ? { body: JSON.stringify(body) } : {}) });
        return { status: r.status, data: await r.json(), cookie: r.headers.get('set-cookie')?.split(';')[0] };
    }
    for (let i = 0; i < 2; i++) {
        const email = `sf-test-${randomUUID()}@example.invalid`;
        const reg = await req('/register', null, { name: 'Disposable integration learner', email, password: 'Lab-test-12345' });
        assert.equal(reg.status, 201); users.push(reg.data.user.id);
        const login = await req('/login', null, { email, password: 'Lab-test-12345' });
        assert.equal(login.status, 200);
        if (i === 0) global.ownerCookie = login.cookie; else global.otherCookie = login.cookie;
    }
    const owner = global.ownerCookie, other = global.otherCookie;
    const input = { topic: 'Java', level: 'Beginner', learningGoal: 'Learn Java for college applications.', moduleCount: 6 };
    assert.equal((await req('/generated-courses', null, input)).status, 401);
    const generated = await req('/generated-courses', owner, input);
    assert.equal(generated.status, 201, generated.data.message); assert.equal(generated.data.source, 'template');
    const id = generated.data.courseId;
    const detail = await req('/courses/' + id, owner); assert.equal(detail.status, 200);
    assert.equal(detail.data.course.modules.length, 6); assert.ok(detail.data.course.modules[0].guide.concepts.length);
    assert.equal((await req('/my-learning', owner)).data.courses.find(c => c.courseId === id).totalModules, 6);
    assert.equal((await req('/courses/' + id, other)).status, 404);
    assert.equal((await req('/enroll/' + id, other, {})).status, 404);
    assert.equal((await req('/progress', other, { courseId: id, moduleId: detail.data.course.modules[0].id })).status, 404);
    assert.equal((await req('/quiz/' + id, owner)).status, 403);
    assert.equal((await req('/quiz/' + id, other)).status, 404);
    assert.equal((await req('/quiz/submit', other, { courseId: id, answers: Array(10).fill(0) })).status, 404);
    for (const module of detail.data.course.modules) assert.equal((await req('/progress', owner, { courseId: id, moduleId: module.id })).status, 200);
    const quiz = await req('/quiz/' + id, owner); assert.equal(quiz.status, 200);
    assert.ok(quiz.data.questions.every(q => !('correct' in q) && !('explanation' in q)));
    for (const value of [null, '', 4]) assert.equal((await req('/quiz/submit', owner, { courseId: id, answers: [value, ...Array(9).fill(0)] })).status, 400);
    const stored = await repo.getAccessibleCourseById(users[0], id);
    const result = await req('/quiz/submit', owner, { courseId: id, answers: stored.quiz.map(q => q.correct), score: 1 });
    assert.equal(result.status, 201); assert.equal(result.data.score, 100);
    const dashboard = await req('/dashboard', owner); assert.equal(dashboard.data.summary.coursesCompleted, 1);
    const report = await req('/report-card', owner); assert.equal(report.data.reportCard.courses[0].title, stored.title);
    assert.equal(report.data.reportCard.skillProfile[0].score, 100);
    const curated = repo.getCuratedCourses()[0];
    assert.equal((await req('/enroll/' + curated.id, owner, {})).status, 201);
    await req('/progress', owner, { courseId: curated.id, moduleId: curated.modules[0].id });
    assert.equal((await req('/my-learning', owner)).data.courses.find(c => c.courseId === curated.id).progressPercent, 20);
    // Exercise rollback using a real transaction and a deliberate failure at enrollment.
    const failing = repo.createRepository({
        async getConnection() {
            const c = await db.getConnection();
            return { beginTransaction: () => c.beginTransaction(), commit: () => c.commit(), rollback: () => c.rollback(), release: () => c.release(),
                execute: (sql,args) => { if (sql.startsWith('INSERT INTO enrollments')) throw Error('Deliberate integration failure'); return c.execute(sql,args); } };
        }
    });
    const { templateCourse } = require('../services/courseTemplates');
    await assert.rejects(failing.saveGeneratedCourse(users[0], input, templateCourse(input), 'template'));
    const [rows] = await db.execute('SELECT id FROM generated_courses WHERE user_id = ?', [users[0]]);
    assert.equal(rows.length, 1);
    console.log('Live MySQL flow PASSED: registration, login, template creation, enrollment, ownership, notes, progress, assessment, dashboard, report, skills and rollback.');
}
run().catch(() => { console.error('Live MySQL flow FAILED. Check local database and migration; no Gemini requests were made.'); process.exitCode = 1; })
    .finally(async () => {
        for (const id of users) await db.execute('DELETE FROM users WHERE id = ?', [id]);
        await db.end(); await new Promise(resolve => server.close(resolve));
    });
