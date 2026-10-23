document.addEventListener("DOMContentLoaded", async () => {
    const courseId = new URLSearchParams(location.search).get("id") || "html-css-fundamentals";
    const intro = document.getElementById("courseIntro");
    const outcomes = document.getElementById("outcomes");
    const moduleList = document.getElementById("moduleList");
    const enrollCard = document.getElementById("enrollCard");

    try {
        const [{ course }, user] = await Promise.all([
            SkillForgeAPI.getCourse(courseId),
            sfGetSessionUser()
        ]);

        document.title = `${course.title} | SkillForge`;
        const visual = sfCourseVisual(course.id);
        let learningState = null;

        if (user) {
            const learning = await SkillForgeAPI.getMyLearning();
            learningState = learning.courses.find((item) => item.courseId === course.id) || null;
        }

        intro.innerHTML = `
            <span class="eyebrow">${escapeHtml(course.category)} · ${escapeHtml(course.level)}</span>
            <h1>${escapeHtml(course.title)}</h1>
            <p>${escapeHtml(course.description)}</p>
            ${course.source !== "curated" ? `<p class="muted">Source: ${course.source === "template" ? "Offline template" : "Gemini"}</p>` : ""}
            <div class="course-tags">
                <span class="pill">${course.moduleCount} modules</span>
                <span class="pill">${escapeHtml(course.duration)}</span>
                <span class="pill">10-question assessment</span>
                ${course.skills.map((skill) => `<span class="pill">${escapeHtml(skill)}</span>`).join("")}
            </div>
        `;

        outcomes.innerHTML = (course.learningOutcomes || course.skills.map(skill => `Build practical ${skill} ability`)).map((skill) => `
            <div class="check-item">
                <span class="check-mark">✓</span>
                <div>
                    <strong>${escapeHtml(skill)}</strong>
                    <div class="muted" style="font-size:.84rem">Learn through focused notes, recommended lectures and a final adaptive assessment.</div>
                </div>
            </div>
        `).join("");

        moduleList.innerHTML = course.modules.map((module, index) => `
            <div class="module-row">
                <div class="module-num">${String(index + 1).padStart(2, "0")}</div>
                <div>
                    <h4>${escapeHtml(module.title)}</h4>
                    <p>${escapeHtml(module.summary)}</p>
                </div>
                <span class="pill">${escapeHtml(module.duration)}</span>
            </div>
        `).join("");

        function renderEnrollCard() {
            const state = learningState;
            const completedIds = state?.completedModuleIds || [];
            const nextModule = course.modules.find((module) => !completedIds.includes(module.id)) || course.modules[0];

            if (!state) {
                enrollCard.innerHTML = `
                    <div class="course-symbol">${escapeHtml(visual.symbol)}</div>
                    <h3>Ready to start?</h3>
                    <p>Enroll to unlock all ${course.moduleCount} modules, recommended lectures, the 10-MCQ assessment and performance tracking.</p>
                    <button class="btn btn-primary" id="enrollCourse">Enroll now</button>
                `;

                document.getElementById("enrollCourse").addEventListener("click", async () => {
                    if (!user) {
                        location.href = "login.html?next=" + encodeURIComponent(location.pathname.split("/").pop() + location.search);
                        return;
                    }

                    const button = document.getElementById("enrollCourse");
                    button.disabled = true;
                    button.textContent = "Enrolling...";
                    try {
                        await SkillForgeAPI.enroll(course.id);
                        const learning = await SkillForgeAPI.getMyLearning();
                        learningState = learning.courses.find((item) => item.courseId === course.id);
                        sfToast("Enrolled successfully.", "success");
                        renderEnrollCard();
                    } catch (error) {
                        sfToast(error.message, "error");
                        button.disabled = false;
                        button.textContent = "Enroll now";
                    }
                });
                return;
            }

            let action = `<a class="btn btn-primary" href="learn.html?course=${encodeURIComponent(course.id)}&module=${encodeURIComponent(nextModule.id)}">Continue course</a>`;
            let helper = "Your module progress and assessment results are saved in MySQL.";

            if (state.status === "Assessment Pending") {
                action = `<a class="btn btn-primary" href="quiz.html?course=${encodeURIComponent(course.id)}">Take final assessment</a>`;
                helper = "All modules are complete. Your 10-question assessment is ready.";
            } else if (state.status === "Revision Required") {
                action = `<a class="btn btn-primary" href="quiz.html?course=${encodeURIComponent(course.id)}">Retake assessment</a>`;
                helper = `Latest score: ${state.assessmentScore}%. Review weak areas, then try again.`;
            } else if (state.status === "Completed") {
                action = `<div style="display:grid;gap:9px"><a class="btn btn-primary" href="progress.html#reportCardSection">View report card</a><a class="btn btn-secondary" href="learn.html?course=${encodeURIComponent(course.id)}">Review modules</a></div>`;
                helper = `Assessment: ${state.assessmentScore}% · ${state.performance}`;
            }

            enrollCard.innerHTML = `
                <div class="course-symbol">${escapeHtml(visual.symbol)}</div>
                <h3>Your learning path</h3>
                <p>${escapeHtml(helper)}</p>
                <div class="progress"><span style="width:${state.progressPercent}%"></span></div>
                <div class="progress-label">
                    <span>${state.progressPercent}% modules complete</span>
                    <span>${state.completedModules}/${state.totalModules}</span>
                </div>
                ${action}
            `;
        }

        renderEnrollCard();
    } catch (error) {
        intro.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
        outcomes.innerHTML = "";
        moduleList.innerHTML = "";
        enrollCard.innerHTML = '<a class="btn btn-secondary" href="courses.html">Back to courses</a>';
    }
});
