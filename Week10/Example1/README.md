# Example 1 — ES6+ Features

## What This Demonstrates

A visual, browser-rendered showcase of modern JavaScript syntax. Each section logs its output to the page so you can see the results immediately without opening DevTools.

Topics covered:

| Feature | What it does | Where you'll see it in the real world |
|---------|-------------|---------------------------------------|
| `const` / `let` | Block-scoped variables | Every React component, every module file |
| Template literals | Embedded expressions and multi-line strings | Building API URLs, dynamic HTML, notification messages |
| Destructuring | Unpack values from objects and arrays | React props, API responses, `useState` return values |
| Spread (`...`) | Expand or merge arrays/objects | Updating React state without mutation, merging configs |
| Rest (`...args`) | Collect remaining arguments into an array | Utility functions, event wrappers |
| Optional chaining (`?.`) | Access nested properties without throwing | Reading deeply nested API data (GitHub, Twitter, Stripe) |
| Nullish coalescing (`??`) | Fall back only on `null`/`undefined` | Default values for missing API fields, 0-safe fallbacks |
| Arrow functions | Shorter function syntax, especially as callbacks | React event handlers, `.map()` / `.filter()` expressions |
| Array methods | `filter`, `map`, `reduce`, `find`, `some`, `every` | Rendering lists in React, filtering/sorting/aggregating data |

## How to Run

Open `index.html` directly in a browser (no server needed). All output renders on the page.

---

## Real-World Usages

### `const` / `let`
```js
// Every React hook declares its variables with const
const [cartItems, setCartItems] = useState([]);
const API_BASE = 'https://api.stripe.com/v1';   // URL never changes

// A Chart.js config object — set once, never reassigned
const chartConfig = { responsive: true, animation: { duration: 300 } };
```

### Template Literals
```js
// Building API URLs dynamically (GitHub, Spotify, any REST API)
const url = `https://api.github.com/users/${username}/repos?per_page=${limit}&page=${page}`;

// Constructing notification messages
const msg = `Your order #${orderId} has shipped. Estimated delivery: ${deliveryDate}.`;

// Building HTML cards from data arrays — this is exactly what React's JSX compiles to
container.innerHTML = products
    .map(p => `<div class="card"><h3>${p.name}</h3><p>$${p.price}</p></div>`)
    .join('');
```

### Destructuring
```js
// React — props are always destructured in the function signature
function ProductCard({ name, price, imageUrl, inStock = true }) {
    return `<img src="${imageUrl}"> ${name} — $${price}`;
}

// Unpacking an Axios response (you'll do this in Example 3)
const { data: { user, orders, recommendations } } = await axios.get('/api/dashboard');

// React useState — always returns [value, setter] as an array of exactly two
const [isLoading, setIsLoading] = useState(false);
const [error,     setError    ] = useState(null);
```

### Spread Operator
```js
// React: state MUST never be mutated directly — always spread to copy first
// Updating one field of a user object:
setUser(prev => ({ ...prev, email: newEmail }));

// Adding an item to a cart:
setCart(prev => [...prev, newItem]);

// Merging a default config with environment-specific overrides:
const config = { ...defaultConfig, ...productionOverrides };

// Passing shared props to multiple child components (very common in React):
const sharedProps = { className: 'btn', disabled: isLoading };
// <SubmitButton {...sharedProps} onClick={handleSubmit} />
// <CancelButton {...sharedProps} onClick={handleCancel} />
```

### Optional Chaining
```js
// GitHub API — not every repo has a license, description, or homepage
const license  = repo?.license?.name ?? 'No license';
const homepage = repo?.homepage ?? repo?.html_url;

// Spotify API — track objects sometimes have no album art
const albumArt = track?.album?.images?.[0]?.url ?? '/default-cover.png';

// User profiles — not every user completes every field
const city = user?.location?.city ?? 'Location not set';

// Safely reading event target data before the DOM has loaded
const value = document.querySelector('#search')?.value ?? '';
```

### Nullish Coalescing (`??`)
```js
// Stripe API — price CAN be 0 (a free/trial plan). Using || here is a bug.
const displayPrice = product.price ?? 'Price not set';
// product.price = 0  →  ?? gives "0"     (correct: free plan)
// product.price = 0  →  || gives "Price not set"  (BUG: hides free plans)

// User display name: try fullName, then username, then email address
const displayName = user.fullName ?? user.username ?? user.email;

// API pagination — if the server sends 0 results, that's valid, not "missing"
const totalCount = response.meta?.total ?? 0;
```

### Arrow Functions & Array Methods
```js
// React: rendering a list of products (you will write this every single day)
const html = products
    .filter(p => p.inStock && p.price <= budget)
    .sort((a, b) => a.price - b.price)
    .map(p => `<li>${p.name} — $${p.price}</li>`)
    .join('');

// E-commerce: calculate cart total
const subtotal = cart.reduce((total, item) => total + item.price * item.qty, 0);

// Permissions: check if the current user has a required role
const canPublish = currentUser.roles.some(r => r === 'editor' || r === 'admin');

// Form validation: check all required fields are filled
const allFilled = requiredFields.every(field => formData[field]?.trim().length > 0);
```

---

## Key Concepts to Notice

**`??` vs `||`** — This is a real production bug that causes incorrect prices, 0-star ratings, and empty usernames to be replaced with fallbacks:
```js
// Product rating: 0 stars is a valid rating — it should NOT fall back
product.rating ?? 'No rating'   // → 0         (correct)
product.rating || 'No rating'   // → "No rating"  (bug — hides zero-star products)
```

**Spread for immutable updates** — React and Redux require this. Never mutate state directly:
```js
// Wrong (mutation):  state.count = state.count + 1;
// Right (new object): { ...state, count: state.count + 1 }
```

**Point-free style** — When a function's signature exactly matches what `.map()` / `.filter()` passes, skip the wrapper:
```js
products.map(formatPrice)       // instead of: .map(p => formatPrice(p))
users.filter(isActiveAccount)   // instead of: .filter(u => isActiveAccount(u))
```

---

## References

- [MDN — Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [MDN — Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [MDN — Optional chaining (?.)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
- [MDN — Nullish coalescing (??)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)
- [MDN — Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [javascript.info — Modern JavaScript Tutorial](https://javascript.info/) — excellent free resource covering all of these topics
- [javascript.info — Destructuring](https://javascript.info/destructuring-assignment)
- [javascript.info — Optional chaining](https://javascript.info/optional-chaining)
