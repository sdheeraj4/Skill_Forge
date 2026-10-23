
function parseJson(value, fallback = []) {
    if (value === null || value === undefined || value === "") {
        return fallback;
    }

    if (Array.isArray(value) || typeof value === "object") {
        return value;
    }

    try {
        return JSON.parse(value);
    } catch {
        return fallback;
    }
}

function getPerformance(score) {
    if (score >= 90) {
        return { label: "Excellent", action: "advanced" };
    }
    if (score >= 75) {
        return { label: "Very Good", action: "next" };
    }
    if (score >= 60) {
        return { label: "Good", action: "revise" };
    }
    if (score >= 40) {
        return { label: "Needs Improvement", action: "retake" };
    }
    return { label: "Retry Recommended", action: "relearn" };
}

function normalizeAnswers(course, submittedAnswers) {
    if (Array.isArray(submittedAnswers)) return submittedAnswers;
    if (submittedAnswers && typeof submittedAnswers === "object") {
        const ids = course.quiz.map(q => q.id);
        const keys = Object.keys(submittedAnswers);
        if (keys.length !== ids.length || keys.some(key => !ids.includes(key))) return [];
        return ids.map(id => submittedAnswers[id]);
    }
    return [];
}

function evaluateQuiz(course, submittedAnswers) {
    const answers = normalizeAnswers(course, submittedAnswers);

    if (answers.length !== course.quiz.length || answers.some((value) => !Number.isInteger(value) || value < 0 || value > 3)) {
        throw new Error("Please answer all 10 questions before submitting the assessment.");
    }

    let correctAnswers = 0;
    const wrongByModule = new Map();
    const review = [];

    course.quiz.forEach((question, index) => {
        const selected = answers[index];
        const isCorrect = selected === question.correct;

        if (isCorrect) {
            correctAnswers += 1;
        } else {
            wrongByModule.set(question.moduleId, (wrongByModule.get(question.moduleId) || 0) + 1);
        }

        review.push({
            questionId: question.id,
            selected,
            correct: question.correct,
            isCorrect,
            moduleId: question.moduleId,
            topic: question.topic,
            difficulty: question.difficulty,
            explanation: question.explanation || ""
        });
    });

    const score = correctAnswers * 10;
    const performance = getPerformance(score);

    const weakModules = [...wrongByModule.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([moduleId, wrongCount]) => {
            const module = course.modules.find((item) => item.id === moduleId);
            return {
                moduleId,
                title: module ? module.title : moduleId,
                wrongAnswers: wrongCount
            };
        });

    return {
        score,
        correctAnswers,
        totalQuestions: course.quiz.length,
        performance,
        weakModules,
        review
    };
}

function latestResultsByCourse(rows) {
    const map = new Map();
    for (const row of rows) {
        if (!map.has(row.course_id)) {
            map.set(row.course_id, row);
        }
    }
    return map;
}

function bestResultsByCourse(rows) {
    const map = new Map();
    for (const row of rows) {
        const existing = map.get(row.course_id);
        if (!existing || Number(row.score) > Number(existing.score)) {
            map.set(row.course_id, row);
        }
    }
    return map;
}

function completedModuleCounts(progressRows) {
    const map = new Map();
    for (const row of progressRows) {
        if (Number(row.completed) !== 1) {
            continue;
        }
        if (!map.has(row.course_id)) {
            map.set(row.course_id, new Set());
        }
        map.get(row.course_id).add(row.module_id);
    }
    return map;
}

