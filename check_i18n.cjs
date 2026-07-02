const fs = require('fs');
const content = fs.readFileSync('lib/i18n.tsx', 'utf8');

const oEnMatch = content.match(/const oEn = ({[\s\S]*?});/);
const oPtMatch = content.match(/const oPt = ({[\s\S]*?});/);

if (!oEnMatch || !oPtMatch) {
    console.log("Could not find oEn or oPt");
    process.exit(1);
}

// Very hacky way to parse them since they are JS objects not JSON
// We can't easily eval because they might use other variables or functions
// But let's try to just check keys via regex
function getKeys(objStr) {
    const keys = new Set();
    const lines = objStr.split('\n');
    lines.forEach(line => {
        const match = line.match(/^\s*"([^"]+)":/);
        if (match) keys.add(match[1]);
    });
    return keys;
}

const enKeys = getKeys(oEnMatch[1]);
const ptKeys = getKeys(oPtMatch[1]);

console.log("Keys in oEn but not in oPt:");
for (let k of enKeys) {
    if (!ptKeys.has(k)) console.log("  " + k);
}

console.log("\nKeys in oPt but not in oEn:");
for (let k of ptKeys) {
    if (!enKeys.has(k)) console.log("  " + k);
}
