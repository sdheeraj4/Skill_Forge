const test = require('node:test');
const assert = require('node:assert/strict');
const { validateCourse, inputSchema } = require('../services/courseValidation');
const { templateCourse } = require('../services/courseTemplates');
const { createGenerator } = require('../services/courseGenerator');
const { geminiRequest } = require('../services/courseGenerator');
const { evaluateQuiz, buildReportCard } = require('../utils/learningEngine');
const curated = require('../data/courses');
const input = { topic: 'Java', level: 'Beginner', learningGoal: 'Learn practical college programming.', moduleCount: 5 };
const valid = (n = 5) => templateCourse({ ...input, moduleCount: n });

for (const topic of ['Java', 'Node.js', 'HTML and CSS', 'JavaScript', 'Python', 'MySQL']) {
    test(`fallback ${topic}: all counts 5–10 validate`, () => {
        for (let n = 5; n <= 10; n++) assert.equal(validateCourse(templateCourse({ ...input, topic, moduleCount: n }), n).modules.length, n);
    });
}
const cases = {
    'fewer than five modules': c => c.modules.pop(),
    'more than ten modules': c => c.modules.push(...c.modules, c.modules[0]),
    'fewer than ten questions': c => c.questions.pop(),
    'more than ten questions': c => c.questions.push(c.questions[0]),
    'malformed options': c => c.questions[0].options.pop(),
    'blank option': c => c.questions[0].options[0] = ' ',
    'repeated options': c => c.questions[0].options[1] = c.questions[0].options[0],
    'out of range correct index': c => c.questions[0].correctIndex = 4,
    'fractional correct index': c => c.questions[0].correctIndex = 1.5,
    'invalid module reference': c => c.questions[0].moduleIndex = 5,
    'missing module coverage': c => c.questions.forEach(q => q.moduleIndex = 0),
    'wrong difficulty': c => c.questions[0].difficulty = 'hard',
    'duplicate module titles': c => c.modules[1].title = c.modules[0].title.toUpperCase(),
    'duplicate question': c => c.questions[1].question = c.questions[0].question,
    'empty content': c => c.modules[0].summary = ' ',
    'missing points': c => c.modules[0].keyPoints = ['Only one'],
    'empty explanation': c => c.questions[0].explanation = '',
    'same correct position': c => c.questions.forEach(q => q.correctIndex = 0),
    'HTML content': c => c.description = '<img src=x onerror=alert(1)>',
    'oversized content': c => c.title = 'a'.repeat(161),
    'unknown content field': c => c.rawScript = 'alert(1)'
};
for (const [name, mutate] of Object.entries(cases)) test(`rejects ${name}`, () => {
    const c = valid(); mutate(c); assert.throws(() => validateCourse(c, 5));
});
test('rejects mismatched requested count', () => assert.throws(() => validateCourse(valid(), 6)));
test('input validation trims and rejects invalid requests', () => {
    assert.equal(inputSchema.parse({ ...input, topic: ' Java ' }).topic, 'Java');
    for (const patch of [{ topic: '!!!' }, { topic: 'aaaa' }, { learningGoal: ' ' }, { level: 'Expert' }, { moduleCount: 4 }, { moduleCount: 11 }, { moduleCount: '6' }]) {
        assert.equal(inputSchema.safeParse({ ...input, ...patch }).success, false);
    }
});
test('mock Gemini retries invalid output once and returns valid output', async () => {
    let calls = 0;
    const generate = createGenerator({ env: { GEMINI_API_KEY: 'fake-test-key' }, log() {}, request: async (received, correction) => {
        assert.deepEqual(Object.keys(received).sort(), Object.keys(input).sort());
        if (++calls === 1) return {};
        assert.match(correction, /previous response failed/);
        return valid();
    } });
    assert.equal((await generate(input)).source, 'gemini'); assert.equal(calls, 2);
});
test('SDK adapter sends only course preferences with JSON schema and configurable model', async () => {
    class MockSDK {
        constructor(config) {
            assert.equal(config.apiKey, 'fake-key');
            this.models = { generateContent: async request => {
                assert.equal(request.model, 'test-model');
                assert.deepEqual(JSON.parse(request.contents), input);
                assert.equal(request.config.responseMimeType, 'application/json');
                assert.equal(request.config.responseJsonSchema.type, 'object');
                assert.equal(request.config.httpOptions.retryOptions.attempts, 1);
                assert.equal(request.config.tools, undefined);
                return { text: JSON.stringify(valid()) };
            } };
        }
    }
    const output = await geminiRequest(input, '', { GEMINI_API_KEY: 'fake-key', GEMINI_MODEL: 'test-model' }, MockSDK);
    assert.equal(validateCourse(output, 5).modules.length, 5);
});
test('mock failures fall back after two attempts without logging private data', async () => {
    let calls = 0; const logs = [];
    const generate = createGenerator({ env: { GEMINI_API_KEY: 'secret' }, log: m => logs.push(m), request: async () => { calls++; throw Error('secret private request'); } });
    assert.equal((await generate(input)).source, 'template'); assert.equal(calls, 2);
    assert.ok(logs.every(m => !/secret|private request/.test(m)));
});
test('fallback off and unsupported topics return controlled errors', async () => {
    for (const [env, topic] of [[{ ALLOW_TEMPLATE_FALLBACK: 'false' }, 'Java'], [{}, 'Astronomy']]) {
        await assert.rejects(createGenerator({ env, log() {} })({ ...input, topic }), e => e.status === 503);
    }
});
test('strict assessment values, counts and question IDs', () => {
    const c = curated[0]; const answers = c.quiz.map(q => q.correct);
    assert.equal(evaluateQuiz(c, answers).score, 100);
    for (const value of [null, '', '0', -1, 4, 1.5, false, undefined]) {
        const bad = [...answers]; bad[0] = value; assert.throws(() => evaluateQuiz(c, bad));
    }
    assert.throws(() => evaluateQuiz(c, [...answers, 0]));
    assert.throws(() => evaluateQuiz(c, answers.slice(1)));
    const keyed = Object.fromEntries(c.quiz.map((q,i) => [q.id, answers[i]]));
    assert.equal(evaluateQuiz(c, keyed).score, 100);
    keyed.foreignQuestion = 0; assert.throws(() => evaluateQuiz(c, keyed));
});
test('report uses actual five-module progress and filters stale IDs', () => {
    const c = curated[0];
    const report = buildReportCard({ courses: curated, user: {}, enrollmentRows: [{ course_id: c.id }], quizRows: [],
        progressRows: [c.modules[0].id, 'stale-id'].map(module_id => ({ course_id: c.id, module_id, completed: 1 })) });
    assert.equal(report.courses[0].progressPercent, 20); assert.equal(report.summary.modulesCompleted, 1);
});
