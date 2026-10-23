document.addEventListener("DOMContentLoaded", async () => {
    const user = await sfRequireAuth();
    if (!user) {
        return;
    }

    const grid = document.getElementById("myLearningGrid");

    try {
        const learning = await SkillForgeAPI.getMyLearning();
        if (!learning.courses.length) {
            grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1">You have not enrolled in a course yet.<br><a class="btn btn-primary btn-sm" style="margin-top:12px" href="courses.html">Explore courses</a></div>';
            return;
        }

        const details = await Promise.all(learning.courses.map((item) => SkillForgeAPI.getCourse(item.courseId)));
        const detailMap = new Map(details.map((item) => [item.course.id, item.course]));

        grid.innerHTML = learning.courses.map((state) => {
            const course = detailMap.get(state.courseId);
            const visual = sfCourseVisual(state.courseId);
            const completedIds = state.completedModuleIds || [];
            const nextModule = course.modules.find((module) => !completedIds.includes(module.id)) || course.modules[0];

            let actionHref = `learn.html?course=${encodeURIComponent(state.courseId)}&module=${encodeURIComponent(nextModule.id)}`;
            let actionLabel = "Continue learning";

            if (state.status === "Assessment Pending") {
                actionHref = `quiz.html?course=${encodeURIComponent(state.courseId)}`;
                actionLabel = "Take assessment";
            } else if (state.status === "Revision Required") {
                actionHref = `quiz.html?course=${encodeURIComponent(state.courseId)}`;
                actionLabel = "Retake assessment";
            } else if (state.status === "Completed") {
                actionHref = "progress.html#reportCardSection";
                actionLabel = "View report card";
            }

            return `
                <article class="learning-card card">
                    <div class="learning-card-head">
                        <div class="course-symbol">${escapeHtml(visual.symbol)}</div>
                        <div>
                            <h3>${escapeHtml(state.title)}</h3>
                            <p>${escapeHtml(state.category)} · ${state.totalModules} modules</p>
                        </div>
                        <span class="pill">${escapeHtml(state.status)}</span>
                    </div>
                    <div class="progress"><span style="width:${state.progressPercent}%"></span></div>
                    <div class="progress-label">
                        <span>${state.progressPercent}% module progress</span>
                        <span>${state.completedModules}/${state.totalModules} modules</span>
                    </div>
                    ${state.assessmentScore !== null
                        ? `<div class="quiz-badge" style="margin-top:12px"><span>Assessment</span><strong>${state.assessmentScore}% · ${escapeHtml(state.performance)}</strong></div>`
                        : ""}
                    <div class="learning-card-actions">
                        <a class="btn btn-primary btn-sm" href="${actionHref}">${actionLabel}</a>
                        <a class="btn btn-secondary btn-sm" href="course.html?id=${encodeURIComponent(state.courseId)}">Details</a>
                    </div>
                </article>
            `;
        }).join("");
    } catch (error) {
        grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">${escapeHtml(error.message)}</div>`;
    }
});
