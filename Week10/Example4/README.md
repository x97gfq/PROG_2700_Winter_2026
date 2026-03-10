# Example 4 — Lodash + Day.js

## What This Demonstrates

Using two small, focused utility libraries to transform and display data:

- **Lodash** for working with arrays and objects
- **Day.js** for parsing, formatting, and comparing dates

Topics covered:

| Tool | Functions used | Real-world use |
|------|---------------|----------------|
| Lodash | `_.orderBy` | Sorting a product listing, leaderboard, or table by multiple columns |
| Lodash | `_.groupBy` | Organizing transactions by month, products by category, employees by department |
| Lodash | `_.meanBy`, `_.minBy`, `_.maxBy` | Analytics dashboards, calculating averages and extremes |
| Day.js | `.format()` | Displaying dates in invoice headers, booking confirmations, admin tables |
| Day.js | `.fromNow()` | Social media timestamps ("Posted 3 hours ago"), notification lists |
| Day.js | `.diff()` | Showing how long a ticket has been open, trial expiry countdowns |

## How to Run

Open `index.html` in a browser. The output renders immediately from a hardcoded dataset.

---

## Real-World Usages

### `_.orderBy` — E-commerce Product Listing

Users expect to sort by price, name, rating, and "newest first". Lodash makes multi-field sorts trivial:

```js
// "Sort by: Price low to high, then alphabetically within the same price"
const sorted = _.orderBy(products, ['price', 'name'], ['asc', 'asc']);

// "Newest arrivals first, break ties by highest rating"
const newest = _.orderBy(products, ['addedAt', 'rating'], ['desc', 'desc']);
```

Compared to writing this with native `.sort()`:
```js
// Native sort — error-prone and hard to read with multiple fields
products.sort((a, b) =>
    a.price !== b.price
        ? a.price - b.price
        : a.name.localeCompare(b.name)
);
```

### `_.groupBy` — Grouping Transactions by Month

Every bank app, expense tracker, or accounting dashboard groups data like this:

```js
// Group a year's worth of transactions by month
const byMonth = _.groupBy(transactions, t =>
    dayjs(t.date).format('YYYY-MM')
);
// → { '2026-01': [...], '2026-02': [...], '2026-03': [...] }

Object.entries(byMonth).forEach(([month, txns]) => {
    const total = _.sumBy(txns, 'amount');
    renderMonthSection(month, txns, total);
});
```

Used in: Mint, Wave Accounting, QuickBooks, any financial dashboard.

### `_.groupBy` — Kanban Board Columns

A Trello/Jira-style board groups cards by status:

```js
const columns = _.groupBy(tasks, 'status');
// → { 'Todo': [...], 'In Progress': [...], 'Done': [...] }

Object.entries(columns).forEach(([status, tasks]) => {
    renderColumn(status, tasks);
});
```

### `_.meanBy`, `_.maxBy` — Analytics Dashboard

Any admin panel or analytics screen needs aggregate stats:

```js
// E-commerce order analytics
const avgOrderValue   = _.meanBy(orders, 'total');
const largestOrder    = _.maxBy(orders, 'total');
const mostActiveUser  = _.maxBy(users, 'orderCount');
const slowestShipment = _.maxBy(orders, o => dayjs(o.deliveredAt).diff(dayjs(o.placedAt), 'day'));
```

Used in: Shopify analytics, Google Analytics dashboards, any SaaS metrics page.

---

## Lodash

Lodash is a utility library with over 200 functions for manipulating arrays, objects, strings, and numbers. It emphasises **immutability** — functions return new arrays/objects rather than modifying the originals.

### Key functions used

```js
// Sort by multiple fields with direction control
_.orderBy(arr, ['priority', 'createdAt'], ['asc', 'desc'])

// Group an array into an object by a property value
_.groupBy(arr, 'category')
// → { 'Dev': [...], 'Design': [...] }

// Aggregate functions
_.meanBy(arr, 'salary')           // average
_.minBy(arr, item => item.score)  // item with lowest computed value
_.maxBy(arr, 'points')            // item with highest 'points'
```

**CDN:**
```html
<script src="https://cdn.jsdelivr.net/npm/lodash/lodash.min.js"></script>
```

---

## Day.js

Day.js is a tiny (2 kB) date library with an API similar to the popular Moment.js. It is immutable — every operation returns a new Day.js object.

### Real-world usages

```js
// Booking confirmation — absolute, formal date
dayjs(booking.date).format('dddd, MMMM D, YYYY')  // "Friday, March 6, 2026"

// Invoice — short date
dayjs(invoice.issuedAt).format('MMM D, YYYY')      // "Mar 6, 2026"

// Social media / notification feed — relative time
dayjs(post.createdAt).fromNow()                    // "3 hours ago"

// Trial expiry countdown
const daysLeft = dayjs(user.trialEndsAt).diff(dayjs(), 'day');
// → "Your trial expires in 7 days"

// Overdue detection
const isOverdue = dayjs(task.dueDate).isBefore(dayjs());
```

### Key usage

```js
dayjs('2026-01-15').format('MMM D, YYYY')  // "Jan 15, 2026"
dayjs('2026-01-15').fromNow()              // "2 months ago"  (needs relativeTime plugin)
dayjs().diff(dayjs('2026-01-01'), 'day')   // number of days since Jan 1
dayjs('2026-01-15').valueOf()              // Unix timestamp in ms (useful for _.minBy)
dayjs().add(30, 'day').format('MMM D')     // 30 days from now
```

### relativeTime plugin

`.fromNow()` is not available by default — you must load the plugin:

```html
<script src="https://cdn.jsdelivr.net/npm/dayjs/dayjs.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dayjs/plugin/relativeTime.js"></script>
<script>
    dayjs.extend(dayjs_plugin_relativeTime);
</script>
```

---

## References

- [Lodash documentation](https://lodash.com/docs/) — searchable API reference
- [Lodash — `_.groupBy`](https://lodash.com/docs/#groupBy)
- [Lodash — `_.orderBy`](https://lodash.com/docs/#orderBy)
- [Lodash — `_.sumBy`](https://lodash.com/docs/#sumBy) / [`_.chunk`](https://lodash.com/docs/#chunk) / [`_.debounce`](https://lodash.com/docs/#debounce) — other commonly-used functions
- [Day.js documentation](https://day.js.org/en/)
- [Day.js — Format tokens](https://day.js.org/docs/en/display/format)
- [Day.js — relativeTime plugin](https://day.js.org/docs/en/plugin/relative-time)
- [Day.js vs Moment.js](https://day.js.org/docs/en/installation/why-dayjs) — why Day.js is preferred today
