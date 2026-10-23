document.addEventListener('DOMContentLoaded', async () => {
    if (!await sfRequireAuth()) return;
    const form = document.getElementById('createCourseForm');
    const fields = document.getElementById('generationFields');
    const status = document.getElementById('generationStatus');
    let busy = false;
    form.addEventListener('submit', async event => {
        event.preventDefault();
        if (busy) return;
        const input = {
            topic: form.elements.topic.value.trim(), level: form.elements.level.value,
            learningGoal: form.elements.learningGoal.value.trim(), moduleCount: Number(form.elements.moduleCount.value)
        };
        if (input.topic.length < 2 || input.learningGoal.length < 10 || !Number.isInteger(input.moduleCount) || input.moduleCount < 5 || input.moduleCount > 10) {
            status.textContent = 'Enter a topic, a goal of at least 10 characters and 5–10 modules.';
            return;
        }
        busy = true;
        fields.disabled = true;
        form.setAttribute('aria-busy', 'true');
        status.textContent = 'Generating your course… This may take a few seconds, or up to two minutes if a retry is needed.';
        try {
            const result = await SkillForgeAPI.createCourse(input);
            status.textContent = `Course created using ${result.source === 'template' ? 'an offline template' : 'Gemini'} and added to My Learning. Opening your course…`;
            setTimeout(() => { location.href = `course.html?id=${encodeURIComponent(result.courseId)}`; }, 1200);
        } catch (error) {
            status.textContent = error.message;
            fields.disabled = false;
            busy = false;
        } finally { form.setAttribute('aria-busy', 'false'); }
    });
});
