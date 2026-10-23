const express = require('express');
const path = require('node:path');
const app = express();
app.use(express.static(path.join(__dirname, '../../SkillForge-Frontend')));
app.listen(3000, '127.0.0.1', () => console.log('SkillForge frontend: http://127.0.0.1:3000'));
