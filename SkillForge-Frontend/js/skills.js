document.addEventListener("DOMContentLoaded", async () => {
    const user = await sfRequireAuth();
    if (!user) {
        return;
    }

    try {
        const [reportData, recommendationData] = await Promise.all([
            SkillForgeAPI.getReportCard(),
            SkillForgeAPI.getRecommendations()
        ]);
        const skills = reportData.reportCard.skillProfile;
        const average = skills.length
            ? Math.round(skills.reduce((sum, item) => sum + item.score, 0) / skills.length)
            : 0;

        document.getElementById("skillScore").textContent = average;
        document.getElementById("skillCount").textContent = skills.length;

        document.getElementById("skillCards").innerHTML = skills.length
            ? skills.map((item) => `
                <article class="skill-card card">
                    <div class="skill-card-top">
                        <h3>${escapeHtml(item.skill)}</h3>
                        <strong>${item.score}%</strong>
                    </div>
                    <div class="skill-level">
                        ${item.score >= 90 ? "Excellent" : item.score >= 75 ? "Strong" : item.score >= 60 ? "Developing well" : "Needs reinforcement"}
                    </div>
                    <div class="progress"><span style="width:${item.score}%"></span></div>
                </article>
            `).join("")
            : '<div class="empty-state" style="grid-column:1/-1">Your skill map is generated from course assessment performance. Complete your first assessment to see it here.</div>';

        const next = recommendationData.recommendations[0];
        document.getElementById("nextSkill").innerHTML = next
            ? `
                <div>
                    <span class="eyebrow">Performance-aware next move</span>
                    <h3 style="margin:6px 0">${escapeHtml(next.title)}</h3>
                    <p class="muted" style="margin:0">${escapeHtml(next.reason)}</p>
                </div>
                <a class="btn btn-primary" href="course.html?id=${encodeURIComponent(next.courseId)}">View course →</a>
            `
            : '<div><strong>Keep learning.</strong><div class="muted">No additional recommendation is needed right now.</div></div>';
    } catch (error) {
        sfToast(error.message, "error");
    }
});
