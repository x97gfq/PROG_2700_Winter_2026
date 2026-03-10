// ─────────────────────────────────────────────────────────────────────────────
// PROMISES & Promise.all()
//
// A Promise represents a value that may be available now, in the future,
// or never.  It is always in one of three states:
//
//   Pending   — the async operation is still running
//   Fulfilled — it completed successfully (has a value)
//   Rejected  — it failed (has an error/reason)
//
// Once a Promise is settled (fulfilled or rejected) it CANNOT change state.
//
// async/await is just syntax sugar on top of Promises.
// Understanding raw Promises is important because many library APIs return them
// and tools like Promise.all() / allSettled() / race() are essential.
// ─────────────────────────────────────────────────────────────────────────────

// Helper: append a line to a named output panel
function write(id, msg, cls = '') {
    const el = document.getElementById(id);
    if (el.textContent.trim().endsWith('…') || el.textContent.trim() === '') {
        el.textContent = '';
    }
    el.insertAdjacentHTML('beforeend', `<span class="${cls}">${msg}</span>\n`);
}

function clear(id) { document.getElementById(id).textContent = ''; }


// ─── 1. Creating a Promise ────────────────────────────────────────────────────
//
// new Promise((resolve, reject) => { ... })
//
//   The executor function runs immediately and synchronously.
//   Call resolve(value) to fulfil, reject(error) to reject.
//
//   .then(fn)    — runs when the Promise is fulfilled
//   .catch(fn)   — runs when the Promise is rejected
//   .finally(fn) — ALWAYS runs regardless of outcome
//
function makeDelayedPromise(shouldResolve) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve('Data arrived after 1 second');
            } else {
                reject(new Error('Something went wrong after 1 second'));
            }
        }, 1000);
    });
}

function demoResolve() {
    clear('out1');
    write('out1', 'Status: pending…', 'dim');

    makeDelayedPromise(true)
        .then(value => write('out1', `Status: fulfilled — "${value}"`, 'ok'))
        .catch(err  => write('out1', `Status: rejected — ${err.message}`, 'err'));
}

function demoReject() {
    clear('out1');
    write('out1', 'Status: pending…', 'dim');

    makeDelayedPromise(false)
        .then(value => write('out1', `Status: fulfilled — "${value}"`, 'ok'))
        .catch(err  => write('out1', `Status: rejected — ${err.message}`, 'err'));
}

function demoFinally() {
    clear('out1');
    write('out1', 'Status: pending…', 'dim');

    makeDelayedPromise(true)
        .then(value => write('out1', `Fulfilled: "${value}"`, 'ok'))
        .catch(err  => write('out1', `Rejected: ${err.message}`, 'err'))
        .finally(() => write('out1', 'finally() runs regardless of outcome', 'dim'));
        //           ^ note: .finally() receives NO arguments (no value, no error)
}


// ─── 2. .then() Chaining ──────────────────────────────────────────────────────
//
// Each .then() returns a NEW Promise whose resolved value is whatever
// you return from the callback.  This lets you chain transformations
// without nesting ("callback hell").
//
// If you return a Promise from a .then(), the chain waits for it to settle.
// If you throw inside a .then(), execution jumps to the nearest .catch().
//
function demoChain() {
    clear('out2');

    Promise.resolve(5)                      // create a Promise already resolved with 5
        .then(n => {
            write('out2', `Step 1: received ${n}`, 'dim');
            return n * 2;                   // return a plain value → next then gets 10
        })
        .then(n => {
            write('out2', `Step 2: doubled to ${n}`, 'dim');
            // Return another Promise — chain waits for it
            return new Promise(resolve => setTimeout(() => resolve(n + 3), 600));
        })
        .then(n => {
            write('out2', `Step 3: (after delay) added 3 = ${n}`, 'ok');
        })
        .catch(err => write('out2', `Error caught anywhere in chain: ${err.message}`, 'err'));
        // A single .catch() at the end handles errors from ANY step above
}


