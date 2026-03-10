# Week 10 — Slide Deck Outline
# Advanced Vanilla JS & Small Libraries

> **Format:** Two sessions, ~75 min each.
> Copy each slide's title + bullets into PowerPoint / Google Slides.
> Speaker notes are indented under each slide.

---

## SESSION 1 — ES6+, Promises / Async-Await, Axios

---

### SLIDE 1 — Title

**Advanced Vanilla JS & Small Libraries**
PROG 2700 — Week 10

> This is the last vanilla JS week before React. Everything we cover today
> you will use again on Day 1 of React — same syntax, same patterns, same libraries.

---

### SLIDE 2 — Agenda (Session 1)

- ES6+ Modern Syntax refresh
- Promises (the foundation)
- Async / Await (the modern way)
- Axios (HTTP, the easy way)
- Activity 1 & 2

---

### SLIDE 3 — Why ES6+?

> "ES6 was the biggest update to JavaScript since its creation."

- Released: 2015 (ES2015) — annual updates ever since
- All modern browsers support it; no transpiler needed in class
- React and every modern framework are written in ES6+
- Writing ES5-style code in 2026 will get flagged in any code review

> In the real world: when you land a dev job, your first tasks will likely include
> updating legacy ES5 code exactly like Activity 1. Updating codebases to modern syntax
> is one of the most common junior dev responsibilities at companies with older JS.

---

### SLIDE 4 — const & let

```js
const PI = 3.14;        // cannot be reassigned
let   count = 0;        // block-scoped, can change
count++;

// var (old) leaks out of blocks — let does NOT
for (let i = 0; i < 3; i++) { /* ... */ }
// console.log(i);  // ReferenceError with let
```

- Prefer `const` for everything; drop to `let` only when you need to reassign
- Never use `var`

> In the real world: every React hook uses const.
>   const [count, setCount] = useState(0);
>   const API_BASE = 'https://api.stripe.com/v1';   // never changes
>   const chartConfig = { responsive: true };        // set once, passed around
> Ask: what happens if you try to reassign a const?

---

### SLIDE 5 — Template Literals

```js
const name = 'Alice';
const age  = 28;

// Old
"Hello, " + name + ". You are " + age + " years old."

// New
`Hello, ${name}. You are ${age} years old.`

// Expressions work too
`In 10 years she will be ${age + 10}.`

// Multi-line (great for HTML strings)
const card = `
  <div class="card">
    <h3>${name}</h3>
  </div>
`;
```

> In the real world: used constantly for building API URLs and messages.
>   const url = `https://api.github.com/users/${username}/repos?per_page=${limit}`;
>   const msg = `Your order #${orderId} has shipped. Arrives: ${deliveryDate}.`;
>   const err = `Failed to load user ${userId}: HTTP ${status} ${statusText}`;

---

### SLIDE 6 — Destructuring

```js
// Object destructuring
const user = { name: 'Bob', role: 'admin', city: 'Halifax' };
const { name, role } = user;

// Rename while destructuring
const { name: userName } = user;

// Default value
const { country = 'Canada' } = user;

// Array destructuring
const [lat, lng] = [44.65, -63.57];

// In function parameters
function greet({ name, role = 'user' }) {
    return `Hello ${name} (${role})`;
}
```

> In the real world: React props are always destructured in the function signature.
>   function ProductCard({ name, price, imageUrl, inStock = true }) { ... }
>
> React useState returns a destructured array every single time:
>   const [isLoading, setIsLoading] = useState(false);
>   const [error,     setError    ] = useState(null);
>
> Unpacking an API response:
>   const { data: { user, orders } } = await axios.get('/dashboard');

---

### SLIDE 7 — Spread & Rest

```js
// SPREAD — expand into
const merged = { ...defaults, ...overrides };   // later keys win
const all    = [...arr1, ...arr2];

// Remove a key (object rest)
const { password, ...safeUser } = user;

// REST — collect into
function sum(...numbers) {
    return numbers.reduce((acc, n) => acc + n, 0);
}
sum(1, 2, 3, 4, 5);  // 15
```

> In the real world: React state MUST NOT be mutated directly.
> Spread creates the new object React needs to detect the change:
>   // Update just the email field without losing anything else:
>   setUser(prev => ({ ...prev, email: newEmail }));
>
>   // Add an item to a cart array:
>   setCart(prev => [...prev, newItem]);
>
>   // Remove an item from a cart:
>   setCart(prev => prev.filter(item => item.id !== removeId));

