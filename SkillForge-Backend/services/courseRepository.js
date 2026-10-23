const { randomUUID } = require('node:crypto');
const db = require('../db');
const curated = require('../data/courses');
const { validateCourse } = require('./courseValidation');

function json(value, fallback) {
    try { return typeof value === 'string' ? JSON.parse(value) : value ?? fallback; }
    catch { return fallback; }
}
function createRepository(pool) {
    async function load(row) {
        const [[modules], [questions]] = await Promise.all([
            pool.execute('SELECT * FROM generated_modules WHERE course_id = ? ORDER BY position', [row.id]),
            pool.execute('SELECT * FROM generated_questions WHERE course_id = ? ORDER BY position', [row.id])
        ]);
        return {
            id: row.id, title: row.title, category: 'Personalized Learning', level: row.level,
            duration: `${row.module_count} focused modules`, description: row.description,
            skills: [row.topic], interests: [row.topic], nextCourseIds: [], source: row.source,
            learningGoal: row.learning_goal, learningOutcomes: json(row.learning_outcomes, []),
            modules: modules.map(m => ({
                id: m.id, title: m.title, duration: m.duration, summary: m.summary,
                notes: json(m.key_points, []),
                guide: { ...json(m.guide, {}), codeExample: json(m.example, null) },
                video: { title: m.recommended_search, url: `https://www.youtube.com/results?search_query=${encodeURIComponent(m.recommended_search)}` }
            })),
            quiz: questions.map(q => ({
                id: q.id, moduleId: q.module_id, difficulty: q.difficulty, topic: q.topic,
                question: q.question, options: json(q.options, []), correct: q.correct_option, explanation: q.explanation
            }))
        };
    }
    return {
        getCuratedCourses: () => curated,
        isGeneratedCourse: id => typeof id === 'string' && id.startsWith('gen-'),
        async getAccessibleCourses(userId) {
            if (!userId) return curated;
            const [rows] = await pool.execute('SELECT * FROM generated_courses WHERE user_id = ? ORDER BY created_at DESC', [userId]);
            return [...curated, ...await Promise.all(rows.map(load))];
        },
        async getAccessibleCourseById(userId, id) {
            const course = curated.find(c => c.id === id);
            if (course) return course;
            if (!userId || typeof id !== 'string') return null;
            const [rows] = await pool.execute('SELECT * FROM generated_courses WHERE id = ? AND user_id = ?', [id, userId]);
            return rows.length ? load(rows[0]) : null;
        },
        async saveGeneratedCourse(userId, input, output, source) {
            const course = validateCourse(output, input.moduleCount);
            if (!['gemini', 'template'].includes(source)) throw new Error('Invalid generation source.');
            const id = `gen-${randomUUID()}`;
            const moduleIds = course.modules.map(() => `gm-${randomUUID()}`);
            const connection = await pool.getConnection();
            try {
                await connection.beginTransaction();
                await connection.execute(`INSERT INTO generated_courses
                    (id,user_id,title,topic,level,learning_goal,description,learning_outcomes,module_count,source)
                    VALUES (?,?,?,?,?,?,?,?,?,?)`, [id,userId,course.title,input.topic,input.level,input.learningGoal,
                    course.description,JSON.stringify(course.learningOutcomes),input.moduleCount,source]);
                for (const [i, m] of course.modules.entries()) {
                    const guide = { concepts: m.concepts.map(c => ({ title: c.title, text: c.explanation })),
                        commonMistakes: m.commonMistakes, bestPractices: m.bestPractices, recap: m.recap };
                    await connection.execute(`INSERT INTO generated_modules
                        (id,course_id,position,title,duration,summary,key_points,guide,example,recommended_search)
                        VALUES (?,?,?,?,?,?,?,?,?,?)`, [moduleIds[i],id,i,m.title,m.duration,m.summary,
                        JSON.stringify(m.keyPoints),JSON.stringify(guide),JSON.stringify(m.example),m.recommendedSearch]);
                }
                for (const [i, q] of course.questions.entries()) {
                    await connection.execute(`INSERT INTO generated_questions
                        (id,course_id,module_id,position,difficulty,topic,question,options,correct_option,explanation)
                        VALUES (?,?,?,?,?,?,?,?,?,?)`, [`gq-${randomUUID()}`,id,moduleIds[q.moduleIndex],i,q.difficulty,
                        q.topic,q.question,JSON.stringify(q.options),q.correctIndex,q.explanation]);
                }
                await connection.execute('INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)', [userId,id]);
                await connection.commit();
                return id;
            } catch (error) {
                await connection.rollback();
                throw error;
            } finally { connection.release(); }
        }
    };
}
module.exports = { ...createRepository(db), createRepository };
