const output = document.getElementById('output');
const errorInfo = document.getElementById('errorInfo');
const solution = document.getElementById('solution');

// Debugging examples
document.getElementById('trailingCommaBtn').addEventListener('click', () => showError(
    'Trailing Comma',
    'const data = { name: "Pikachu", type: "Electric", };\nJSON.parse(\'{"name":"Pikachu","type":"Electric",}\');\n❌ SyntaxError: Unexpected token }',
    'Remove the trailing comma:\n{ "name": "Pikachu", "type": "Electric" }\n\n✅ Use JSONLint.com to validate JSON syntax'
));

document.getElementById('singleQuoteBtn').addEventListener('click', () => showError(
    'Single Quotes',
    'const json = \'{"name": \'Pikachu\'}\';\n❌ SyntaxError: Unexpected token P',
    'JSON requires double quotes:\n{"name": "Pikachu"}\n\n✅ Always use double quotes for JSON strings and keys'
));

document.getElementById('missingAwaitBtn').addEventListener('click', () => showError(
    'Missing await',
    'async function getData() {\n  const response = fetch(url); // Missing await!\n  const data = response.json(); // Also missing await!\n}\n❌ response is a Promise, not the actual data',
    'Add await before async operations:\nasync function getData() {\n  const response = await fetch(url);\n  const data = await response.json();\n}\n\n✅ Check DevTools console for Promise objects'
));

document.getElementById('wrongEndpointBtn').addEventListener('click', () => showError(
    'Wrong API Endpoint',
    'fetch("https://pokeapi.co/pokemon/pikachu")\n❌ 404 Not Found\n(Missing /api/v2/)',
    'Check API documentation for correct endpoint:\nfetch("https://pokeapi.co/api/v2/pokemon/pikachu")\n\n✅ Use DevTools Network tab to see the exact URL called'
));

function showError(title, error, fix) {
    output.classList.remove('hidden');
    errorInfo.innerHTML = `<strong>${title}</strong><pre>${error}</pre>`;
    solution.innerHTML = `<pre>${fix}</pre>`;
}
