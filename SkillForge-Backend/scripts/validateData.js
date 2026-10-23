const courses = require("../data/courses");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const notesContext = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "../../SkillForge-Frontend/js/notes-data.js"), "utf8"), notesContext);

const errors = [];
const courseIds = new Set();
const allModuleIds = new Set();

if (courses.length !== 10) {
    errors.push(`Expected 10 courses but found ${courses.length}.`);
}

for (const course of courses) {
    if (courseIds.has(course.id)) {
        errors.push(`Duplicate course id: ${course.id}`);
    }
    courseIds.add(course.id);

    if (course.modules.length < 5 || course.modules.length > 10) {
        errors.push(`${course.id}: expected 5?10 modules, found ${course.modules.length}.`);
    }

    if (course.quiz.length !== 10) {
        errors.push(`${course.id}: expected 10 questions, found ${course.quiz.length}.`);
    }

    const moduleIds = new Set(course.modules.map((module) => module.id));
    for (const module of course.modules) {
        if (allModuleIds.has(module.id)) errors.push(`Duplicate module ID: ${module.id}`);
        allModuleIds.add(module.id);
        if (!course.quiz.some(q => q.moduleId === module.id)) errors.push(`${module.id}: missing assessment coverage.`);
        if (!module.summary || module.notes.length < 3 || !notesContext.window.SF_NOTES[module.id]?.concepts?.length) errors.push(`${module.id}: missing learning content or detailed notes.`);
    }
    const questionIds = new Set();
    const difficulties = { easy: 0, medium: 0, hard: 0 };

    course.quiz.forEach((question, index) => {
        if (questionIds.has(question.id)) {
            errors.push(`${course.id}: duplicate question id ${question.id}.`);
        }
        questionIds.add(question.id);

        if (!moduleIds.has(question.moduleId)) {
            errors.push(`${course.id}/${question.id}: unknown module ${question.moduleId}.`);
        }

        if (!Array.isArray(question.options) || question.options.length !== 4 || question.options.some(option => typeof option !== "string" || !option.trim())) {
            errors.push(`${course.id}/${question.id}: expected 4 answer options.`);
        }

        if (!Number.isInteger(question.correct) || question.correct < 0 || question.correct > 3) {
            errors.push(`${course.id}/${question.id}: invalid correct answer index.`);
        }

        if (!Object.hasOwn(difficulties, question.difficulty)) {
            errors.push(`${course.id}/${question.id}: invalid difficulty ${question.difficulty}.`);
        } else {
            difficulties[question.difficulty] += 1;
        }

        const expected = index < 3 ? "easy" : index < 7 ? "medium" : "hard";
        if (question.difficulty !== expected) {
            errors.push(`${course.id}/${question.id}: question ${index + 1} should be ${expected}.`);
        }
    });

    if (difficulties.easy !== 3 || difficulties.medium !== 4 || difficulties.hard !== 3) {
        errors.push(`${course.id}: difficulty split must be 3 easy, 4 medium, 3 hard.`);
    }

    for (const nextId of course.nextCourseIds) {
        if (!courses.some((item) => item.id === nextId)) {
            errors.push(`${course.id}: unknown next course ${nextId}.`);
        }
    }
}

if (errors.length) {
    console.error("SkillForge course-data validation FAILED:\n");
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
}

console.log("SkillForge course-data validation PASSED.");
console.log(`Courses: ${courses.length}`);
console.log(`Modules: ${courses.reduce((sum, course) => sum + course.modules.length, 0)}`);
console.log(`Assessment questions: ${courses.reduce((sum, course) => sum + course.quiz.length, 0)}`);
