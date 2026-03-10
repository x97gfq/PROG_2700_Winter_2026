const API = 'https://openlibrary.org/search.json?q=javascript&fields=title,author_name,first_publish_year,number_of_pages_median&limit=10';

const btnLoad = document.getElementById('btnLoad');
const status  = document.getElementById('status');
const results = document.getElementById('results');

// TODO 1 SOLUTION: Axios fetch with async/await + try/catch/finally
async function loadBooks() {
    status.textContent  = 'Loading books…';
    results.innerHTML   = '';
    btnLoad.disabled    = true;

    try {
        // axios.get() parses JSON automatically — no .json() needed
        // The API response body is at response.data
        const { data } = await axios.get(API);
        const books = data.docs;

        status.textContent = `Found ${books.length} books.`;
        renderBooks(books);

    } catch (err) {
        // axios throws on network errors and 4xx/5xx status codes
        status.textContent = '';
        results.innerHTML  = `<div class="error">Error: ${err.message}</div>`;

    } finally {
        btnLoad.disabled = false;
    }
}

// TODO 2 SOLUTION: Render books with destructuring + optional chaining + ??
function renderBooks(books) {
    results.innerHTML = books.map(({ title, author_name, first_publish_year, number_of_pages_median }) => `
        <div class="book">
            <h3>${title}</h3>
            <p>Authors: ${author_name?.join(', ') ?? 'Unknown author'}</p>
            <p>First published: ${first_publish_year ?? 'N/A'}</p>
            <p>Pages: ${number_of_pages_median ?? 'N/A'}</p>
        </div>
    `).join('');
}

btnLoad.addEventListener('click', loadBooks);
