document.addEventListener("DOMContentLoaded", async () => {
    const user = await sfRequireAuth();
    if (!user) {
        return;
    }

    const params = new URLSearchParams(location.search);
    const courseId = params.get("course");

    if (!courseId) {
        location.replace("my-learning.html");
        return;
    }

    try {
        const [{ course }, learningData] = await Promise.all([
            SkillForgeAPI.getCourse(courseId),
            SkillForgeAPI.getMyLearning()
        ]);

        const state = learningData.courses.find((item) => item.courseId === courseId);
        if (!state) {
            location.replace(`course.html?id=${encodeURIComponent(courseId)}`);
            return;
        }

        const completedIds = state.completedModuleIds || [];
        const requestedModuleId = params.get("module");
        const module = course.modules.find((item) => item.id === requestedModuleId)
            || course.modules.find((item) => !completedIds.includes(item.id))
            || course.modules[0];
        const index = course.modules.findIndex((item) => item.id === module.id);
        const allComplete = completedIds.length === course.modules.length;

        const notesUrl = (moduleId) =>
            `notes.html?course=${encodeURIComponent(course.id)}&module=${encodeURIComponent(moduleId)}`;

        document.body.dataset.title = course.title;

        document.getElementById("lessonSidebar").innerHTML = `
            <div class="lesson-course-title">
                <b>${escapeHtml(course.title)}</b>
                <span>${state.progressPercent}% complete</span>
            </div>
            <nav class="lesson-nav">
                ${course.modules.map((item, moduleIndex) => `
                    <a class="${item.id === module.id ? "active " : ""}${completedIds.includes(item.id) ? "done" : ""}"
                       href="${notesUrl(item.id)}"
                       target="_blank"
                       rel="noopener">
                        <span class="status">${completedIds.includes(item.id) ? "✓" : moduleIndex + 1}</span>
                        <span>
                            ${escapeHtml(item.title)}
                            <small class="module-open-hint">Open notes ↗</small>
                        </span>
                    </a>
                `).join("")}
            </nav>
        `;

        document.getElementById("lessonContent").innerHTML = `
            <span class="eyebrow">Module ${index + 1} of ${course.modules.length}</span>
            <h1>${escapeHtml(module.title)}</h1>
            <p class="lesson-lead">${escapeHtml(module.summary)}</p>

            <div class="concept-box">
                <strong>Dedicated notes reader</strong>
                Detailed notes now open in a separate browser tab so code examples, diagrams and long explanations
                have enough reading space and do not overlap the learning workspace.
            </div>

            <section class="note-section">
                <h2>What this module covers</h2>
                <div class="workspace-topic-list">
                    ${(module.notes || []).map((note, noteIndex) => `
                        <div class="workspace-topic-item">
                            <span>${String(noteIndex + 1).padStart(2, "0")}</span>
                            <p>${escapeHtml(note)}</p>
                        </div>
                    `).join("")}
                </div>

                <a class="btn btn-primary"
                   href="${notesUrl(module.id)}"
                   target="_blank"
                   rel="noopener"
                   style="margin-top:18px">
                    Open detailed notes ↗
                </a>
            </section>

            <section class="note-section">
                <h2>Learning flow</h2>
                <p class="muted">
                    Read the dedicated notes, review the code examples and visual explanation, then use the
                    recommended YouTube lecture at the bottom of that notes page. You can complete the module
                    from either the notes reader or this workspace.
                </p>
            </section>

            <div class="lesson-actions">
                ${index > 0
                    ? `<a class="btn btn-secondary" href="learn.html?course=${encodeURIComponent(course.id)}&module=${encodeURIComponent(course.modules[index - 1].id)}">← Previous overview</a>`
                    : "<span></span>"}

                <button class="btn ${completedIds.includes(module.id) ? "btn-secondary" : "btn-primary"}" id="completeModule">
                    ${completedIds.includes(module.id) ? "Completed ✓" : "Mark module complete"}
                </button>

                ${index < course.modules.length - 1
                    ? `<a class="btn btn-secondary" href="learn.html?course=${encodeURIComponent(course.id)}&module=${encodeURIComponent(course.modules[index + 1].id)}">Next overview →</a>`
                    : allComplete
                        ? `<a class="btn btn-primary" href="quiz.html?course=${encodeURIComponent(course.id)}">Assessment →</a>`
                        : "<span></span>"}
            </div>
        `;

        document.getElementById("lessonTools").innerHTML = `
            <div class="tool-card card">
                <h3>Detailed module notes</h3>
                <p>Notes, code examples, diagrams and the module's recommended YouTube lecture are available in the dedicated reader.</p>
                <a class="btn btn-secondary btn-sm"
                   style="width:100%"
                   href="${notesUrl(module.id)}"
                   target="_blank"
                   rel="noopener">
                    Open notes in new tab ↗
                </a>
            </div>

            <div class="tool-card card">
                <h3>Course assessment</h3>
                <p>10 MCQs: 3 easy, 4 medium and 3 hard questions. Your result updates recommendations and the report card.</p>
                <div class="quiz-badge">
                    <span>Modules complete</span>
                    <strong>${state.completedModules}/${state.totalModules}</strong>
                </div>
                ${allComplete
                    ? `<a class="btn btn-primary btn-sm" style="width:100%;margin-top:12px" href="quiz.html?course=${encodeURIComponent(course.id)}">${state.assessmentScore !== null ? "Retake assessment" : "Start assessment"}</a>`
                    : '<button class="btn btn-secondary btn-sm" style="width:100%;margin-top:12px" disabled>Complete all modules first</button>'}
            </div>
        `;

        document.getElementById("completeModule")?.addEventListener("click", async () => {
            const isComplete = completedIds.includes(module.id);
            const button = document.getElementById("completeModule");
            button.disabled = true;

            try {
                await SkillForgeAPI.updateProgress(course.id, module.id, !isComplete);
                sfToast(isComplete ? "Module marked incomplete." : "Module completed.", "success");
                setTimeout(() => location.reload(), 250);
            } catch (error) {
                sfToast(error.message, "error");
                button.disabled = false;
            }
        });
    } catch (error) {
        document.getElementById("lessonContent").innerHTML = `
            <div class="empty-state">
                ${escapeHtml(error.message)}
                <br>
                <a class="btn btn-secondary btn-sm" style="margin-top:12px" href="my-learning.html">Back to My Learning</a>
            </div>
        `;
    }
});