---

### SLIDE 8 — Optional Chaining & Nullish Coalescing

```js
const company = { name: 'Acme', address: null };

// Optional chaining ?.
// Returns undefined instead of throwing
const street = company?.address?.street;   // undefined (not an error)

// Nullish coalescing ??
// Falls back ONLY on null / undefined (not 0, "", false)
const label = street ?? 'No address on file';

// Compare:
0 ?? 'default'    // → 0        (0 is not null/undefined)
0 || 'default'    // → "default" (0 is falsy — often a bug)
```

> In the real world — the ?? vs || bug hits constantly with prices and ratings:
>   product.price ?? 'N/A'   // → 0  (correct: $0 = free plan)
>   product.price || 'N/A'   // → 'N/A'  (bug: hides free plans)
>
> Optional chaining for deeply nested API responses (Spotify, Twitter, GitHub):
>   const art = track?.album?.images?.[0]?.url ?? '/default-cover.png';
>   const city = user?.location?.city ?? 'Location not set';

---

### SLIDE 9 — Arrow Functions & Array Methods

```js
const scores = [72, 85, 91, 60, 88, 45, 95];

// filter  → keep items that pass the test
const passing = scores.filter(s => s >= 70);

// map  → transform each item
const doubled = passing.map(s => s * 2);

// reduce  → fold array into one value
const total = scores.reduce((sum, s) => sum + s, 0);

// Chaining
const top = scores
    .filter(s => s >= 80)
    .map(s => ({ score: s, grade: s >= 90 ? 'A' : 'B' }))
    .sort((a, b) => b.score - a.score);
```

> In the real world: React renders every list with .map() — you will write this daily.
>   {products.map(p => <ProductCard key={p.id} name={p.name} price={p.price} />)}
>
> E-commerce cart total:
>   const subtotal = cart.reduce((total, item) => total + item.price * item.qty, 0);
>
> Permissions check:
>   const canPublish = user.roles.some(r => r === 'editor' || r === 'admin');

---

### SLIDE 10 — Demo: Example 1

> Open `Week10/Example1/index.html`
> Walk through each section of the dark-console output.
> Highlight: ?? vs ||, spread merge, point-free .map(buildSummary)
> Ask students: which of these patterns have you already seen in code you've read?

---

### SLIDE 11 — What is a Promise?

A **Promise** is an object representing an async operation's eventual result.

```
           resolve(value)
Pending ──────────────────→ Fulfilled
        ╲
         ╲ reject(error)
          ──────────────→ Rejected
```

- Once settled, state **cannot change**
- `async/await` is just **syntax sugar** over Promises
- `Promise.all`, `Promise.race`, etc. work with raw Promises

> In the real world: every network request, database query, and file read returns a Promise.
> The three states map directly to your UI:
>   Pending   → show a loading spinner
>   Fulfilled → render the content
>   Rejected  → show an error message
> This is the core pattern in every data-fetching hook in React.

---

### SLIDE 12 — Creating a Promise

```js
const p = new Promise((resolve, reject) => {
    // executor runs immediately (synchronous)
    setTimeout(() => {
        if (success) resolve('got the data');
        else         reject(new Error('it failed'));
    }, 1000);
});

p
  .then(value  => console.log(value))    // fulfilled
  .catch(error => console.error(error))  // rejected
  .finally(()  => console.log('done'));  // always
```

> In the real world: you mostly consume Promises (from fetch, Axios, etc.),
> not create them manually. But wrapping older browser APIs is a real use case:
>
>   // The Geolocation API uses callbacks — wrap it once, use async/await everywhere
>   function getLocation() {
>       return new Promise((resolve, reject) =>
>           navigator.geolocation.getCurrentPosition(resolve, reject)
>       );
>   }
>   const { coords } = await getLocation();
>
> Used in every food delivery, ride-share, and mapping app.

---

### SLIDE 13 — .then() Chaining

Each `.then()` returns a **new Promise**:

```js
fetch('/api/users')
    .then(res  => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();          // returns a Promise → chain waits
    })
    .then(data => render(data))
    .catch(err => showError(err))   // catches ANY error above
    .finally(() => hideSpinner());
```

- Return a value → next `.then()` gets it
- Return a Promise → chain waits for it
- Throw → jumps to nearest `.catch()`

