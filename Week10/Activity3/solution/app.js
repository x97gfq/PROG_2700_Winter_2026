// Enable Day.js relativeTime plugin
dayjs.extend(dayjs_plugin_relativeTime);

const root = document.getElementById('root');

const badgeClass = { Dev: 'badge-dev', Design: 'badge-design', Data: 'badge-data' };

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

// TODO 1 SOLUTION: _.groupBy returns { Dev: [...], Design: [...], Data: [...] }
const grouped = _.groupBy(jobs, 'category');

// TODO 4 SOLUTION: Stats bar using _.meanBy and _.maxBy
const avgSalary = _.meanBy(jobs, 'salary');
const topJob    = _.maxBy(jobs, 'salary');

root.innerHTML += `
    <div class="stats">
        <div class="stat">
            <div class="num">${jobs.length}</div>
            <div class="lbl">Total Postings</div>
        </div>
        <div class="stat">
            <div class="num">$${Math.round(avgSalary).toLocaleString()}</div>
            <div class="lbl">Average Salary</div>
        </div>
        <div class="stat">
            <div class="num">$${topJob.salary.toLocaleString()}</div>
            <div class="lbl">Top Salary<br><em>${topJob.title}</em></div>
        </div>
        <div class="stat">
            <div class="num">${Object.keys(grouped).length}</div>
            <div class="lbl">Categories</div>
        </div>
    </div>
`;

// TODO 2 + 3 SOLUTION: Sort each group and format dates
let html = '';
Object.entries(grouped).forEach(([category, items]) => {
    // TODO 2 SOLUTION: sort each group newest first
    const sorted = _.orderBy(items, ['postedAt'], ['desc']);

    html += `<h2><span class="badge ${badgeClass[category]}">${category}</span> — ${sorted.length} jobs</h2>`;

    html += sorted.map(job => `
        <div class="job">
            <div class="job-left">
                <h3>${job.title}</h3>
                <p>${job.company}</p>
            </div>
            <div class="job-right">
                <div class="salary">$${job.salary.toLocaleString()}</div>
                <!-- TODO 3 SOLUTION: Day.js absolute + relative date -->
                <div>${dayjs(job.postedAt).format('MMM D, YYYY')}</div>
                <div>${dayjs(job.postedAt).fromNow()}</div>
            </div>
        </div>
    `).join('');
});

root.innerHTML += html;
