const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
let count = 0;
function check(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (['node_modules', '.git', '.work'].includes(entry.name)) continue;
        const file = path.join(dir, entry.name);
        if (entry.isDirectory()) check(file);
        else if (entry.name.endsWith('.js')) { execFileSync(process.execPath, ['--check', file]); count++; }
    }
}
check(path.join(__dirname, '..'));
check(path.join(__dirname, '../../SkillForge-Frontend/js'));
console.log(`Syntax checks passed for ${count} JavaScript files.`);