> In the real world — login flows are classic .then() chains:
>   authService.login(email, password)
>       .then(token   => fetchUserProfile(token))
>       .then(profile => redirect(profile.role === 'admin' ? '/admin' : '/home'))
>       .catch(err    => showLoginError(err.message))
>       .finally(()   => setIsLoading(false));

---

### SLIDE 14 — Promise.all()

```js
// All three fire simultaneously
Promise.all([
    fetch('/api/user/1').then(r  => r.json()),
    fetch('/api/posts').then(r   => r.json()),
    fetch('/api/todos').then(r   => r.json()),
])
.then(([user, posts, todos]) => {
    // all three succeeded
})
.catch(err => {
    // ANY single rejection reaches here immediately (fail-fast)
});
```

| Method | Behaviour | When to use |
|--------|-----------|-------------|
| `Promise.all()` | Fail-fast on any rejection | All results required — can't render without them |
| `Promise.allSettled()` | Waits for all; reports each outcome | Some results optional — show what you can |
| `Promise.race()` | First to settle wins | Request timeouts |

> In the real world: every dashboard page does this.
>   Sequential: 300ms + 300ms + 300ms = ~900ms total wait
>   Promise.all: all fire at once = ~300ms total wait (3x faster)
>   Shopify, Airbnb, and Stripe dashboards all use Promise.all on page load.

---

### SLIDE 15 — Demo: Example 2

> Open `Week10/Example2/index.html`
> Work through each section:
>   1. Resolve vs Reject — watch the state: pending → fulfilled/rejected
>   2. .then() chain — step-by-step output, including a delayed Promise in the middle
>   3. Real fetch — note the two .then() steps (response, then .json())
>   4. Promise.all — watch all three fire simultaneously in the Network tab
>   5. allSettled — one fails, the other two still show their results
>   6. race — Fast (300ms) wins every time; point out the others still ran

---

### SLIDE 16 — async / await

`async/await` is Promise-based code with cleaner syntax:

```js
async function loadUser(id) {
    try {
        const res  = await fetch(`/api/user/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const user = await res.json();
        render(user);

    } catch (err) {
        showError(err);

    } finally {
        hideSpinner();   // always runs
    }
}
```

- `await` can only be used inside an `async` function
- `async` functions always return a Promise
- `await` pauses **the function**, not the browser — other code keeps running

> In the real world: async/await is the default in all modern React code.
>   useEffect(() => {
>       async function load() {
>           const { data } = await axios.get(`/products/${id}`);
>           setProduct(data);
>       }
>       load();
>   }, [id]);
> You will write this pattern constantly starting Week 11.

---

### SLIDE 17 — Axios vs. fetch()

| | `fetch()` | `axios` |
|---|---|---|
| JSON parsing | Manual `.json()` | Automatic `.data` |
| Error on 4xx | No — check `res.ok` | Yes — throws automatically |
| Timeout | Not built-in | `timeout` option |
| Interceptors | No | Yes |
| Bundle size | 0 kB (built-in) | ~14 kB |

```js
// fetch — boilerplate every single time
const res  = await fetch('/api/users');
if (!res.ok) throw new Error(`HTTP ${res.status}`);
const data = await res.json();

// axios — clean
const { data } = await axios.get('/api/users');
```

> In the real world: Axios is the most popular HTTP client in the React ecosystem.
> `npm install axios` is one of the first commands in most React projects.
> The fetch().ok check is a very common source of silent bugs — axios eliminates it.

---

### SLIDE 18 — Axios: Instance & Interceptors

```js
// One shared client for the whole app — set up once, import everywhere
const api = axios.create({
    baseURL: 'https://api.myapp.com/v2',
    timeout: 5000
});

// Attach JWT token to EVERY request automatically
api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

