// Helpers — render labelled output entries to the page
function log(label, value, comment = '') {
    const el = document.createElement('div');
    el.className = 'entry';
    el.innerHTML = `
        ${comment ? `<div class="comment">// ${comment}</div>` : ''}
        <span class="label">${label}:</span>
        <span class="value">${JSON.stringify(value)}</span>
    `;
    document.getElementById('output').appendChild(el);
}

function section(title) {
    document.getElementById('output').insertAdjacentHTML('beforeend', `<h2>${title}</h2>`);
}

// ─── 1. const & let ───────────────────────────────────────────────────────────
section('1 — const &amp; let');

const PI = 3.14159;
log('PI (const)', PI, 'cannot be reassigned');

let count = 0;
count++;
log('count (let)', count, 'block-scoped; can be reassigned');

// var leaks out of blocks — let does not
for (let i = 0; i < 3; i++) { /* i is gone after this block */ }
// console.log(i);  // ReferenceError with let; would print 3 with var

// ─── 2. Template Literals ─────────────────────────────────────────────────────
section('2 — Template Literals');

const name = 'Alice';
const age = 28;
const bio = `${name} is ${age} years old. In 10 years she will be ${age + 10}.`;
log('expression in template', bio);

const listHTML = `
    <ul>
        <li>${name}</li>
        <li>${age}</li>
    </ul>
`.trim();
log('multiline template (HTML)', listHTML, 'great for building HTML strings');

// ─── 3. Destructuring ─────────────────────────────────────────────────────────
section('3 — Destructuring');

const user = { name: 'Bob', role: 'admin', city: 'Halifax' };
const { name: userName, role, city = 'Unknown' } = user;  // rename + default
log('object destructuring', { userName, role, city });

const coords = [44.65, -63.57, 100];
const [lat, lng] = coords;   // ignore the third element (depth)
log('array destructuring', { lat, lng });

// Destructuring directly in function parameters
function greet({ name, role = 'user' }) {
    return `Hello ${name}, you are a ${role}`;
}
log('param destructuring', greet({ name: 'Carol', role: 'editor' }));
log('param destructuring (default)', greet({ name: 'Dave' }));

// ─── 4. Spread & Rest ─────────────────────────────────────────────────────────
section('4 — Spread &amp; Rest');

const defaults = { theme: 'dark', lang: 'en', debug: false };
const overrides = { lang: 'fr', debug: true };
const config = { ...defaults, ...overrides };    // later keys win
log('spread objects (merge + override)', config);

const first = [1, 2, 3];
const second = [4, 5, 6];
const all = [...first, 0, ...second];
log('spread arrays', all);

const { role: _, ...userWithoutRole } = user;    // remove a key with rest
log('rest in destructuring (remove key)', userWithoutRole);

function sum(...numbers) {
    return numbers.reduce((acc, n) => acc + n, 0);
}
log('rest parameters', sum(1, 2, 3, 4, 5), 'collects all args into an array');

// ─── 5. Optional Chaining & Nullish Coalescing ────────────────────────────────
section('5 — Optional Chaining (?.) &amp; Nullish Coalescing (??)');

const company = {
    name: 'Acme',
    address: null        // exists but is null
};

const street = company?.address?.street ?? 'No street on file';
log('optional chaining + ??', street, 'does not throw even though address is null');

const ceo = company?.employees?.ceo?.name ?? 'No CEO found';
log('deep optional chaining', ceo, 'does not throw; employees is undefined');

// ?? only falls back on null/undefined — NOT other falsy values
const zero = 0;
log('?? vs || with 0', {
    '0 ?? "default"': zero ?? 'default',   // 0  (zero is not null/undefined)
    '0 || "default"': zero || 'default'    // "default"  (zero is falsy)
}, '?? is safer when 0 or "" are valid values');

// ─── 6. Arrow Functions & Array Methods ───────────────────────────────────────
section('6 — Arrow Functions &amp; Array Methods');

const scores = [72, 85, 91, 60, 88, 45, 95];

const passing = scores.filter(s => s >= 70);
const grades = passing.map(s => s >= 90 ? 'A' : s >= 80 ? 'B' : 'C');
const average = scores.reduce((sum, s) => sum + s, 0) / scores.length;

log('filter (>= 70)', passing);
log('map (to letter grades)', grades);
log('reduce (average)', Math.round(average));

log('find (first >= 90)', scores.find(s => s >= 90));
log('findIndex (first >= 90)', scores.findIndex(s => s >= 90));
log('some (any < 50)', scores.some(s => s < 50));
log('every (all > 40)', scores.every(s => s > 40));

// Chaining for a data pipeline
const topStudents = scores
    .filter(s => s >= 80)
    .map(s => ({ score: s, grade: s >= 90 ? 'A' : 'B' }))
    .sort((a, b) => b.score - a.score);

log('chained pipeline (filter > map > sort)', topStudents);
