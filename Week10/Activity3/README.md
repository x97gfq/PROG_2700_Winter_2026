# Activity 3 — Lodash + Day.js: Job Postings Pipeline

## Overview

You have a dataset of job postings. Using **Lodash** and **Day.js**, you will transform and display the data in a structured, readable way.

## Why This Matters in the Real World

The pipeline you build here — **group → sort → format** — is one of the most common data transformation patterns in web development. You will encounter it in:

- **Job boards** — Indeed, LinkedIn, and Glassdoor all group postings by category, sort by recency, and show "Posted 3 days ago"
- **E-commerce** — Products grouped by department, sorted by price or rating
- **Finance dashboards** — Transactions grouped by month, sorted by date, with formatted amounts
- **Project management tools** — Trello/Jira boards group tickets by status (`_.groupBy(tickets, 'status')`), and Jira sorts by priority (`_.orderBy(...)`)
- **Admin panels** — User lists sorted by last active date with Day.js relative times

## Prerequisites

Open `starter/index.html` in your browser. You should see a heading and an empty page — the dataset is there but nothing is rendered yet.

---

## Your Tasks

### TODO 1 — Group by Category (`_.groupBy`)

Use `_.groupBy` to organise the jobs array into an object keyed by category:

```js
const grouped = _.groupBy(jobs, 'category');
// Result: { 'Dev': [...], 'Design': [...], 'Data': [...] }
```

Then loop over the groups with `Object.entries(grouped)` to render each section.

**Real-world equivalent:**
```js
// Grouping a bank statement by month
const byMonth = _.groupBy(transactions, t => dayjs(t.date).format('YYYY-MM'));

// Grouping support tickets by status for a Kanban board
const columns = _.groupBy(tickets, 'status');
// → { 'Open': [...], 'In Progress': [...], 'Resolved': [...] }
```

### TODO 2 — Sort Within Each Group (`_.orderBy`)

Inside each group, sort the jobs by `postedAt` descending (newest first):

```js
const sorted = _.orderBy(items, ['postedAt'], ['desc']);
```

**Real-world equivalent:**
```js
// E-commerce: sort search results by price then rating
const results = _.orderBy(products, ['price', 'rating'], ['asc', 'desc']);

// Admin user list: most recently active first, then alphabetically
const users = _.orderBy(allUsers, ['lastActiveAt', 'name'], ['desc', 'asc']);
```

### TODO 3 — Format Dates with Day.js

For each job, display two date representations:

1. A formatted absolute date using `.format('MMM D, YYYY')` — e.g. *Feb 15, 2026*
2. A relative timestamp using `.fromNow()` — e.g. *3 weeks ago*

```js
dayjs(job.postedAt).format('MMM D, YYYY')
dayjs(job.postedAt).fromNow()
```

> Day.js needs the `relativeTime` plugin for `.fromNow()`. It is already loaded in the HTML.

**Real-world equivalent:**
```js
// GitHub commit list — combines both styles exactly like this
dayjs(commit.date).format('MMM D, YYYY')    // "Feb 28, 2026"  (in the tooltip)
dayjs(commit.date).fromNow()                // "6 days ago"    (shown on the page)

// Slack / Discord — show relative time, absolute on hover
title={dayjs(msg.timestamp).format('dddd, MMMM D, YYYY h:mm A')}
{dayjs(msg.timestamp).fromNow()}
```

### TODO 4 (Bonus) — Stats Bar

Add a summary section at the top using:
- `_.meanBy(jobs, 'salary')` — average salary across all jobs
- `_.maxBy(jobs, 'salary')` — the highest-paying job
- `Object.keys(grouped).length` — number of categories

**Real-world equivalent:**
```js
// Glassdoor salary insights
const avgSalary  = _.meanBy(salaryReports, 'amount');
const topSalary  = _.maxBy(salaryReports, 'amount');
const lowestRole = _.minBy(salaryReports, 'amount');
```

---

## References

- [Lodash documentation](https://lodash.com/docs/)
  - [`_.groupBy`](https://lodash.com/docs/#groupBy)
  - [`_.orderBy`](https://lodash.com/docs/#orderBy)
  - [`_.meanBy`](https://lodash.com/docs/#meanBy) / [`_.maxBy`](https://lodash.com/docs/#maxBy)
- [Day.js documentation](https://day.js.org/docs/en/display/format)
  - [Format tokens](https://day.js.org/docs/en/display/format)
  - [relativeTime plugin](https://day.js.org/docs/en/plugin/relative-time)

## Solution

The complete solution is in `solution/`. Try it yourself first!