// Global error handling
api.interceptors.response.use(
    res  => res,
    err  => { logErrorToSentry(err); return Promise.reject(err); }
);
```

> In the real world: every production React app has a file like src/api/client.js.
> All features import from it. The auth interceptor means developers never have to
> think about headers again. The response interceptor sends errors to a monitoring
> service (Sentry, Datadog) automatically — nothing falls through silently.

---

### SLIDE 19 — Demo: Example 3

> Open `Week10/Example3/index.html`
> 1. Click "Load Users" — watch the interceptor log update (→ GET, ← 200 OK)
> 2. Open DevTools Network tab — see exactly one request per click
> 3. Click "Concurrent Requests" — two requests appear in Network tab simultaneously
> 4. Click "Trigger 404" — axios throws, the catch block displays a clean error
> Ask: where would you put the auth token interceptor in this code?
> Ask: what would you log to a monitoring service in the response interceptor?

---

### SLIDE 20 — Activity 1 & 2

**Activity 1 — ES6+ Modernization** (`Week10/Activity1/`)
- Rewrite old ES5 weather processor with modern JS syntax
- `const`/`let`, arrow functions, template literals, destructuring, spread, reduce
- Real-world skill: updating legacy codebases (very common junior developer task)

**Activity 2 — Axios + Async/Await** (`Week10/Activity2/`)
- Fetch JavaScript books from the live Open Library API using Axios
- Render as cards — handle missing data safely with `?.` and `??`
- Real-world skill: the fetch → render pattern behind every search feature on the web

---

## SESSION 2 — Lodash, Day.js, Lab 10

---

### SLIDE 21 — Title (Session 2)

**Lodash + Day.js**
PROG 2700 — Week 10, Session 2

---

### SLIDE 22 — Agenda (Session 2)

- Lodash — data transformation utilities
- Day.js — dates done right
- Activity 3
- Lab 10: Hacker News Reader
- What's next: React

---

### SLIDE 23 — Why Utility Libraries?

JavaScript has powerful built-ins (`map`, `filter`, `reduce`)…

…but some things are still verbose or error-prone with just built-ins:
- Sorting by multiple fields at once
- Grouping an array into categories
- Computing averages / min / max from arrays of objects
- Formatting and comparing dates reliably across time zones

**Lodash** and **Day.js** are tiny, well-documented libraries that solve these with one-liners.

> In the real world: Lodash has 40+ million npm downloads per week — it is in
> nearly every enterprise JavaScript codebase. Day.js replaced Moment.js
> (deprecated 2020) and is now the standard lightweight date library.
> Both appear in the majority of React projects.

---

### SLIDE 24 — Lodash: The Basics

```html
<script src="https://cdn.jsdelivr.net/npm/lodash/lodash.min.js"></script>
```

All functions are on the global `_` object.

```js
_.orderBy(arr, ['field'], ['asc'])    // sort by multiple fields
_.groupBy(arr, 'category')            // group into an object by key
_.meanBy(arr, 'salary')               // average of a numeric field
_.maxBy(arr, 'points')                // item with the highest value
_.sumBy(arr, 'quantity')              // sum of a numeric field
_.chunk(arr, 3)                       // split into groups of 3 (pagination)
_.uniqBy(arr, 'id')                   // remove duplicates by a field
_.debounce(fn, 300)                   // limit firing rate (search input)
```

> Key principle: Lodash never mutates the original array/object.
> It always returns a new one — safe to use with React state.

---

### SLIDE 25 — _.orderBy

```js
const sorted = _.orderBy(
    tickets,
    ['priority', 'createdAt'],   // sort by these fields, in order
    ['asc',      'desc']         // direction for each field
);
```

Compared to native `.sort()`:
```js
// Native — verbose and error-prone with multiple fields
arr.sort((a, b) => a.priority - b.priority || b.date.localeCompare(a.date));

// Lodash — readable and correct
_.orderBy(arr, ['priority', 'date'], ['asc', 'desc']);
```

> In the real world:
>   // E-commerce: sort by price ascending, break ties by highest rating
>   const products = _.orderBy(all, ['price', 'rating'], ['asc', 'desc']);
>
>   // Leaderboard: most points first, break ties by most recent activity
>   const board = _.orderBy(users, ['points', 'lastActiveAt'], ['desc', 'desc']);
>
>   // Jira backlog: priority ascending, then newest created
>   const backlog = _.orderBy(tickets, ['priority', 'createdAt'], ['asc', 'desc']);

---

### SLIDE 26 — _.groupBy

```js
const grouped = _.groupBy(jobs, 'category');
// Returns:
// {
//   Dev:    [{ title: 'Frontend Dev', ... }, ...],
//   Design: [{ title: 'UX Designer', ... }, ...],
//   Data:   [{ title: 'Data Analyst', ... }, ...],
// }

