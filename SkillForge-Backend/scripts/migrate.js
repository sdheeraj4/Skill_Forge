// Runs only the additive generated-course migration against the configured database.
require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const db = require('../db');
(async () => {
    try {
        const sql = fs.readFileSync(path.join(__dirname, '../database/generated-courses.sql'), 'utf8');
        for (const statement of sql.split(';').map(s => s.trim()).filter(Boolean)) await db.query(statement);
        console.log('Generated-course tables are ready. Existing learner data was preserved.');
    } catch {
        console.error('Migration failed. Check MySQL, your backend .env database settings and CREATE permissions.');
        process.exitCode = 1;
    } finally { await db.end(); }
})();
