# SkillForge Backend

Express, MySQL and session authentication for the SkillForge local lab project.

See the [root README](../README.md) for complete setup, Gemini key configuration, database migration and the demonstration procedure.

```powershell
npm ci
npm run migrate
npm start
```

Use a separate terminal for `npm run frontend`. Validation: `npm run validate`, `npm run check`, `npm test`. Optional live MySQL check: `npm run test:db`.

Ten curated courses each contain five modules and ten questions. Private generated courses contain 5?10 modules and ten questions. Three additive generated-course tables supplement the existing users, enrollments, progress and quiz_results tables. Existing data is preserved. Apply `database/generated-courses.sql` using `npm run migrate` before using the updated authenticated learning pages.