Object.entries(grouped).forEach(([category, items]) => {
    renderSection(category, items);
});
```

> In the real world:
>   // Kanban board (Trello / Jira) — columns are just grouped tickets
>   const columns = _.groupBy(tickets, 'status');
>   // → { 'To Do': [...], 'In Progress': [...], 'Done': [...] }
>
>   // Bank statement / expense tracker — group by month
>   const byMonth = _.groupBy(transactions, t => dayjs(t.date).format('YYYY-MM'));
>
>   // E-commerce sidebar — group products by department
>   const departments = _.groupBy(products, 'department');

---

### SLIDE 27 — Aggregate Functions

```js
const jobs = [
    { title: 'Dev',     salary: 95000 },
    { title: 'Design',  salary: 78000 },
    { title: 'Data',    salary: 110000 },
];

_.meanBy(jobs, 'salary')   // 94333.33
_.maxBy(jobs,  'salary')   // { title: 'Data', salary: 110000 }
_.minBy(jobs,  'salary')   // { title: 'Design', salary: 78000 }
_.sumBy(jobs,  'salary')   // 283000
```

> In the real world:
>   // Shopify / Stripe revenue dashboard
>   const avgOrderValue  = _.meanBy(orders, 'total');    // "Avg order: $94.50"
>   const biggestOrder   = _.maxBy(orders,  'total');    // show on leaderboard
>   const totalRevenue   = _.sumBy(orders,  'total');    // "$12,450 this month"
>
>   // Glassdoor / LinkedIn Salary Insights
>   const avgSalary  = _.meanBy(reports, 'amount');
>   const topSalary  = _.maxBy(reports,  'amount');

---

### SLIDE 28 — Day.js: The Basics

Tiny (2 kB) immutable date library. Replaces the widely-used-but-deprecated **Moment.js**.

```html
<script src="https://cdn.jsdelivr.net/npm/dayjs/dayjs.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dayjs/plugin/relativeTime.js"></script>
<script>dayjs.extend(dayjs_plugin_relativeTime);</script>
```

```js
dayjs('2026-01-15')               // parse an ISO date string
dayjs()                           // right now

.format('MMM D, YYYY')           // "Jan 15, 2026"
.format('YYYY-MM-DD HH:mm')      // "2026-01-15 14:30"

.fromNow()                        // "2 months ago"  (needs relativeTime plugin)
.diff(dayjs('2026-01-01'), 'day') // days between two dates
.add(30, 'day').format('MMM D')   // date 30 days from now
```

> In the real world: GitHub, Slack, Discord, Airbnb, and most content apps
> use Day.js (or Moment.js before it was deprecated) for every timestamp shown.

---

### SLIDE 29 — Day.js: Real-World Date Patterns

```js
// GitHub commit history — absolute in tooltip, relative on the page
dayjs(commit.date).format('MMMM D, YYYY h:mm A')  // "February 28, 2026 2:15 PM"
dayjs(commit.date).fromNow()                       // "6 days ago"

// Slack / Discord messages — time only (same day), relative for older
dayjs(msg.ts).format('h:mm A')    // "2:15 PM"
dayjs(msg.ts).fromNow()           // "3 hours ago"

// SaaS trial expiry countdown
const daysLeft = dayjs(user.trialEndsAt).diff(dayjs(), 'day');
`Your trial expires in ${daysLeft} days`

// Overdue detection (Jira, Asana, project management)
const isOverdue = dayjs(task.dueDate).isBefore(dayjs());

