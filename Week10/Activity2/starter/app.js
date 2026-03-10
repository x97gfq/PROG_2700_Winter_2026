const API = 'https://openlibrary.org/search.json?q=javascript&fields=title,author_name,first_publish_year,number_of_pages_median&limit=10';

const btnLoad = document.getElementById('btnLoad');
const status  = document.getElementById('status');
const results = document.getElementById('results');

// TODO 1 — Fetch the books using Axios
//
// Steps:
//   a) Set status.textContent to a loading message
//   b) Disable the button (btnLoad.disabled = true)
//   c) Use: const { data } = await axios.get(API)
//      The books are in data.docs  (it's an array)
//   d) console.log(data) first — inspect the structure in DevTools
//   e) Set status.textContent to the number of books found
//   f) Call renderBooks(data.docs)
//   g) Wrap in try/catch — show err.message in results on error
//   h) Re-enable the button in a finally block
//
async function loadBooks() {
    // Your code here
}

// TODO 2 — Render each book as a card
//
// Each book in the docs array has:
//   book.title                  — string
//   book.author_name            — string[] or undefined
//   book.first_publish_year     — number or undefined
//   book.number_of_pages_median — number or undefined
//
// Build an HTML string and set results.innerHTML.
// Tip: use author_name?.join(', ') ?? 'Unknown author'  to handle missing authors
// Tip: use  ?? 'N/A'  for missing year and page count
//
function renderBooks(books) {
    // Your code here
}

btnLoad.addEventListener('click', loadBooks);
