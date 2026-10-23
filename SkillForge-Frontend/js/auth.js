document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const button = loginForm.querySelector('button[type="submit"]');
            const email = loginForm.email.value.trim().toLowerCase();
            const password = loginForm.password.value;

            button.disabled = true;
            button.textContent = "Signing in...";

            try {
                await SkillForgeAPI.login(email, password);
                await sfRefreshSessionUser();
                const next = new URLSearchParams(location.search).get("next");
                location.href = next || "dashboard.html";
            } catch (error) {
                sfToast(error.message, "error");
            } finally {
                button.disabled = false;
                button.textContent = "Login →";
            }
        });
    }

    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(registerForm);
            const name = String(formData.get("name") || "").trim();
            const email = String(formData.get("email") || "").trim().toLowerCase();
            const password = String(formData.get("password") || "");
            const confirm = String(formData.get("confirm") || "");
            const button = registerForm.querySelector('button[type="submit"]');

            if (name.length < 3) {
                sfToast("Enter your full name.", "error");
                return;
            }
            if (!/^\S+@\S+\.\S+$/.test(email)) {
                sfToast("Enter a valid email address.", "error");
                return;
            }
            if (password.length < 8) {
                sfToast("Password must be at least 8 characters.", "error");
                return;
            }
            if (password !== confirm) {
                sfToast("Passwords do not match.", "error");
                return;
            }

            button.disabled = true;
            button.textContent = "Creating account...";

            try {
                await SkillForgeAPI.register({
                    name,
                    email,
                    password,
                    interests: [],
                    skillLevel: "Beginner",
                    learningGoal: ""
                });
                await sfRefreshSessionUser();
                location.href = "onboarding.html";
            } catch (error) {
                sfToast(error.message, "error");
            } finally {
                button.disabled = false;
                button.textContent = "Create account →";
            }
        });
    }

    const onboardingForm = document.getElementById("onboardingForm");
    if (onboardingForm) {
        (async () => {
            const user = await sfRequireAuth();
            if (!user) {
                return;
            }

            onboardingForm.level.value = user.skillLevel || "Beginner";
            onboardingForm.goal.value = user.learningGoal || "";
            (user.interests || []).forEach((interest) => {
                const checkbox = [...onboardingForm.querySelectorAll('[name="interests"]')]
                    .find((item) => item.value === interest);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });
        })();

        onboardingForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(onboardingForm);
            const interests = formData.getAll("interests");
            const button = onboardingForm.querySelector('button[type="submit"]');

            if (!interests.length) {
                sfToast("Select at least one learning interest.", "error");
                return;
            }

            button.disabled = true;
            button.textContent = "Building dashboard...";

            try {
                await SkillForgeAPI.updateProfile({
                    interests,
                    skillLevel: formData.get("level"),
                    learningGoal: String(formData.get("goal") || "").trim()
                });
                await sfRefreshSessionUser();
                sfToast("Learning profile created.", "success");
                setTimeout(() => {
                    location.href = "dashboard.html";
                }, 350);
            } catch (error) {
                sfToast(error.message, "error");
            } finally {
                button.disabled = false;
                button.textContent = "Build my dashboard →";
            }
        });
    }
});
