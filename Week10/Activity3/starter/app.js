// Enable Day.js relativeTime plugin
dayjs.extend(dayjs_plugin_relativeTime);

const root = document.getElementById('root');

const badgeClass = { Dev: 'badge-dev', Design: 'badge-design', Data: 'badge-data' };

// ─── Dataset ──────────────────────────────────────────────────────────────────
const jobs = [
    { id: 1,  title: 'Frontend Developer',    company: 'Acme Inc.',       category: 'Dev',    salary: 85000,  postedAt: '2026-02-01' },
    { id: 2,  title: 'UX Designer',           company: 'Beta Studio',     category: 'Design', salary: 78000,  postedAt: '2026-02-15' },
    { id: 3,  title: 'Data Analyst',          company: 'Gamma Analytics', category: 'Data',   salary: 90000,  postedAt: '2026-01-20' },
    { id: 4,  title: 'React Developer',       company: 'Delta Corp',      category: 'Dev',    salary: 95000,  postedAt: '2026-02-25' },
    { id: 5,  title: 'Graphic Designer',      company: 'Epsilon Media',   category: 'Design', salary: 70000,  postedAt: '2026-01-30' },
    { id: 6,  title: 'ML Engineer',           company: 'Zeta AI',         category: 'Data',   salary: 115000, postedAt: '2026-02-18' },
    { id: 7,  title: 'Full Stack Developer',  company: 'Eta Solutions',   category: 'Dev',    salary: 100000, postedAt: '2026-03-01' },
    { id: 8,  title: 'Brand Designer',        company: 'Theta Creative',  category: 'Design', salary: 72000,  postedAt: '2026-02-10' },
    { id: 9,  title: 'Data Engineer',         company: 'Iota Data',       category: 'Data',   salary: 105000, postedAt: '2026-01-10' },
    { id: 10, title: 'Backend Developer',     company: 'Kappa Tech',      category: 'Dev',    salary: 92000,  postedAt: '2026-02-05' },
];

// TODO 1 — Group the jobs by category using _.groupBy
//
// Expected result:
//   { Dev: [...], Design: [...], Data: [...] }
//
// const grouped = ???

// TODO 2 — Inside each group, sort jobs by postedAt descending (newest first)
//
// Use _.orderBy(items, ['postedAt'], ['desc'])
//
// Then render each group as a section with a heading and a list of job cards.
// For each job card, show: title, company, salary (formatted with toLocaleString).
//
// Hint: build the HTML with template literals and set root.innerHTML at the end.

// TODO 3 — Format dates with Day.js
//
// In each job card, show two date values:
//   1. Absolute:  dayjs(job.postedAt).format('MMM D, YYYY')   → "Feb 25, 2026"
//   2. Relative:  dayjs(job.postedAt).fromNow()               → "8 days ago"

// TODO 4 (Bonus) — Stats bar
//
// Above the grouped sections, render a stats bar with:
//   - Total jobs: jobs.length
//   - Average salary: _.meanBy(jobs, 'salary') — format with toLocaleString()
//   - Top salary: _.maxBy(jobs, 'salary').title + salary
//
// Use the provided .stats and .stat CSS classes for layout.