// Invoice / booking confirmation date
dayjs().format('MMMM D, YYYY')   // "March 6, 2026"
```

| Format | Output | Where you'll see it |
|--------|--------|---------------------|
| `MMM D, YYYY` | Mar 6, 2026 | Blog posts, invoices, admin tables |
| `YYYY-MM-DD` | 2026-03-06 | API parameters, filenames, database values |
| `h:mm A` | 2:30 PM | Chat messages, calendar events |
| `.fromNow()` | 3 hours ago | Social feeds, notification lists |

---

### SLIDE 30 — Demo: Example 4

> Open `Week10/Example4/index.html`
> Walk through each section:
>   - Table: _.orderBy sorting by priority then createdAt — notice the order
>   - Groups: _.groupBy creating three automatic sections from one array
>   - Stats: _.meanBy, _.minBy, _.maxBy — one line each for what would be 10+ lines native
>   - Dates: .format() showing "Jan 1, 2026", .fromNow() showing "3 months ago", .diff() for days
> Ask: what would you change to group these tickets by priority instead of category?

---

### SLIDE 31 — Reading Library Docs

For any unfamiliar library, find three things in the docs:

1. **Installation** — CDN link or `npm install`
2. **Getting started** example — copy, paste, understand
3. **API reference** — searchable list of all functions

For today's libraries:

| Library | Docs URL |
|---------|----------|
| Axios   | https://axios-http.com/docs/intro |
| Lodash  | https://lodash.com/docs/ |
| Day.js  | https://day.js.org/en/ |

> In the real world: you will use libraries you have never seen before —
> often within the first week at a new job. The skill is reading unfamiliar
> docs quickly and finding the one function you need.
>
> Practice right now: look up _.debounce, _.chunk, and Day.js .isBefore().
> Using only the docs, figure out what they do and how to use them.

---

### SLIDE 32 — Activity 3

**Activity 3 — Lodash + Day.js Pipeline** (`Week10/Activity3/`)

Dataset: 10 job postings with category, salary, postedAt

- **TODO 1:** `_.groupBy(jobs, 'category')` — organise into sections
- **TODO 2:** `_.orderBy(items, ['postedAt'], ['desc'])` — newest first within each group
- **TODO 3:** `dayjs(job.postedAt).format(...)` and `.fromNow()` — two date styles
- **Bonus:** Stats bar — `_.meanBy`, `_.maxBy`

> Real-world equivalent: LinkedIn, Indeed, and Glassdoor render job listings
> with exactly this structure — grouped by department, sorted by date,
> with "Posted 3 days ago" timestamps.

---

### SLIDE 33 — Lab 10: Hacker News Reader

**API:** `https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=30`
No API key required. Provided by the HN Algolia search API.

```json
{
  "hits": [
    {
      "title": "A new way to build UIs",
      "url": "https://example.com",
      "author": "pg",
      "points": 342,
      "num_comments": 87,
      "created_at": "2026-03-05T14:22:00Z"
    }
  ]
}
```

> What you're building is a simplified version of real apps:
>   - Hacker News — sorted by points, relative timestamps
>   - Reddit — sorted by upvotes, "Posted 3 hours ago"
>   - Product Hunt — daily launches ranked by votes
> All three use this exact pattern: fetch → sort → display with timestamps.

---

### SLIDE 34 — Lab 10: Your Steps

1. **Fetch** with Axios — `response.data.hits` is the stories array
2. **Render cards** — title link (`url ?? '#'`), author, points, `dayjs(...).fromNow()`
3. **Sort + Stats** — `_.orderBy` by points, `_.meanBy`, `_.maxBy`, `_.sumBy`
4. **(Bonus) Top 10 toggle** — filter from the cached array, don't re-fetch

> The `allStories` cache variable in the starter is the same concept as React's
> useState — keep the full data in memory, transform it for display,
> don't hit the API again just because the view changed.

---

### SLIDE 35 — What's Next: React

Everything you learned this week comes back in React:

| This week | In React |
|-----------|----------|
| `const` / arrow functions | Everywhere — components, hooks, event handlers |
| Destructuring | Props: `function Card({ title, body }) { ... }` |
| Spread | State: `setState(prev => ({ ...prev, count: prev.count + 1 }))` |
| `?.` and `??` | Safe access to props and API data that might be missing |
| Promises + `async/await` | Data fetching in `useEffect`, form submissions |
| `Promise.all()` | Loading multiple resources in a single `useEffect` |
| Axios | `npm install axios` — same instance + interceptors pattern |
| `.map()` | Rendering lists: `{items.map(item => <Item key={item.id} {...item} />)}` |
| Lodash | Data transforms in components and custom hooks |
| Day.js | Formatted timestamps in any content or social feature |

> Spring break → React starts Week 11.
> Every single one of these patterns appears in the React course.

---

### SLIDE 36 — Summary

**Session 1 covered:**
- ES6+: `const`/`let`, template literals, destructuring, spread/rest, optional chaining, `??`, arrow functions, array methods
- Promises: `.then()`, `.catch()`, `.finally()`, `.all()`, `.allSettled()`, `.race()`
- Axios: `axios.create()`, request/response interceptors, concurrent requests

**Session 2 covered:**
- Lodash: `_.orderBy`, `_.groupBy`, `_.meanBy`, `_.maxBy`, `_.sumBy`
- Day.js: `.format()`, `.fromNow()`, `.diff()`, `.add()`, `.isBefore()`
- Reading third-party library documentation

**Real-world takeaway:**
Axios + async/await + Lodash + Day.js appear together in the vast majority of
React codebases you will encounter professionally. You have used all of them today.

---

*End of Week 10*
