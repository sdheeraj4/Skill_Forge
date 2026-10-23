document.addEventListener("DOMContentLoaded", async () => {
    const user = await sfRequireAuth();
    if (!user) {
        return;
    }

    try {
        const reportData = await SkillForgeAPI.getReportCard();
        const report = reportData.reportCard;
        const summary = report.summary;

        document.getElementById("progressStats").innerHTML = [
            ["Courses", summary.coursesEnrolled, `${summary.coursesCompleted} completed`],
            ["Modules", summary.modulesCompleted, "Completed across enrolled courses"],
            ["Assessment avg.", summary.assessmentsAttempted ? `${summary.overallAverage}%` : "—", summary.overallPerformance],
            ["Skills", report.skillProfile.length, "Measured from assessment results"]
        ].map(([label, value, detail]) => `
            <div class="stat-card">
                <div class="stat-top">
                    <span>${escapeHtml(label)}</span>
                    <span class="stat-icon">${icon(label === "Courses" ? "book" : label === "Skills" ? "spark" : "chart")}</span>
                </div>
                <strong>${escapeHtml(value)}</strong>
                <small>${escapeHtml(detail)}</small>
            </div>
        `).join("");

        document.getElementById("courseProgressList").innerHTML = report.courses.length
            ? report.courses.map((course) => `
                <div style="margin-bottom:17px">
                    <div class="progress-label" style="margin:0 0 7px">
                        <strong style="color:var(--text)">${escapeHtml(course.title)}</strong>
                        <span>${course.progressPercent}% · ${escapeHtml(course.status)}</span>
                    </div>
                    <div class="progress"><span style="width:${course.progressPercent}%"></span></div>
                </div>
            `).join("")
            : '<div class="muted">No course progress yet.</div>';

        const activity = [];
        report.courses.forEach((course) => {
            if (course.bestScore !== null) {
                activity.push({
                    iconName: "chart",
                    title: `${course.title} assessment: ${course.bestScore}%`,
                    detail: `${course.performance} · ${course.attempts} attempt${course.attempts === 1 ? "" : "s"}`
                });
            } else if (course.completedModules > 0) {
                activity.push({
                    iconName: "book",
                    title: `${course.title}: ${course.completedModules}/${course.totalModules} modules`,
                    detail: course.status
                });
            } else {
                activity.push({
                    iconName: "spark",
                    title: `Enrolled in ${course.title}`,
                    detail: "Learning path started"
                });
            }
        });

        document.getElementById("activityList").innerHTML = activity.length
            ? activity.slice(0, 8).map((item) => `
                <div class="activity-item">
                    <div class="activity-icon">${icon(item.iconName)}</div>
                    <div><b>${escapeHtml(item.title)}</b><span>${escapeHtml(item.detail)}</span></div>
                </div>
            `).join("")
            : '<div class="muted">No learning activity yet.</div>';

        const candidate = report.candidate;
        document.getElementById("reportCandidate").innerHTML = `
            <div>
                <span class="eyebrow">SkillForge learner report</span>
                <h2>${escapeHtml(candidate.name)}</h2>
                <p>${escapeHtml(candidate.email)}</p>
            </div>
            <div class="report-score-block">
                <span>Overall average</span>
                <strong>${summary.assessmentsAttempted ? `${summary.overallAverage}%` : "—"}</strong>
                <small>${escapeHtml(summary.overallPerformance)}</small>
            </div>
        `;

        document.getElementById("reportMeta").innerHTML = `
            <div><span>Current level</span><strong>${escapeHtml(candidate.skillLevel || "Beginner")}</strong></div>
            <div><span>Courses completed</span><strong>${summary.coursesCompleted}/${summary.coursesEnrolled}</strong></div>
            <div><span>Modules completed</span><strong>${summary.modulesCompleted}</strong></div>
            <div><span>Assessments</span><strong>${summary.assessmentsAttempted}</strong></div>
        `;

        const tableBody = document.getElementById("reportCourseRows");
        tableBody.innerHTML = report.courses.length
            ? report.courses.map((course) => `
                <tr>
                    <td>${escapeHtml(course.title)}</td>
                    <td>${course.completedModules}/${course.totalModules}</td>
                    <td>${course.bestScore === null ? "—" : `${course.bestScore}%`}</td>
                    <td>${escapeHtml(course.performance)}</td>
                    <td><span class="report-status">${escapeHtml(course.status)}</span></td>
                </tr>
            `).join("")
            : '<tr><td colspan="5" class="muted">No enrolled courses yet.</td></tr>';

        const strongest = report.strongestSkills.length
            ? report.strongestSkills.map((item) => `${item.skill} (${item.score}%)`).join(", ")
            : "Complete assessments to identify strengths.";
        const improvement = report.improvementSkills.length
            ? report.improvementSkills.map((item) => `${item.skill} (${item.score}%)`).join(", ")
            : "No weak skill area identified yet.";
        const next = reportData.recommendations[0];

        document.getElementById("reportInsights").innerHTML = `
            <div class="report-insight"><span>Strongest skills</span><strong>${escapeHtml(strongest)}</strong></div>
            <div class="report-insight"><span>Needs improvement</span><strong>${escapeHtml(improvement)}</strong></div>
            <div class="report-insight"><span>Recommended next step</span><strong>${next ? escapeHtml(`${next.title} — ${next.reason}`) : "Continue your current learning path."}</strong></div>
            <div class="report-insight"><span>Learning goal</span><strong>${escapeHtml(candidate.learningGoal || "Not set")}</strong></div>
        `;

        document.getElementById("reportGenerated").textContent = `Generated ${new Date(reportData.generatedAt).toLocaleString()}`;
        document.getElementById("printReport").addEventListener("click", () => window.print());
    } catch (error) {
        sfToast(error.message, "error");
    }
});