function buildRecommendations({ user, enrollmentRows, progressRows, quizRows, courses, limit = 4 }) {
    const enrolled = new Set(enrollmentRows.map((row) => row.course_id));
    const latest = latestResultsByCourse(quizRows);
    const recommendations = [];
    const used = new Set();

    function add(course, reason, priority = 1) {
        if (!course || used.has(course.id)) {
            return;
        }
        used.add(course.id);
        recommendations.push({
            courseId: course.id,
            title: course.title,
            category: course.category,
            level: course.level,
            reason,
            priority
        });
    }

    for (const [courseId, result] of latest.entries()) {
        const course = courses.find((item) => item.id === courseId);
        if (!course) {
            continue;
        }

        const score = Number(result.score);
        const weakModules = parseJson(result.weak_modules, []);

        if (score < 60) {
            const weakText = weakModules.length ? ` Focus on ${weakModules[0].title}.` : "";
            add(course, `Your latest score is ${score}%. Revisit this course before moving ahead.${weakText}`, 100);
            continue;
        }

        if (score < 75) {
            const weakText = weakModules.length ? ` Review ${weakModules[0].title} first.` : "";
            add(course, `You scored ${score}%. You can progress, but a short revision is recommended.${weakText}`, 80);
        }

        if (score >= 75) {
            course.nextCourseIds.forEach((nextId) => {
                const nextCourse = courses.find((item) => item.id === nextId);
                add(nextCourse, `You performed well in ${course.title} (${score}%). This is the logical next step.`, 90);
            });
        }
    }

    const interests = parseJson(user.interests, [])
        .map((value) => String(value).toLowerCase());

    for (const course of courses) {
        if (used.has(course.id)) {
            continue;
        }

        const searchable = [course.category, course.title, ...course.skills, ...course.interests]
            .join(" ")
            .toLowerCase();

        const match = interests.some((interest) => searchable.includes(interest));
        if (match && !enrolled.has(course.id)) {
            add(course, "Matches your selected learning interests.", 50);
        }
    }

    for (const course of courses) {
        if (recommendations.length >= limit) {
            break;
        }
        if (!enrolled.has(course.id)) {
            add(course, "Recommended to broaden your SkillForge learning path.", 10);
        }
    }

    return recommendations
        .sort((a, b) => b.priority - a.priority)
        .slice(0, limit)
        .map(({ priority, ...item }) => item);
}

function buildReportCard({ user, enrollmentRows, progressRows, quizRows, courses }) {
    const moduleCounts = completedModuleCounts(progressRows);
    const best = bestResultsByCourse(quizRows);
    const latest = latestResultsByCourse(quizRows);

    const courseRows = enrollmentRows.map((enrollment) => {
        const course = courses.find((item) => item.id === enrollment.course_id);
        if (!course) {
            return null;
        }

        const completedModules = course.modules.filter(m => moduleCounts.get(course.id)?.has(m.id)).length;
        const progressPercent = Math.round((completedModules / course.modules.length) * 100);
        const bestResult = best.get(course.id);
        const latestResult = latest.get(course.id);
        const attempts = quizRows.filter((row) => row.course_id === course.id).length;
        const bestScore = bestResult ? Number(bestResult.score) : null;
        const status = completedModules !== course.modules.length
            ? "In Progress"
            : bestResult
                ? bestScore >= 60 ? "Completed" : "Revision Required"
                : "Assessment Pending";

        return {
            courseId: course.id,
            title: course.title,
            completedModules,
            totalModules: course.modules.length,
            progressPercent,
            bestScore,
            latestScore: latestResult ? Number(latestResult.score) : null,
            performance: bestResult ? getPerformance(bestScore).label : "Not Attempted",
            attempts,
            status
        };
    }).filter(Boolean);

    const scored = courseRows.filter((item) => item.bestScore !== null);
    const overallAverage = scored.length
        ? Math.round(scored.reduce((sum, item) => sum + item.bestScore, 0) / scored.length)
        : 0;

    const skillScores = new Map();
    for (const row of scored) {
        const course = courses.find((item) => item.id === row.courseId);
        for (const skill of course.skills) {
            if (!skillScores.has(skill)) {
                skillScores.set(skill, []);
            }
            skillScores.get(skill).push(row.bestScore);
        }
    }

    const skillProfile = [...skillScores.entries()]
        .map(([skill, values]) => ({
            skill,
            score: Math.round(values.reduce((a, b) => a + b, 0) / values.length)
        }))
        .sort((a, b) => b.score - a.score);

    const strongestSkills = skillProfile.filter((item) => item.score >= 75).slice(0, 3);
    const improvementSkills = [...skillProfile].sort((a, b) => a.score - b.score).filter((item) => item.score < 75).slice(0, 3);

    return {
        candidate: {
            name: user.name,
            email: user.email,
            skillLevel: user.skill_level,
            learningGoal: user.learning_goal,
            interests: parseJson(user.interests, [])
        },
        summary: {
            coursesEnrolled: courseRows.length,
            coursesCompleted: courseRows.filter((item) => item.status === "Completed").length,
            modulesCompleted: courseRows.reduce((sum, row) => sum + row.completedModules, 0),
            assessmentsAttempted: scored.length,
            overallAverage,
            overallPerformance: scored.length ? getPerformance(overallAverage).label : "No Assessments Yet"
        },
        courses: courseRows,
        skillProfile,
        strongestSkills,
        improvementSkills
    };
}

module.exports = {
    parseJson,
    getPerformance,
    evaluateQuiz,
    buildRecommendations,
    buildReportCard,
    completedModuleCounts,
    latestResultsByCourse
};
