document.addEventListener("DOMContentLoaded", async () => {
    const user = await sfRequireAuth();
    if (!user) {
        return;
    }

    try {
        const [dashboardData, reportData] = await Promise.all([
            SkillForgeAPI.getDashboard(),
            SkillForgeAPI.getReportCard()
        ]);

        const report = reportData.reportCard;
        document.getElementById("welcomeName").textContent = (dashboardData.learner.name || "Learner").split(" ")[0];
        document.getElementById("statCourses").textContent = dashboardData.summary.coursesEnrolled;
        document.getElementById("statModules").textContent = dashboardData.summary.modulesCompleted;
        document.getElementById("statQuiz").textContent = dashboardData.summary.assessmentsAttempted
            ? `${dashboardData.summary.overallAverage}%`
            : "—";
        document.getElementById("statSkills").textContent = report.skillProfile.length;

        const continueLearning = document.getElementById("continueLearning");
        const active = dashboardData.currentCourses[0];
        if (active) {
            const statusText = active.status === "Revision Required"
                ? `Assessment ${active.latestScore}% · revision recommended`
                : `${active.progressPercent}% modules complete`;
            const href = active.status === "Assessment Pending" || active.status === "Revision Required"
                ? `quiz.html?course=${encodeURIComponent(active.courseId)}`
                : `learn.html?course=${encodeURIComponent(active.courseId)}`;
            const label = active.status === "Assessment Pending"
                ? "Take assessment →"
                : active.status === "Revision Required"
                    ? "Review & retake →"
                    : "Resume →";

            continueLearning.innerHTML = `
                <div class="continue-card">
                    <div>
                        <div class="meta">Continue learning · ${escapeHtml(active.status)}</div>
                        <h3>${escapeHtml(active.title)}</h3>
                        <div class="progress"><span style="width:${active.progressPercent}%"></span></div>
                        <div class="progress-label">
                            <span>${escapeHtml(statusText)}</span>
                            <span>${active.completedModules}/${active.totalModules} modules</span>
                        </div>
                    </div>
                    <a class="btn btn-secondary" href="${href}">${label}</a>
                </div>
            `;
        } else {
            continueLearning.innerHTML = '<div class="empty-state">No active course right now. <a href="courses.html" style="color:var(--primary);font-weight:800">Explore your next course</a>.</div>';
        }

        const recommendations = document.getElementById("recommendations");
        recommendations.innerHTML = dashboardData.recommendations.length
            ? dashboardData.recommendations.slice(0, 3).map((item) => {
                const visual = sfCourseVisual(item.courseId);
                return `
                    <article class="recommend-card">
                        <div class="course-cover" style="--coverA:${visual.colors[0]};--coverB:${visual.colors[1]}">
                            <div class="course-symbol">${escapeHtml(visual.symbol)}</div>
                            <span class="pill" style="background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.15);color:#fff">${escapeHtml(item.level)}</span>
                        </div>
                        <div class="course-body">
                            <h3>${escapeHtml(item.title)}</h3>
                            <p>${escapeHtml(item.reason)}</p>
                            <div class="course-meta"><span>${escapeHtml(item.category)}</span></div>
                            <a class="btn btn-secondary btn-sm" style="margin-top:12px;width:100%" href="course.html?id=${encodeURIComponent(item.courseId)}">View course</a>
                        </div>
                    </article>
                `;
            }).join("")
            : '<div class="muted">Complete more learning activity to generate recommendations.</div>';

        const skillList = report.skillProfile.slice(0, 5);
        document.getElementById("dashboardSkills").innerHTML = skillList.length
            ? skillList.map((item) => `
                <div class="skill-row">
                    <strong>${escapeHtml(item.skill)}</strong>
                    <span>${item.score}%</span>
                    <div class="progress"><span style="width:${item.score}%"></span></div>
                </div>
            `).join("")
            : '<div class="muted">Complete a course assessment to generate your skill profile.</div>';

        const activityItems = [];
        dashboardData.recentResults.slice(0, 3).forEach((item) => {
            activityItems.push({
                icon: "chart",
                text: `${item.title}: ${item.latestScore}% (${item.performance})`,
                detail: `${item.attempts} assessment attempt${item.attempts === 1 ? "" : "s"}`
            });
        });
        dashboardData.currentCourses.slice(0, 2).forEach((item) => {
            activityItems.push({
                icon: "book",
                text: `${item.title}: ${item.progressPercent}% complete`,
                detail: item.status
            });
        });

        document.getElementById("recentActivity").innerHTML = activityItems.length
            ? activityItems.map((item) => `
                <div class="activity-item">
                    <div class="activity-icon">${icon(item.icon)}</div>
                    <div><b>${escapeHtml(item.text)}</b><span>${escapeHtml(item.detail)}</span></div>
                </div>
            `).join("")
            : '<div class="muted">Your learning activity will appear here.</div>';
    } catch (error) {
        sfToast(error.message, "error");
    }
});
