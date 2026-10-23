const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../db");
const requireAuth = require("../middleware/auth");
const { parseJson } = require("../utils/learningEngine");

const router = express.Router();

function safeUser(row) {
    return {
        id: row.id,
        name: row.name,
        email: row.email,
        interests: parseJson(row.interests, []),
        skillLevel: row.skill_level,
        learningGoal: row.learning_goal
    };
}

router.post("/register", async (req, res, next) => {
    try {
        const { name, email, password, interests = [], skillLevel = "Beginner", learningGoal = "" } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email and password are required." });
        }

        if (String(password).length < 6) {
            return res.status(400).json({ message: "Password must contain at least 6 characters." });
        }

        const normalizedEmail = String(email).trim().toLowerCase();
        const [existing] = await db.execute("SELECT id FROM users WHERE email = ?", [normalizedEmail]);

        if (existing.length) {
            return res.status(409).json({ message: "An account with this email already exists." });
        }

        const passwordHash = await bcrypt.hash(String(password), 10);
        const interestJson = JSON.stringify(Array.isArray(interests) ? interests : []);

        const [result] = await db.execute(
            `INSERT INTO users (name, email, password_hash, interests, skill_level, learning_goal)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [String(name).trim(), normalizedEmail, passwordHash, interestJson, skillLevel, learningGoal]
        );

        req.session.userId = result.insertId;

        const [rows] = await db.execute(
            "SELECT id, name, email, interests, skill_level, learning_goal FROM users WHERE id = ?",
            [result.insertId]
        );

        res.status(201).json({ message: "Registration successful.", user: safeUser(rows[0]) });
    } catch (error) {
        next(error);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const normalizedEmail = String(email).trim().toLowerCase();
        const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [normalizedEmail]);

        if (!rows.length) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const user = rows[0];
        const matches = await bcrypt.compare(String(password), user.password_hash);

        if (!matches) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        req.session.userId = user.id;
        res.json({ message: "Login successful.", user: safeUser(user) });
    } catch (error) {
        next(error);
    }
});

router.post("/logout", requireAuth, (req, res, next) => {
    req.session.destroy((error) => {
        if (error) {
            return next(error);
        }
        res.clearCookie("skillforge.sid");
        res.json({ message: "Logged out successfully." });
    });
});

router.get("/me", requireAuth, async (req, res, next) => {
    try {
        const [rows] = await db.execute(
            "SELECT id, name, email, interests, skill_level, learning_goal FROM users WHERE id = ?",
            [req.session.userId]
        );

        if (!rows.length) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json({ user: safeUser(rows[0]) });
    } catch (error) {
        next(error);
    }
});

router.put("/me", requireAuth, async (req, res, next) => {
    try {
        const { name, interests, skillLevel, learningGoal } = req.body;

        const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [req.session.userId]);
        if (!rows.length) {
            return res.status(404).json({ message: "User not found." });
        }

        const current = rows[0];
        const nextName = name !== undefined ? String(name).trim() : current.name;
        const nextInterests = interests !== undefined ? JSON.stringify(Array.isArray(interests) ? interests : []) : current.interests;
        const nextSkillLevel = skillLevel !== undefined ? skillLevel : current.skill_level;
        const nextLearningGoal = learningGoal !== undefined ? learningGoal : current.learning_goal;

        await db.execute(
            `UPDATE users
             SET name = ?, interests = ?, skill_level = ?, learning_goal = ?
             WHERE id = ?`,
            [nextName, nextInterests, nextSkillLevel, nextLearningGoal, req.session.userId]
        );

        const [updated] = await db.execute(
            "SELECT id, name, email, interests, skill_level, learning_goal FROM users WHERE id = ?",
            [req.session.userId]
        );

        res.json({ message: "Profile updated.", user: safeUser(updated[0]) });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
