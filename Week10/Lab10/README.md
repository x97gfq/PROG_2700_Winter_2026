# Lab 10 — Hacker News Front Page Reader

## Overview

In this lab you will build a live Hacker News reader that pulls the current front-page stories and presents them with sorted rankings and summary stats.

You will use all three libraries introduced this week:

| Tool       | Role | Real-world equivalent |
|------------|------|-----------------------|
| **Axios**  | Fetch the data from the HN Algolia API | Any production app's API client |
| **Day.js** | Format story timestamps as relative time | GitHub, Slack, Twitter timestamps |
| **Lodash** | Sort stories and compute stats | Analytics dashboards, leaderboards |

## What You're Building

This is essentially a simplified version of real apps you use every day:

- **Hacker News itself** — the real site does exactly this: fetch stories, sort by points, show timestamps
- **Reddit** — fetch posts, sort by upvotes or "new", show "Posted 4 hours ago"
- **Product Hunt** — daily product launches sorted by votes
- **Dev.to / Hashnode** — article feeds sorted by reactions, with relative timestamps
- **GitHub Explore** — trending repos sorted by stars, updated "2 days ago"

The API, sorting, and timestamp formatting logic you write here is structurally identical to what powers those sites.

---

## The API

```
https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=30
```

No API key required. Provided by [HN Algolia](https://hn.algolia.com/api) — a full-text search API built on top of Hacker News data.

The response looks like this:

```json
{
  "hits": [
    {
      "title": "A new way to build UIs",
      "url": "https://example.com/article",
      "author": "pg",
      "points": 342,
      "num_comments": 87,
      "created_at": "2026-03-05T14:22:00Z"
    }
  ]
}
```

> Note: `hits` (not `data`) is the array. Access it as `response.data.hits`.

---

## Step 1 — Fetch the Data

Inside the `loadStories()` function:

1. Call `axios.get(API)` with `await`
2. The stories are at `response.data.hits`
3. `console.log` the result — inspect the structure in DevTools
4. Store the hits in `allStories` (the cache variable at the top)
5. Call `renderStories(allStories)`
6. Wrap everything in `try/catch` — display errors in `#status`

**Real-world context:** This is how a feed loads in any social or content app. The `allStories` cache variable prevents unnecessary re-fetching when the user toggles the "Top 10 only" filter — the same pattern used in React with `useState`.

---

## Step 2 — Render the Stories

In `renderStories(stories)`:

1. Loop over the stories and render each one as a `<div class="story">` card
2. Each card should show:
   - A rank number (index + 1)
   - Title as a link to `story.url` (open in a new tab)
   - Author, points, and comment count
   - Posted time using `dayjs(story.created_at).fromNow()`

```js
<a href="${story.url ?? '#'}" target="_blank" rel="noopener">${story.title}</a>
```

> Some stories have `url: null` (they are text-only posts, like Ask HN). Use `story.url ?? '#'` to handle this — the `??` operator you learned in ES6+.

**Real-world context:** Every content card on the web is built exactly like this. The `target="_blank" rel="noopener"` on external links is a security best practice — `noopener` prevents the opened page from being able to navigate your tab via `window.opener`.

---

## Step 3 — Sort and Stats

In `renderStories(stories)`:

1. **Sort by points** (descending) before rendering:
   ```js
   const sorted = _.orderBy(stories, ['points'], ['desc']);
   ```

2. Add a stats bar in `#statsBar` using Lodash aggregate functions:
   - `stories.length` — total count
   - `Math.round(_.meanBy(stories, 'points'))` — average points
   - `_.maxBy(stories, 'points')` — the top story object
   - `_.sumBy(stories, 'num_comments')` — total comments

**Real-world context:**
- `_.orderBy` is how Reddit, Product Hunt, and HN itself rank content by score
- The stats bar is equivalent to the summary metrics shown on social media dashboards and analytics tools — total impressions, average engagement, top-performing post

---

## Step 4 (Bonus) — Filter Toggle

Add a "Top 10 Only" checkbox that, when checked, shows only the 10 highest-scoring stories.

Use `_.orderBy` and `.slice(0, 10)` to trim the list, then re-render.

**Real-world context:** This is a filter/view toggle — common in every data-heavy app. The key pattern: **don't re-fetch from the API; filter the cached data in memory**. This is exactly how React components work with filtered state.

```js
// Re-render from the cache, not from a new API call
chkTop10.addEventListener('change', () => {
    if (allStories.length > 0) renderStories(allStories);
});
```

---

## Solution

The complete solution is in `solution/`. Work through the steps yourself first!

---

## References

- [HN Algolia API docs](https://hn.algolia.com/api)
- [Axios docs](https://axios-http.com/docs/intro)
- [Day.js — relativeTime](https://day.js.org/docs/en/plugin/relative-time)
- [Lodash — `_.orderBy`](https://lodash.com/docs/#orderBy) / [`_.sumBy`](https://lodash.com/docs/#sumBy) / [`_.meanBy`](https://lodash.com/docs/#meanBy)
- [MDN — `rel="noopener"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/noopener) — why you always add this to `target="_blank"` links
