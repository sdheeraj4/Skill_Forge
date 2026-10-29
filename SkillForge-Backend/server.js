require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const db = require("./db");

const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/courses");
const learningRoutes = require("./routes/learning");
const dashboardRoutes = require("./routes/dashboard");

const app = express();
const PORT = Number(process.env.PORT || 5000);
const FRONTEND_ORIGIN =
    process.env.FRONTEND_ORIGIN || "http://127.0.0.1:3000";
const isProduction = process.env.NODE_ENV === "production";

if (isProduction && !process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET must be set in production.");
}

if (isProduction) {
    app.set("trust proxy", 1);
}

app.use(cors({
    origin: FRONTEND_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "1mb" }));

app.use(session({
    name: "skillforge.sid",
    secret: process.env.SESSION_SECRET || "skillforge-lab-secret-change-me",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.get("/api/health", async (req, res) => {
    try {
        await db.query("SELECT 1");
        res.json({
            api: "ok",
            database: "connected",
            project: "SkillForge"
        });
    } catch (error) {
        res.status(503).json({
            api: "ok",
            database: "not connected",
            message: "Database is not connected."
        });
    }
});

app.use("/api", authRoutes);
app.use("/api", courseRoutes);
app.use("/api", learningRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", require("./routes/generatedCourses"));

app.use((req, res) => {
    res.status(404).json({ message: "API route not found." });
});

app.use((error, req, res, next) => {
    console.error("[API error]", error.status || 500);
    const status = error.status || 500;

    res.status(status).json({
        message: status === 500 ? "Unexpected server error." : error.message
    });
});

if (require.main === module) {
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`SkillForge API running on port ${PORT}`);
        console.log(`Allowed frontend origin: ${FRONTEND_ORIGIN}`);
    });
}

module.exports = app;