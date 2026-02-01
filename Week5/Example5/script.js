let lastFailedPokemon = null;

// Button event listeners
document.getElementById('validBtn').addEventListener('click', () => fetchWithErrorHandling('pikachu'));
document.getElementById('invalidBtn').addEventListener('click', () => fetchWithErrorHandling('xyz123'));
document.getElementById('retryBtn').addEventListener('click', retryFailed);

// Advanced fetch with comprehensive error handling
async function fetchWithErrorHandling(pokemonName) {
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    const result = document.getElementById('result');

    loading.classList.remove('hidden');
    error.classList.add('hidden');
    result.classList.add('hidden');

    try {
        // Set timeout for request
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`, {
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        // Handle different HTTP status codes
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`Pokemon "${pokemonName}" not found. Check spelling!`);
            } else if (response.status >= 500) {
                throw new Error('Server error. Try again later.');
            } else {
                throw new Error(`HTTP ${response.status}: Something went wrong.`);
            }
        }

        const data = await response.json();
        loading.classList.add('hidden');
        displaySuccess(data);

    } catch (err) {
        loading.classList.add('hidden');
        error.classList.remove('hidden');

        // Categorize errors for user-friendly messages
        if (err.name === 'AbortError') {
            error.innerHTML = `<strong>Timeout Error</strong><p>Request took too long. Check your connection.</p>`;
        } else if (err.message.includes('fetch')) {
            error.innerHTML = `<strong>Network Error</strong><p>Unable to connect. Check internet connection.</p>`;
        } else {
            error.innerHTML = `<strong>Error</strong><p>${err.message}</p>`;
            lastFailedPokemon = pokemonName; // Save for retry
        }
    }
}

function retryFailed() {
    if (lastFailedPokemon) {
        fetchWithErrorHandling(lastFailedPokemon);
    }
}

function displaySuccess(data) {
    const result = document.getElementById('result');
    result.classList.remove('hidden');
    result.innerHTML = `<img src="${data.sprites.front_default}"><h3>${data.name}</h3><p>✓ Success!</p>`;
}
