const templates = require('../data/templates.json');
const practice = require('../data/templatePractice');
const matches = [
    [/\bjava\b/i, 'java-fundamentals'],
    [/\bnode(?:\s*\.?\s*js)?\b/i, 'nodejs-essentials'],
    [/\bhtml\b|\bcss\b/i, 'html-css-fundamentals'],
    [/\bjavascript\b|\bjs\b/i, 'javascript-foundations'],
    [/\bpython\b/i, 'python-basics'],
    [/\bmysql\b|\bsql\b/i, 'mysql-fundamentals']
];
const text = value => String(value).replace(/<\/?([^>]+)>/g, '$1').replace(/javascript\s*:/gi, 'JavaScript ').trim();

function templateCourse(input) {
    const match = matches.find(([pattern]) => pattern.test(input.topic));
    if (!match) return null;
    const template = templates.find(t => t.id === match[1]);
    const modules = [], questions = [];
    const extra = input.moduleCount - 5;
    template.modules.forEach((m, index) => {
        const guide = m.guide;
        const baseIndex = modules.length;
        const split = index < extra;
        const concepts = guide.concepts.map(c => ({ title: text(c.title), explanation: text(c.text) }));
        const base = {
            title: m.title, duration: split ? '25 min' : m.duration, summary: m.summary,
            keyPoints: m.notes.map(text), concepts,
            // HTML is explained as plain text; it is never stored as generated markup.
            example: null,
            commonMistakes: guide.commonMistakes.slice(0, 6).map(text),
            bestPractices: guide.bestPractices.slice(0, 6).map(text),
            recap: m.notes.map(text), recommendedSearch: `${m.title} tutorial`
        };
        const worked = guide.codeExample;
        const practical = {
            ...base, title: `${m.title}: Guided Practice`, duration: '25 min',
            summary: `Apply ${m.title.toLowerCase()} using a worked exercise, then check the result.`,
            concepts: [{ title: 'Practice task', explanation: text(`Recreate the exercise "${worked.title}". ${worked.explanation.join(' ')} Explain how the result follows from the steps, then change one input and predict the difference.`).slice(0, 3000) },
                { title: 'Review your work', explanation: text(guide.bestPractices.join(' ')) }],
            keyPoints: [text(`Identify the input, operation and expected result in the ${m.title} example.`), text(m.notes[1]), text(m.notes[2])]
        };
        if (!split) base.concepts = [...base.concepts.slice(0, 6), ...practical.concepts];
        modules.push(base);
        if (split) modules.push(practical);
        const q = template.quiz.find(q => q.moduleId === m.id);
        questions.push({
            moduleIndex: baseIndex, difficulty: 'easy', topic: m.title, question: text(q.question),
            options: q.options.map(text), correctIndex: q.correct,
            explanation: text(q.explanation || `${q.options[q.correct]} is correct. ${m.notes.join(' ')}`)
        });
        const correctIndex = (index + 1) % 4;
        const [question, answer, ...distractors] = practice[template.id][index];
        const options = [...distractors];
        options.splice(correctIndex, 0, answer);
        questions.push({
            moduleIndex: split ? baseIndex + 1 : baseIndex, difficulty: 'medium', topic: m.title,
            question, options, correctIndex, explanation: text(`${answer}. ${m.notes.join(' ')}`)
        });
    });
    questions.forEach((q,i) => { q.difficulty = i < 3 ? 'easy' : i < 7 ? 'medium' : 'hard'; });
    return {
        title: `${template.title} — ${input.level} Study Plan`,
        description: `Offline template course for ${input.topic}. Goal: ${input.learningGoal} This uses a fixed foundations syllabus with guided practice; it is not AI-generated.`,
        learningOutcomes: [`Explain the core ideas in ${template.title}.`, 'Apply the worked examples and check their results.', `Use the exercises toward your goal: ${input.learningGoal}`],
        modules, questions
    };
}
module.exports = { templateCourse };
