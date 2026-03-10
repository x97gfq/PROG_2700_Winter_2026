# Example 2 — Promises & Promise.all()

## What This Demonstrates

A deep dive into the **Promise** object — the foundation of all async JavaScript. Before `async/await` existed, Promises were the standard way to handle asynchronous code. Understanding them directly is important because `async/await` is just syntax sugar on top of Promises, and many library APIs still return raw Promises.

Topics covered:

| Concept | Description | Real-world use |
|---------|-------------|----------------|
| `new Promise(...)` | Creating a Promise manually | Wrapping older browser APIs (geolocation, IndexedDB, timers) |
| `.then()` / `.catch()` / `.finally()` | Chaining handlers | Login flow, sequential data pipelines |
| Promise states | Pending → Fulfilled or Rejected | Driving loading / error / success UI states |
| `Promise.all()` | Wait for multiple Promises simultaneously | Loading a dashboard page with several independent data sources |
| `Promise.allSettled()` | Wait for all, even if some fail | Loading optional widgets — show what succeeds, skip what fails |
| `Promise.race()` | First to settle wins | Implementing request timeouts |

## How to Run

Open `index.html` directly in a browser. Click each button to see the Promise behaviour demonstrated.

---

## Real-World Usages

### Creating a Promise manually — wrapping older APIs

Most of the time you work with Promises returned by `fetch()` or Axios. But many browser APIs are older and still use callbacks. Wrapping them in a Promise makes them work with `async/await`:

```js
// The browser Geolocation API uses callbacks, not Promises.
// Wrap it once and use it cleanly everywhere:
function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

async function showNearbyRestaurants() {
    try {
        const { coords } = await getCurrentPosition();
        const restaurants = await fetchNearby(coords.latitude, coords.longitude);
        renderMap(restaurants);
    } catch (err) {
        showError('Could not get your location');
    }
}
```

Used in: Google Maps integrations, Uber/Lyft, any location-based app.

### `.then()` Chaining — Login Flow

A real authentication sequence is a classic chained-Promise pipeline. Each step depends on the result of the previous one, so sequential is correct:

```js
// 1. Submit credentials → get a token
// 2. Use the token to fetch the user profile
// 3. Redirect to the right dashboard based on the user's role
authService.login(email, password)
    .then(token    => fetchUserProfile(token))
    .then(profile  => {
        localStorage.setItem('user', JSON.stringify(profile));
        return profile.role === 'admin' ? '/admin' : '/dashboard';
    })
    .then(route    => router.navigate(route))
    .catch(err     => showLoginError(err.message))
    .finally(()    => setIsLoading(false));
```

### `.then()` Chaining — fetch + parse

Every `fetch()` call requires two chained steps. This is the main reason Axios is popular in production — it collapses both into one:

```js
// fetch — two .then() calls every single time
fetch('/api/products')
    .then(res  => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();   // res.json() is ALSO async — returns a Promise
    })
    .then(data => renderProducts(data.items))
    .catch(err => showError(err))
    .finally(() => hideSpinner());
```

### `Promise.all()` — Dashboard Loading

Every app with a dashboard does this. When a page needs user info, recent activity, and notifications, fire all three requests at the same time:

```js
// Sequential — waits 300ms, then 300ms, then 300ms = ~900ms total
const user    = await fetchUser();
const orders  = await fetchRecentOrders();
const alerts  = await fetchNotifications();

// Parallel with Promise.all — all fire at once = ~300ms total
const [user, orders, alerts] = await Promise.all([
    fetchUser(),
    fetchRecentOrders(),
    fetchNotifications(),
]);
renderDashboard(user, orders, alerts);
```

Used by: Shopify admin, Stripe dashboard, Airbnb host panel — any page that loads multiple independent data sources at once.

### `Promise.allSettled()` — Optional Widgets

When some parts of a page are optional (a recommendations widget, a loyalty points badge) and their failure shouldn't crash the whole page, `allSettled` is the right tool:

```js
// E-commerce checkout page — cart is critical, recommendations/loyalty are optional
const results = await Promise.allSettled([
    fetchCart(),              // critical — must succeed for checkout to work
    fetchRecommendations(),   // optional widget — can silently fail
    fetchLoyaltyPoints(),     // optional badge — can silently fail
]);

const [cartResult, recsResult, pointsResult] = results;

// Always render the cart; it failing should show an error
if (cartResult.status === 'fulfilled') renderCart(cartResult.value);
else showCriticalError('Could not load your cart');

// Render optional sections only if they succeeded
if (recsResult.status === 'fulfilled')   renderRecommendations(recsResult.value);
if (pointsResult.status === 'fulfilled') renderLoyaltyBadge(pointsResult.value);
```

### `Promise.race()` — Request Timeout

`fetch()` has no built-in timeout — a slow server will hang forever. `Promise.race()` lets you add one:

```js
function withTimeout(promise, ms = 5000) {
    const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms)
    );
    return Promise.race([promise, timeout]);
}

// If the server doesn't respond within 3 seconds, throw a timeout error
try {
    const data = await withTimeout(axios.get('/api/slow-endpoint'), 3000);
    render(data);
} catch (err) {
    showError(err.message);   // "Timed out after 3000ms"
}
```

Used in: any app that needs to handle slow or unresponsive external services gracefully.

---

## Promise States

A Promise is always in one of three states:

```
Pending  →  Fulfilled (resolved with a value)
         →  Rejected  (rejected with an error)
```

Once settled (fulfilled or rejected), a Promise **cannot change state**. This is what makes loading/error/success UI states reliable — you will always get exactly one outcome per request.

## `.then()` Chaining

Each `.then()` returns a **new Promise**, so you can chain them:

```js
fetch('/api/users')
    .then(res => res.json())          // returns a Promise<data>
    .then(data => render(data))       // returns a Promise<undefined>
    .catch(err => console.error(err)) // catches any error in the chain
    .finally(() => hideSpinner());    // always runs
```

## Promise.all() vs Promise.allSettled()

```js
// Promise.all — rejects immediately if ANY promise rejects (fail-fast)
Promise.all([p1, p2, p3])
    .then(([r1, r2, r3]) => { /* all succeeded */ })
    .catch(err => { /* at least one failed */ });

// Promise.allSettled — waits for ALL, never rejects itself
Promise.allSettled([p1, p2, p3])
    .then(results => {
        results.forEach(r => {
            if (r.status === 'fulfilled') console.log(r.value);
            if (r.status === 'rejected')  console.log(r.reason);
        });
    });
```

---

## References

- [MDN — Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [MDN — Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN — Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
- [MDN — Promise.allSettled()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)
- [javascript.info — Promises](https://javascript.info/promise-basics) — highly recommended walkthrough
- [javascript.info — Promise chaining](https://javascript.info/promise-chaining)
- [javascript.info — Promise.all](https://javascript.info/promise-api)
