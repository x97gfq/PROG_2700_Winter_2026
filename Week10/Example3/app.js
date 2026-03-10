const logEl   = document.getElementById('interceptorLog');
const results = document.getElementById('results');

// ─── Axios instance ────────────────────────────────────────────────────────
// axios.create() lets you set shared config so you don't repeat it every call.
// All requests through 'api' will use this baseURL and timeout.
const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 6000
});

// ─── Interceptors ──────────────────────────────────────────────────────────
// Interceptors run automatically before every request / after every response.
// Common uses: logging, attaching auth tokens, showing a global loading spinner.

api.interceptors.request.use(config => {
    addLog(`→ ${config.method.toUpperCase()} ${config.url}`);
    return config;   // must return config (or a modified version)
});

api.interceptors.response.use(
    response => {
        const count = Array.isArray(response.data) ? `${response.data.length} items` : '1 item';
        addLog(`← ${response.status} OK  (${count})`);
        return response;   // must return response
    },
    error => {
        addLog(`✗ ${error.response?.status ?? 'Network error'}: ${error.message}`);
        return Promise.reject(error);   // re-throw so .catch() blocks still work
    }
);

function addLog(msg) {
    if (logEl.textContent.startsWith('Interceptor')) logEl.textContent = '';
    logEl.textContent += msg + '\n';
}

// ─── Load Users ────────────────────────────────────────────────────────────
// Key difference from fetch:
//   axios automatically parses JSON  — no .json() call needed
//   The response object has a .data property containing the parsed body
//   Destructure it directly: const { data: users } = await api.get(...)
document.getElementById('btnUsers').addEventListener('click', async () => {
    results.innerHTML = 'Loading…';
    try {
        const { data: users } = await api.get('/users?_limit=5');

        results.innerHTML = users.map(u => `
            <div class="card">
                <h3>${u.name}</h3>
                <p>Email: ${u.email}</p>
                <p>Website: ${u.website}</p>
                <p>Company: ${u.company.name}</p>
            </div>
        `).join('');
    } catch (err) {
        // Unlike fetch, axios THROWS on 4xx/5xx — no need to check .ok
        results.innerHTML = `<div class="error-box">Error: ${err.message}</div>`;
    }
});

// ─── Concurrent Requests ───────────────────────────────────────────────────
// Promise.all fires both requests at the same time and waits for both.
// Much faster than awaiting them one after another.
document.getElementById('btnConcurrent').addEventListener('click', async () => {
    results.innerHTML = 'Sending two requests simultaneously…';
    try {
        const [userRes, todosRes] = await Promise.all([
            api.get('/users/1'),
            api.get('/todos?userId=1&_limit=4')
        ]);

        const user  = userRes.data;
        const todos = todosRes.data;

        results.innerHTML = `
            <div class="row">
                <div class="card">
                    <h3>${user.name}</h3>
                    <p>${user.email}</p>
                    <p>${user.company.name}</p>
                </div>
                <div class="card">
                    <h3>Their Todos</h3>
                    ${todos.map(t => `<p>${t.completed ? '&#x2705;' : '&#x2610;'} ${t.title}</p>`).join('')}
                </div>
            </div>
        `;
    } catch (err) {
        results.innerHTML = `<div class="error-box">Error: ${err.message}</div>`;
    }
});

// ─── Trigger 404 ───────────────────────────────────────────────────────────
document.getElementById('btnFail').addEventListener('click', async () => {
    results.innerHTML = 'Requesting a resource that does not exist…';
    try {
        await api.get('/this-endpoint-does-not-exist');
    } catch (err) {
        results.innerHTML = `
            <div class="error-box">
                <strong>Caught by try/catch:</strong><br>
                Message: ${err.message}<br>
                Status: ${err.response?.status ?? 'No response (network error)'}
            </div>
        `;
    }
});
