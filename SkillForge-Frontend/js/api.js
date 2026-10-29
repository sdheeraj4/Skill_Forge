const isLocalSeparateFrontend =
    (window.location.hostname === "127.0.0.1" ||
        window.location.hostname === "localhost") &&
    window.location.port === "3000";

const API_BASE_URL = isLocalSeparateFrontend
    ? "http://127.0.0.1:5000/api"
    : "https://skill-forge-xi2l.onrender.com/api";

class SkillForgeApiError extends Error {
    constructor(message, status = 0, data = null) {
        super(message);
        this.name = "SkillForgeApiError";
        this.status = status;
        this.data = data;
    }
}

async function apiRequest(endpoint, options = {}) {
    const config = {
        method: options.method || "GET",
        credentials: "include",
        headers: {
            Accept: "application/json",
            ...(options.headers || {})
        }
    };

    if (options.body !== undefined) {
        config.headers["Content-Type"] = "application/json";
        config.body = options.body;
    }

    let response;

    try {
        response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    } catch (error) {
        throw new SkillForgeApiError(
            "Cannot reach the SkillForge backend. Make sure it is running.",
            0,
            null
        );
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new SkillForgeApiError(
            data.message || `Request failed with status ${response.status}.`,
            response.status,
            data
        );
    }

    return data;
}

window.SkillForgeApiError = SkillForgeApiError;

window.SkillForgeAPI = {
    createCourse(input) {
        return apiRequest("/generated-courses", {
            method: "POST",
            body: JSON.stringify(input)
        });
    },

    health() {
        return apiRequest("/health");
    },

    register(userData) {
        return apiRequest("/register", {
            method: "POST",
            body: JSON.stringify(userData)
        });
    },

    login(email, password) {
        return apiRequest("/login", {
            method: "POST",
            body: JSON.stringify({ email, password })
        });
    },

    logout() {
        return apiRequest("/logout", { method: "POST" });
    },

    getCurrentUser() {
        return apiRequest("/me");
    },

    updateProfile(profileData) {
        return apiRequest("/me", {
            method: "PUT",
            body: JSON.stringify(profileData)
        });
    },

    getCourses() {
        return apiRequest("/courses");
    },

    getCourse(courseId) {
        return apiRequest(`/courses/${encodeURIComponent(courseId)}`);
    },

    enroll(courseId) {
        return apiRequest(`/enroll/${encodeURIComponent(courseId)}`, {
            method: "POST"
        });
    },

    getMyLearning() {
        return apiRequest("/my-learning");
    },

    updateProgress(courseId, moduleId, completed = true) {
        return apiRequest("/progress", {
            method: "POST",
            body: JSON.stringify({ courseId, moduleId, completed })
        });
    },

    getQuiz(courseId) {
        return apiRequest(`/quiz/${encodeURIComponent(courseId)}`);
    },

    submitQuiz(courseId, answers) {
        return apiRequest("/quiz/submit", {
            method: "POST",
            body: JSON.stringify({ courseId, answers })
        });
    },

    getDashboard() {
        return apiRequest("/dashboard");
    },

    getRecommendations() {
        return apiRequest("/recommendations");
    },

    getReportCard() {
        return apiRequest("/report-card");
    }
};