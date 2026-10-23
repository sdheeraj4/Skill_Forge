document.addEventListener("DOMContentLoaded", async () => {
    const user = await sfRequireAuth();
    if (!user) {
        return;
    }

    const summary = document.getElementById("profileSummary");
    const form = document.getElementById("profileForm");

    try {
        const reportData = await SkillForgeAPI.getReportCard();
        const report = reportData.reportCard;

        summary.innerHTML = `
            <div class="avatar">${sfInitials(user.name)}</div>
            <h2>${escapeHtml(user.name)}</h2>
            <p>${escapeHtml(user.email)}</p>
            <div class="profile-stats">
                <div class="profile-stat"><strong>${report.summary.coursesEnrolled}</strong><span class="muted">Courses</span></div>
                <div class="profile-stat"><strong>${report.skillProfile.length}</strong><span class="muted">Skills</span></div>
            </div>
        `;

        form.name.value = user.name || "";
        form.email.value = user.email || "";
        form.level.value = user.skillLevel || "Beginner";
        form.goal.value = user.learningGoal || "";

        (user.interests || []).forEach((interest) => {
            const checkbox = [...form.querySelectorAll('[name="interests"]')]
                .find((item) => item.value === interest);
            if (checkbox) {
                checkbox.checked = true;
            }
        });
    } catch (error) {
        sfToast(error.message, "error");
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const interests = formData.getAll("interests");
        const button = form.querySelector('button[type="submit"]');

        if (!interests.length) {
            sfToast("Select at least one learning interest.", "error");
            return;
        }

        button.disabled = true;
        button.textContent = "Saving...";

        try {
            await SkillForgeAPI.updateProfile({
                name: String(formData.get("name") || "").trim(),
                interests,
                skillLevel: formData.get("level"),
                learningGoal: String(formData.get("goal") || "").trim()
            });
            await sfRefreshSessionUser();
            sfToast("Profile updated.", "success");
            setTimeout(() => location.reload(), 300);
        } catch (error) {
            sfToast(error.message, "error");
            button.disabled = false;
            button.textContent = "Save profile";
        }
    });
});