// ─── 3. Real fetch() with .then() ─────────────────────────────────────────────
//
// fetch() returns a Promise<Response>.
// We chain two .then() calls:
//   First:  check res.ok, then call res.json() (which also returns a Promise)
//   Second: use the parsed data
//
// IMPORTANT: fetch() does NOT reject on 4xx/5xx status codes.
//            It only rejects on a network failure (e.g. offline).
//            We must check res.ok and throw manually for HTTP errors.
//
function demoFetch() {
    clear('out3');
    document.getElementById('cards3').innerHTML = '';
    write('out3', 'Fetching…', 'dim');

    fetch('https://jsonplaceholder.typicode.com/users?_limit=4')
        .then(res => {
            write('out3', `Response: HTTP ${res.status}  ok=${res.ok}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            return res.json();              // returns Promise<data> — chain waits
        })
        .then(users => {
            write('out3', `Parsed ${users.length} users`, 'ok');
            document.getElementById('cards3').innerHTML = users.map(u => `
                <div class="card">
                    <h3>${u.name}</h3>
                    <p>${u.email} &mdash; ${u.company.name}</p>
                </div>
            `).join('');
        })
        .catch(err  => write('out3', `Error: ${err.message}`, 'err'))
        .finally(() => write('out3', '--- done ---', 'dim'));
}


// ─── 4. Promise.all() ─────────────────────────────────────────────────────────
//
// Promise.all([p1, p2, p3])
//   - Fires ALL promises simultaneously (in parallel, not sequentially)
//   - Waits until EVERY promise has fulfilled
//   - Resolves with an array of values in the same order as the input
//   - FAIL-FAST: rejects immediately if ANY single promise rejects
//
// Use when: you need all results and cannot proceed if any one fails.
//
function demoAll() {
    clear('out4');
    document.getElementById('cards4').innerHTML = '';
    write('out4', 'Firing 3 requests simultaneously…', 'dim');

    const t = Date.now();

    Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users/1').then(r => r.json()),
        fetch('https://jsonplaceholder.typicode.com/posts?userId=1&_limit=3').then(r => r.json()),
        fetch('https://jsonplaceholder.typicode.com/todos?userId=1&_limit=3').then(r => r.json()),
    ])
        .then(([user, posts, todos]) => {
            write('out4', `All 3 resolved in ${Date.now() - t}ms`, 'ok');
            document.getElementById('cards4').innerHTML = `
                <div class="card"><h3>${user.name}</h3><p>${user.email}</p></div>
                <div class="card">
                    <h3>Posts (${posts.length})</h3>
                    ${posts.map(p => `<p>&bull; ${p.title}</p>`).join('')}
                </div>
                <div class="card">
                    <h3>Todos (${todos.length})</h3>
                    ${todos.map(t => `<p>${t.completed ? '&#x2705;' : '&#x2610;'} ${t.title}</p>`).join('')}
                </div>
            `;
        })
        .catch(err => write('out4', `Promise.all rejected: ${err.message}`, 'err'));
}

// FAIL-FAST demo: one bad URL causes the whole batch to reject
function demoAllFail() {
    clear('out4');
    document.getElementById('cards4').innerHTML = '';
    write('out4', 'One of three requests is bad — watch the fail-fast behaviour…', 'dim');

    Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users/1').then(r => r.json()),
        fetch('https://jsonplaceholder.typicode.com/posts/99999').then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status} on posts`);
            return r.json();
        }),
        fetch('https://jsonplaceholder.typicode.com/todos/1').then(r => r.json()),
    ])
        .then(results => write('out4', `Resolved: ${results.length}`, 'ok'))
        .catch(err    => write('out4', `Promise.all REJECTED (fail-fast): ${err.message}`, 'err'));
}

// ─── Promise.allSettled() ─────────────────────────────────────────────────────
//
// Promise.allSettled([p1, p2, p3])
//   - Waits for EVERY promise — never short-circuits on failure
//   - Resolves with an array of result objects:
//       { status: 'fulfilled', value: ... }
//       { status: 'rejected',  reason: ... }
//
// Use when: you want as many results as possible even if some fail.
//
function demoAllSettled() {
    clear('out4');
    document.getElementById('cards4').innerHTML = '';
    write('out4', 'allSettled — waits for all, never rejects itself…', 'dim');

    Promise.allSettled([
        fetch('https://jsonplaceholder.typicode.com/users/1').then(r => r.json()),
        fetch('https://jsonplaceholder.typicode.com/posts/99999').then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        }),
        fetch('https://jsonplaceholder.typicode.com/todos/1').then(r => r.json()),
    ])
        .then(results => {
            results.forEach((r, i) => {
                if (r.status === 'fulfilled') {
                    write('out4', `[${i}] fulfilled: ${JSON.stringify(r.value).slice(0, 60)}…`, 'ok');
                } else {
                    write('out4', `[${i}] rejected:  ${r.reason.message}`, 'err');
                }
            });
        });
}


// ─── 5. Promise.race() ────────────────────────────────────────────────────────
//
// Promise.race([p1, p2, p3])
//   - Resolves or rejects with the FIRST promise to settle (win the race)
//   - The other promises still run, their results are just ignored
//
// Common use: implementing a timeout
//   Promise.race([realRequest, timeoutPromise])
//   → if the request is slower than the timeout, the timeout wins and rejects
//
function demoRace() {
    clear('out5');

    function delay(ms, label) {
        return new Promise(resolve => setTimeout(() => resolve(label), ms));
    }

    write('out5', 'Three promises: 800ms, 300ms, 600ms — first to finish wins…', 'dim');

    Promise.race([
        delay(800, 'Slow   (800ms)'),
        delay(300, 'Fast   (300ms)'),
        delay(600, 'Medium (600ms)'),
    ]).then(winner => {
        write('out5', `Winner: ${winner}`, 'ok');
        write('out5', '(the other two still resolved, but are ignored)', 'dim');
    });
}
