# SkillForge ? Personalized Learning and Skill Development Ecosystem

SkillForge is a local college lab project built with HTML, CSS, vanilla JavaScript, Node.js, Express, MySQL and session authentication.

## What changed

- All ten curated courses now contain exactly five modules and ten assessment questions (3 easy, 4 medium, 3 hard). The first three module IDs and their learning content are preserved. Every module has assessment coverage and detailed notes.
- Logged-in learners can create private courses from a topic, level, learning goal and 5?10 modules (default 6). Gemini returns structured JSON, which is validated before saving.
- Course creation saves modules, ten questions and automatic enrollment in one transaction. Generated courses reuse course details, My Learning, the workspace, notes, progress, assessments, dashboard, skills, recommendations and report cards.
- Invalid Gemini output is retried once. A labeled offline template can be used when generation is unavailable. Supported topics: Java, Node.js, HTML and CSS, JavaScript, Python and MySQL.
- Assessments require all modules complete and exactly ten integer answers from 0 to 3. Scores are calculated on the server. Answers and explanations are hidden until submission.

## Software

Install Node.js 20 or newer (Node 24 was used for verification), npm and MySQL 8.0.16 or newer. Use a modern browser. No frontend build tool or framework is required.

## Setup, in order

1. Open a terminal in the project root. Install backend dependencies:

   ```powershell
   cd SkillForge-Backend
   npm ci
   ```

2. For a **new database only**, open MySQL and import the original schema:

   ```text
   mysql -u root -p
   SOURCE C:/path/to/SkillForge-Complete/SkillForge-Backend/database/skillforge.sql;
   exit
   ```

   If your existing SkillForge database is already configured, keep it and skip this step.

3. If the backend has no `.env` yet, copy `.env.example` to `.env`. Do not overwrite an existing configuration. Set `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` and `SESSION_SECRET` locally. Keep the real `.env` private.

4. From `SkillForge-Backend`, apply the additive migration:

   ```powershell
   npm run migrate
   ```

   This uses the database configured in `.env` and creates only `generated_courses`, `generated_modules` and `generated_questions`. It is safe to repeat and does not rewrite existing learner tables or records. Alternatively, in MySQL select your database and run `SOURCE C:/path/to/SkillForge-Complete/SkillForge-Backend/database/generated-courses.sql;`.

5. For Gemini generation, create an API key in [Google AI Studio](https://aistudio.google.com/apikey). Put it **only** in `SkillForge-Backend/.env`:

   ```dotenv
   GEMINI_API_KEY=your-key-goes-here
   GEMINI_MODEL=gemini-3.5-flash
   ALLOW_TEMPLATE_FALLBACK=true
   ```

   The example file contains an empty key. The model is configurable; choose a structured-output-capable model available to your account. Restart the backend after changing environment settings. The implementation uses the official `@google/genai` SDK with JSON Schema and server-side Zod checks; see [Google structured-output documentation](https://ai.google.dev/gemini-api/docs/structured-output).

   For an offline demonstration, leave `GEMINI_API_KEY=` empty and keep `ALLOW_TEMPLATE_FALLBACK=true`. Set fallback to `false` to require Gemini. Only the topic, selected level, learning goal and module count are sent with generation rules; no profile or session identity is sent. Avoid entering personal information in the form.

6. Start the backend in one terminal:

   ```powershell
   cd SkillForge-Backend
   npm start
   ```

   If already inside that folder, just run `npm start`. API: `http://127.0.0.1:5000`.

7. Start the frontend in a second terminal, also inside `SkillForge-Backend`:

   ```powershell
   npm run frontend
   ```

   Open `http://127.0.0.1:3000`. Use this host consistently so session cookies work. VS Code Live Preview on the same origin is also supported. The frontend server serves only `SkillForge-Frontend`, never backend files or `.env`.

## Demonstrate one course

1. Register or log in, then choose **Create Course** in the sidebar.
2. Enter `Java Programming`, choose Beginner, enter a goal such as `Learn Java for college programs`, and select 6 modules.
3. Choose **Generate course**. The form disables duplicate submissions. On success it identifies Gemini or the offline template, then opens course details.
4. Open **My Learning**, continue the new course and read its module notes. Use **Complete & continue** to work through every module. Assessment access remains blocked until all modules are complete.
5. Answer all ten questions and submit. Review the score and weak modules, then visit Dashboard, Skills and Progress/report card.
6. Log in as another learner and try the generated course URL: the backend returns not found. Generated courses are private.

## Validation and tests

From `SkillForge-Backend`:

```powershell
npm run validate
npm run check
npm test
npm run test:db
```

- `validate`: checks all ten curated courses, module IDs/content/notes, question counts, module coverage, answer indices, 3/4/3 distribution and next-course references.
- `check`: syntax-checks backend, tests and frontend JavaScript.
- `test`: offline automated tests; no database, API key or internet required. Includes mocked Gemini/SDK responses, invalid output, all 36 topic/count template combinations, HTTP authentication/ownership, assessment safety, concurrent generation and transaction behavior.
- `test:db`: optional real local MySQL integration check, after migration. Creates two uniquely named disposable learners, exercises registration/login, generation, enrollment, privacy, notes, progress, assessment, dashboard/report/skills and real rollback. Deletes only its own test users and their cascading records. Forces template generation and never calls Gemini.

## Important implementation files

- `SkillForge-Backend/services/courseRepository.js`: unified curated/generated lookup, ownership filtering and transactional creation.
- `SkillForge-Backend/services/courseGenerator.js`: official SDK adapter, timeout, one retry, safe logging and fallback.
- `SkillForge-Backend/services/courseValidation.js`: input/schema/content validation.
- `SkillForge-Backend/services/courseTemplates.js`, `data/templates.json`, `data/templatePractice.js`: fixed offline learning material and assessments.
- `SkillForge-Backend/routes/generatedCourses.js`: authenticated creation with one active request per learner.
- `SkillForge-Backend/database/generated-courses.sql`: additive migration.
- `SkillForge-Backend/data/courses.js`, `SkillForge-Frontend/js/notes-data.js`: expanded curated material.
- `SkillForge-Frontend/create-course.html`, `js/create-course.js`: learner form using existing theme and responsive components.
- Existing course, learning and dashboard routes and `utils/learningEngine.js` now use accessible course data; the existing notes reader also accepts server-provided guides.
- `SkillForge-Backend/tests/`: offline checks and optional live database flow.

## Lab limitations

The in-memory session store and per-user generation lock assume one local backend process. Templates have a fixed foundations syllabus: counts expand selected lessons into guided-practice modules, but the selected level/goal does not create new expert-level template content. Gemini provides content personalization when configured. Generated material should be reviewed critically while learning; schema checks cannot prove factual accuracy.

The delivered ZIP excludes real `.env` files, installed `node_modules`, temporary tooling and test browser profiles. Run `npm ci` after extracting. The live Gemini API was not called during verification; the integration was tested with mock responses and the real database flow used templates.
