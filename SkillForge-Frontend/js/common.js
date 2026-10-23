(function() {
    const icons = {
        home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10.5V21h14V10.5"/><path d="M9 21v-6h6v6"/>',
        compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z"/>',
        book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5A2.5 2.5 0 0 1 20 21.5v-16Z"/>',
        spark: '<path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/>',
        chart: '<path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/>',
        user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
        sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
        menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
        search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
        logout: '<path d="M10 4H5v16h5"/><path d="m14 8 4 4-4 4M18 12H9"/>'
    };

    let sessionPromise = null;

    window.icon = (name) => '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">' + (icons[name] || icons.spark) + '</svg>';

    window.escapeHtml = function(value = "") {
        return String(value).replace(/[&<>"']/g, (ch) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        })[ch]);
    };

    window.sfInitials = function(name = "Learner") {
        return String(name)
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0])
            .join("")
            .toUpperCase() || "L";
    };

    window.sfCourseVisual = function(courseId) {
        return window.SF_UI?.courseVisuals?.[courseId] || {
            symbol: "SF",
            colors: ["#282454", "#665cf5"]
        };
    };

    window.sfToast = function(message, type = "") {
        let wrap = document.querySelector(".toast-wrap");
        if (!wrap) {
            wrap = document.createElement("div");
            wrap.className = "toast-wrap";
            document.body.appendChild(wrap);
        }

        const toast = document.createElement("div");
        toast.className = "toast " + type;
        toast.textContent = message;
        wrap.appendChild(toast);
        setTimeout(() => toast.remove(), 3200);
    };

    function applyTheme() {
        document.documentElement.dataset.theme = localStorage.getItem("sf.theme") || "light";
    }

    window.sfToggleTheme = function() {
        const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        localStorage.setItem("sf.theme", next);
    };

    window.sfGetSessionUser = function(force = false) {
        if (force || !sessionPromise) {
            sessionPromise = SkillForgeAPI.getCurrentUser()
                .then((data) => data.user)
                .catch((error) => {
                    if (error.status === 401) {
                        return null;
                    }
                    throw error;
                });
        }
        return sessionPromise;
    };

    window.sfRefreshSessionUser = function() {
        sessionPromise = null;
        return sfGetSessionUser(true);
    };

    window.sfRequireAuth = async function() {
        try {
            const user = await sfGetSessionUser();
            if (!user) {
                const current = location.pathname.split("/").pop() + location.search;
                location.replace("login.html?next=" + encodeURIComponent(current));
                return null;
            }
            return user;
        } catch (error) {
            sfToast(error.message, "error");
            return null;
        }
    };

    function sidebar(user) {
        const element = document.getElementById("appSidebar");
        if (!element || !user) {
            return;
        }

        const page = document.body.dataset.page || "";
        const links = [
            ["dashboard", "dashboard.html", "home", "Dashboard"],
            ["courses", "courses.html", "compass", "Explore"],
            ["learning", "my-learning.html", "book", "My Learning"],
            ["create", "create-course.html", "spark", "Create Course"],
            ["skills", "skills.html", "spark", "Skills"],
            ["progress", "progress.html", "chart", "Progress"],
            ["profile", "profile.html", "user", "Profile"]
        ];

        element.innerHTML = `
            <a class="brand" href="dashboard.html">
                <img src="assets/skillforge-logo.svg" alt="">
                <span>SkillForge</span>
            </a>
            <nav class="sidebar-nav">
                ${links.map(([id, url, iconName, label]) => `
                    <a class="sidebar-link ${page === id ? "active" : ""}" href="${url}">
                        ${icon(iconName)}
                        <span>${label}</span>
                    </a>
                `).join("")}
            </nav>
            <div class="sidebar-bottom">
                <button class="sidebar-link" id="themeButton" style="border:0;background:transparent;width:100%;text-align:left">
                    ${icon("sun")}
                    <span>Theme</span>
                </button>
                <button class="sidebar-link" id="logoutButton" style="border:0;background:transparent;width:100%;text-align:left">
                    ${icon("logout")}
                    <span>Logout</span>
                </button>
                <div class="user-mini">
                    <div class="avatar">${sfInitials(user.name)}</div>
                    <div>
                        <b>${escapeHtml(user.name)}</b>
                        <span>${escapeHtml(user.skillLevel || "Learner")}</span>
                    </div>
                </div>
            </div>
        `;

        document.getElementById("themeButton")?.addEventListener("click", sfToggleTheme);
        document.getElementById("logoutButton")?.addEventListener("click", async () => {
            try {
                await SkillForgeAPI.logout();
            } catch (error) {
                if (error.status !== 401) {
                    sfToast(error.message, "error");
                }
            } finally {
                sessionPromise = Promise.resolve(null);
                location.href = "index.html";
            }
        });
    }

    function topbar() {
        const element = document.getElementById("appTopbar");
        if (!element) {
            return;
        }

        const title = document.body.dataset.title || "SkillForge";
        element.innerHTML = `
            <div style="display:flex;align-items:center;gap:10px">
                <button class="icon-btn mobile-sidebar-button" id="openSidebar">${icon("menu")}</button>
                <div class="page-title">${escapeHtml(title)}</div>
            </div>
            <div class="top-actions">
                <a class="icon-btn" href="courses.html" aria-label="Search courses">${icon("search")}</a>
                <a class="btn btn-secondary btn-sm top-label" href="profile.html">My profile</a>
            </div>
        `;

        document.getElementById("openSidebar")?.addEventListener("click", () => {
            document.getElementById("appSidebar")?.classList.toggle("open");
        });
    }

    function updateGuestActions(user) {
        if (!user) {
            return;
        }

        document.querySelectorAll('.guest-actions a[href="login.html"]').forEach((link) => {
            link.href = "dashboard.html";
            link.textContent = "Dashboard";
        });

        document.querySelectorAll('.guest-actions a[href="register.html"]').forEach((link) => {
            link.href = "profile.html";
            link.textContent = "My profile";
        });
    }

    function mobileGuest() {
        document.getElementById("guestMenuButton")?.addEventListener("click", () => {
            document.querySelector(".guest-links")?.classList.toggle("hidden-mobile");
        });
    }

    applyTheme();

    document.addEventListener("DOMContentLoaded", async () => {
        mobileGuest();
        document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
            button.addEventListener("click", sfToggleTheme);
        });
        document.querySelectorAll("[data-year]").forEach((element) => {
            element.textContent = new Date().getFullYear();
        });

        let user = null;
        try {
            user = await sfGetSessionUser();
        } catch (error) {
            sfToast(error.message, "error");
        }

        if (document.body.dataset.protected === "true" && !user) {
            const current = location.pathname.split("/").pop() + location.search;
            location.replace("login.html?next=" + encodeURIComponent(current));
            return;
        }

        updateGuestActions(user);
        sidebar(user);
        topbar();
    });
})();
