const test = require('node:test');
const assert = require('node:assert/strict');
const { createRepository } = require('../services/courseRepository');
const { templateCourse } = require('../services/courseTemplates');
const input = { topic: 'Python', level: 'Beginner', learningGoal: 'Build small Python programs.', moduleCount: 5 };
for (const failure of [null, 'generated_courses', 'generated_modules', 'generated_questions', 'enrollments', 'commit']) {
    test(`transaction ${failure ? `rolls back at ${failure}` : 'saves all rows and enrollment'}`, async () => {
        const events = [];
        const connection = {
            async beginTransaction() { events.push('begin'); },
            async execute(sql, args) { const table = sql.match(/INSERT INTO (\w+)/)[1]; events.push(table); assert.ok(args.length); if (table === failure) throw Error('simulated'); return [{}]; },
            async commit() { events.push('commit'); if (failure === 'commit') throw Error('simulated'); },
            async rollback() { events.push('rollback'); }, release() { events.push('release'); }
        };
        const repo = createRepository({ async getConnection() { return connection; } });
        const save = repo.saveGeneratedCourse(7, input, templateCourse(input), 'template');
        if (failure) { await assert.rejects(save); assert.ok(events.includes('rollback')); }
        else { assert.match(await save, /^gen-[\da-f-]{36}$/); assert.equal(events.filter(e => e === 'generated_modules').length, 5); assert.equal(events.filter(e => e === 'generated_questions').length, 10); assert.ok(events.includes('enrollments')); }
        assert.equal(events.at(-1), 'release');
    });
}
test('private lookup binds both course and owner and skips anonymous DB access', async () => {
    let calls = 0;
    const repo = createRepository({ async execute(sql,args) { calls++; assert.match(sql, /id = \? AND user_id = \?/); assert.deepEqual(args, ['gen-other', 2]); return [[]]; } });
    assert.equal(await repo.getAccessibleCourseById(null, 'gen-other'), null);
    assert.equal(calls, 0);
    assert.equal(await repo.getAccessibleCourseById(2, 'gen-other'), null); assert.equal(calls, 1);
});
