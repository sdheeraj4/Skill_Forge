# SkillForge API

Base URL: `http://127.0.0.1:5000/api`

For authenticated browser requests, the frontend must send `credentials: "include"`.

## Public

- `GET /health` — backend/database health check
- `POST /register` — create account and start session
- `POST /login` — login
- `GET /courses` — list the 10 courses
- `GET /courses/:courseId` — course details, 5?10 modules, notes and YouTube lecture links

## Logged-in learner

- `POST /logout`
- `GET /me`
- `PUT /me`
- `POST /enroll/:courseId`
- `GET /my-learning` — enrolled courses, status, scores and `completedModuleIds`
- `POST /progress`
- `GET /quiz/:courseId`
- `POST /quiz/submit`
- `GET /recommendations`
- `GET /dashboard`
- `GET /report-card`

## Key request examples

### Register

```json
{
  "name": "Student Name",
  "email": "student@example.com",
  "password": "student123",
  "interests": ["Web Development", "Backend"],
  "skillLevel": "Beginner",
  "learningGoal": "Become a full-stack developer"
}
```

### Mark a module complete

```json
{
  "courseId": "nodejs-essentials",
  "moduleId": "node-runtime",
  "completed": true
}
```

### Submit a course assessment

`answers` may be an array of 10 selected option indexes (0-3), in question order.

```json
{
  "courseId": "nodejs-essentials",
  "answers": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}
```

The correct answers are never included in the quiz-loading API response.

A learner stays in `Revision Required` after an assessment below 60%. A later retake with 60% or more changes the course status to `Completed`.

## Personalized course creation

`POST /api/generated-courses` requires a session. Send JSON: `{"topic":"Java","level":"Beginner","learningGoal":"Learn Java for college programs","moduleCount":6}`. Allowed levels: Beginner, Intermediate, Advanced; module count: integer 5?10. Returns 201 with `courseId`, `source` (`gemini` or `template`) and a message. Automatically enrolls the creator. Errors: 400 invalid input, 401 unauthenticated, 429 generation already active, 503 generation unavailable.

Existing course list/detail endpoints include only the current learner's generated courses. Anonymous requests see curated courses only. Private ownership is checked for enrollment, progress and assessment reads/submissions. Missing or inaccessible private courses return 404. Course summaries include `source`, optional `learningGoal` and `learningOutcomes`; generated modules include a `guide`. Quiz retrieval never returns correct answers or explanations. Quiz submission accepts exactly ten integers from 0 to 3 (an array in served question order, or an object keyed by the exact question IDs).
