// Enable Day.js relativeTime plugin — adds .fromNow(), .to(), etc.
dayjs.extend(dayjs_plugin_relativeTime);

const root = document.getElementById('root');

// ─── Dataset ──────────────────────────────────────────────────────────────────
const tickets = [
    { id: 1, title: 'Redesign homepage',          category: 'Design', priority: 2, createdAt: '2025-11-01' },
    { id: 2, title: 'Fix login bug',              category: 'Dev',    priority: 1, createdAt: '2026-01-15' },
    { id: 3, title: 'Build REST endpoint',        category: 'Dev',    priority: 2, createdAt: '2026-02-20' },
    { id: 4, title: 'Create icon set',            category: 'Design', priority: 3, createdAt: '2026-02-28' },
    { id: 5, title: 'Train classification model', category: 'Data',   priority: 1, createdAt: '2026-01-05' },
    { id: 6, title: 'Refactor auth module',       category: 'Dev',    priority: 3, createdAt: '2025-12-10' },
    { id: 7, title: 'Dashboard analytics',        category: 'Data',   priority: 2, createdAt: '2026-03-01' },
    { id: 8, title: 'Write design system',        category: 'Design', priority: 1, createdAt: '2025-10-20' },
    { id: 9, title: 'Set up CI pipeline',         category: 'Dev',    priority: 1, createdAt: '2026-02-10' },
];

const badgeClass = { Design: 'badge-design', Dev: 'badge-dev', Data: 'badge-data' };

// ─── 1. _.orderBy — sort by multiple fields ───────────────────────────────────
// First arg: collection
// Second arg: array of fields to sort by (in order of precedence)
// Third arg: 'asc' or 'desc' for each field
const sorted = _.orderBy(tickets, ['priority', 'createdAt'], ['asc', 'desc']);

root.innerHTML += `
    <h2>Sorted by Priority then Date &mdash; <code>_.orderBy</code></h2>
    <table>
        <tr>
            <th>#</th><th>Title</th><th>Category</th>
            <th>Priority</th><th>Created</th><th>Age</th>
        </tr>
        ${sorted.map(t => `
            <tr>
                <td>${t.id}</td>
                <td>${t.title}</td>
                <td><span class="badge ${badgeClass[t.category]}">${t.category}</span></td>
                <td>${t.priority}</td>
                <td>${dayjs(t.createdAt).format('MMM D, YYYY')}</td>
                <td>${dayjs(t.createdAt).fromNow()}</td>
            </tr>
        `).join('')}
    </table>
`;

// ─── 2. _.groupBy — group by a property ──────────────────────────────────────
// Returns an object: { 'Design': [...], 'Dev': [...], 'Data': [...] }
const grouped = _.groupBy(tickets, 'category');

let groupHTML = `<h2>Grouped by Category &mdash; <code>_.groupBy</code></h2>`;
Object.entries(grouped).forEach(([category, items]) => {
    groupHTML += `
        <div class="group-head">
            <span class="badge ${badgeClass[category]}">${category}</span>
            &mdash; ${items.length} ticket${items.length > 1 ? 's' : ''}
        </div>
        ${items.map(t => `<div class="group-item">&bull; ${t.title}</div>`).join('')}
    `;
});
root.innerHTML += groupHTML;

// ─── 3. Stats — _.meanBy, _.minBy, _.maxBy, Day.js .diff() ───────────────────
const avgPriority = _.meanBy(tickets, 'priority').toFixed(1);
const oldest      = _.minBy(tickets, t => dayjs(t.createdAt).valueOf());
const newest      = _.maxBy(tickets, t => dayjs(t.createdAt).valueOf());
const daysOpen    = dayjs().diff(dayjs(oldest.createdAt), 'day');

root.innerHTML += `
    <h2>Stats &mdash; <code>_.meanBy</code>, <code>_.minBy</code>, Day.js <code>.diff()</code></h2>
    <div class="stat-row">
        <div class="stat">
            <div class="num">${tickets.length}</div>
            <div class="lbl">Total Tickets</div>
        </div>
        <div class="stat">
            <div class="num">${avgPriority}</div>
            <div class="lbl">Avg Priority</div>
        </div>
        <div class="stat">
            <div class="num">${daysOpen}d</div>
            <div class="lbl">Oldest ticket age<br><em>${oldest.title}</em></div>
        </div>
        <div class="stat">
            <div class="num">${dayjs(newest.createdAt).fromNow()}</div>
            <div class="lbl">Newest ticket created<br><em>${newest.title}</em></div>
        </div>
    </div>
`;
