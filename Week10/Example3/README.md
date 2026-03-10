# Example 3 — Axios

## What This Demonstrates

Using **Axios** as a replacement for the native `fetch()` API. Axios offers a cleaner interface, automatic JSON parsing, built-in error throwing on bad status codes, and a powerful interceptor system.

Topics covered:

| Feature | Description | Real-world use |
|---------|-------------|----------------|
| `axios.create()` | Create a reusable instance with shared config | A single shared API client file used across the whole app |
| Automatic JSON | No `.json()` call needed — Axios parses it for you | Cleaner data-fetching code in every component |
| Error throwing | Axios throws on 4xx/5xx — no need to check `res.ok` | Reliable error handling without extra boilerplate |
| Interceptors | Functions that run before every request / after every response | Auth tokens, global spinners, logging, retry logic |
| `Promise.all()` | Fire multiple Axios requests concurrently | Loading multiple resources for a page simultaneously |
| Response destructuring | `const { data } = await axios.get(url)` | Immediate access to parsed response body |

## How to Run

Open `index.html` in a browser. Click each button and watch the interceptor log panel at the top of the page.

---

## Real-World Usages

### `axios.create()` — A Shared API Client

In a real app you create one Axios instance and import it everywhere. This keeps your base URL and default headers in one place:

```js
// src/api/client.js — created once, imported everywhere
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,  // 'https://api.myapp.com/v2'
    timeout: 8000,
    headers: { 'Content-Type': 'application/json' }
});

export default api;

// In any component:
import api from './api/client';
const { data } = await api.get('/products');    // no need to repeat the base URL
const { data } = await api.post('/cart', item); // correct headers applied automatically
```

### Interceptors — Attaching Auth Tokens

Every protected API endpoint requires a JWT token. Rather than adding it to every single request by hand, an interceptor does it automatically:

```js
// Add the token to EVERY outgoing request automatically
api.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
```

Used in: every app with user login — Slack, GitHub, any SaaS product.

### Interceptors — Global Loading Spinner

Show a loading indicator the moment any request starts, and hide it when all requests are done:

```js
let activeRequests = 0;

api.interceptors.request.use(config => {
    activeRequests++;
    document.getElementById('spinner').style.display = 'block';
    return config;
});

api.interceptors.response.use(
    response => {
        if (--activeRequests === 0) hideSpinner();
        return response;
    },
    error => {
        if (--activeRequests === 0) hideSpinner();
        return Promise.reject(error);
    }
);
```

### Interceptors — Token Refresh (Advanced)

When a 401 Unauthorized response is returned, automatically fetch a new token and retry the original request:

```js
api.interceptors.response.use(
    response => response,
    async error => {
        if (error.response?.status === 401 && !error.config._retry) {
            error.config._retry = true;
            const newToken = await refreshAuthToken();
            api.defaults.headers.Authorization = `Bearer ${newToken}`;
            return api(error.config);   // retry the original request
        }
        return Promise.reject(error);
    }
);
```

Used in: any app with short-lived access tokens (OAuth, JWTs).

### Concurrent Requests — Page Load

When multiple pieces of a page are independent, fire all requests at once:

```js
// Shopify-style product page: load product details, reviews, and inventory in parallel
const [product, reviews, inventory] = await Promise.all([
    api.get(`/products/${id}`).then(r => r.data),
    api.get(`/products/${id}/reviews`).then(r => r.data),
    api.get(`/products/${id}/inventory`).then(r => r.data),
]);

renderProductPage(product, reviews, inventory);
```

### Axios vs. fetch()

| | `fetch()` | `axios` |
|---|---|---|
| JSON parsing | Manual: `await res.json()` | Automatic: `.data` |
| Error on 4xx/5xx | No — must check `res.ok` | Yes — throws automatically |
| Request timeout | Not built-in | `timeout` option |
| Interceptors | No | Yes |
| Bundle size | Zero (built-in) | ~14 kB minified |

```js
// fetch — two awaits, manual ok check, every time
const res  = await fetch('/api/users');
if (!res.ok) throw new Error(`HTTP ${res.status}`);
const data = await res.json();

// axios — one await, automatic error + JSON
const { data } = await axios.get('/api/users');
```

---

## CDN

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

---

## References

- [Axios documentation](https://axios-http.com/docs/intro)
- [Axios — Request config](https://axios-http.com/docs/req_config)
- [Axios — Interceptors](https://axios-http.com/docs/interceptors)
- [MDN — fetch()](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) — for comparison
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) — the free fake REST API used in this example
