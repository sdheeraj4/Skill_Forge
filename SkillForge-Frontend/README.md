# SkillForge Frontend

HTML, CSS and vanilla JavaScript connected to the backend at `http://127.0.0.1:5000/api`.

From `SkillForge-Backend`, run `npm run frontend` and open `http://127.0.0.1:3000`. Run `npm start` in another terminal. See the [root README](../README.md) for database and Gemini setup.

The authenticated sidebar includes Create Course. Generated and curated courses share the existing course details, learning workspace, notes reader, assessment and reporting pages. The notes reader uses server-provided guides for generated modules and `js/notes-data.js` for curated modules. Only theme preferences use localStorage; learning data and authentication remain server-backed.
