# Instructor Notes — React Router

## The Big Idea: "The URL IS State"

The most important mental model shift for students:

> "Before React Router, the URL was just an address. With React Router, it becomes
> part of your application's state. Every component in your app can READ from the URL
> (useParams, useLocation) and WRITE to the URL (useNavigate, Link)."

Draw this on the board:

```
useState  →  values live inside React
useParams →  values live in the URL bar
```

The URL has superpowers that useState doesn't:
- Users can bookmark it
- The back button navigates through it
- You can share it with someone else and they see the same thing

---

## The History API — Brief Background

Students sometimes wonder "how does the URL change without a page reload?"

The browser has a JavaScript API called `window.history`:
```js
window.history.pushState({}, "", "/products/3");
// Changes the URL bar to /products/3 — no reload, no server request
```

React Router wraps this API. When you click a `<Link to="/products/3">`, React Router:
1. Calls `window.history.pushState(...)` to change the URL
2. Tells React to re-render with the new route
3. React renders `<ProductDetail>` because `/products/3` matches that route

The browser doesn't know any of this happened — it just sees the URL change.

---

## The `end` Prop — Explain Carefully

This trips up almost every student:

```jsx
<NavLink to="/" end>Home</NavLink>
<NavLink to="/products">Products</NavLink>
```

Without `end`:
- At `/products`, BOTH "Home" and "Products" would be `.active`
- Because `/` matches as a prefix of `/products`
- React Router v6 does prefix matching by default for NavLink

With `end`:
- "Home" is only active when the path is **exactly** `/`

Show this live by removing `end` and navigating to /products. Then add it back.

---

## `parseInt(id)` — Why This Matters

The single most common student bug:

```jsx
const { id } = useParams();          // "3" — a string
const product = products.find(p => p.id === id);  // p.id is 3 (number) — never matches
```

Fix:
```jsx
const product = products.find(p => p.id === parseInt(id));
```

Or use loose equality:
```jsx
p.id == id   // == coerces types, 3 == "3" is true
```

But teach the explicit `parseInt` — it is clearer about intent and avoids the
`==` vs `===` confusion.

Demo: open the console and type `3 === "3"` (false) vs `3 == "3"` (true).

---

## Nested Routes vs Flat Routes

Students may ask why we don't nest `/products/:id` inside `/products`:

```jsx
// Nested (v6 style) — child renders INSIDE parent
<Route path="/products" element={<Products />}>
  <Route path=":id" element={<ProductDetail />} />
</Route>
```

vs.

```jsx
// Flat (what we use)
<Route path="/products" element={<Products />} />
<Route path="/products/:id" element={<ProductDetail />} />
```

**Nested routes render the child component inside the parent** using an `<Outlet>`.
That means `ProductDetail` would render INSIDE the `Products` layout — useful for
things like a sidebar that persists, but not for our case where detail replaces the list.

Our flat approach is simpler for this level. Introduce nested routes with `<Outlet>` only
if a student asks about persistent layouts.

---

## The Four Navigation Patterns — Be Clear on Which to Use

| Scenario | Use |
|----------|-----|
| Text link in content | `<Link to="...">` |
| Navigation bar item | `<NavLink to="...">` |
| Back button | `useNavigate(-1)` |
| After form submit | `useNavigate("/path")` |

A common student mistake is using `useNavigate` everywhere instead of `<Link>`.
Emphasise: use `<Link>` whenever possible — it's simpler, accessible, and supports
right-click "Open in new tab".

`useNavigate` is for situations where navigation is triggered by logic, not a direct user click.

---

## Common Questions

### "Do I need React Router for every React project?"

No — single-page apps with a simple sign-in/out or wizard flow can get away without a
router. But any app with multiple distinct pages that users might bookmark or share needs one.

### "What about Next.js? Doesn't it have its own router?"

Yes, Next.js has file-based routing built in. The React Router concepts (params, programmatic
navigation, active links) translate almost directly. Learning React Router now makes Next.js routing
feel familiar.

### "What's the difference between `useNavigate` and `window.location.href =`?"

`window.location.href = "/products"` triggers a full page reload — React loses all its state.
`useNavigate("/products")` uses the History API — React updates without a reload.

### "Can I pass data between pages?"

Yes — next class (Lab 1) covers exactly this using `navigate("/path", { state: data })` and
`useLocation()` to receive it. Don't cover this in Lecture 2 to keep scope manageable.

---

## Timing

| Section | Estimated Time |
|---------|---------------|
| The problem: SPAs and URLs | 5 min |
| Client-side vs server-side routing | 5 min |
| Install + BrowserRouter setup | 8 min |
| Routes and Route | 8 min |
| Link and NavLink | 10 min |
| useParams | 10 min |
| useNavigate | 8 min |
| Wildcard route | 3 min |
| Demo walkthrough | 10 min |
| Activity 2 intro + work time | 30 min |
| **Total** | **~97 min** (trim if needed) |

---

## Connection to Industry

React Router is used in the vast majority of production React applications:
- Shopify's admin interface
- Airbnb's web app
- LinkedIn's SPA
- Every React-based CMS and dashboard you'll encounter in a job

The patterns today — `useParams`, `NavLink` with active state, programmatic navigation —
appear verbatim in real codebases. These are the exact APIs that will appear in job interviews.
