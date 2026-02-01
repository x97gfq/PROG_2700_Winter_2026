// Sample JavaScript object (in-memory data)
const person = {
    name: "Alice Johnson",
    age: 25,
    isStudent: true,
    courses: ["JavaScript", "HTML", "CSS"],
    address: {
        city: "Halifax",
        province: "NS"
    }
};

// Display the JavaScript object (with unquoted keys - typical JS style)
document.getElementById('jsObjectDisplay').textContent =
    `const person = {
  name: "Alice Johnson",
  age: 25,
  isStudent: true,
  courses: ["JavaScript", "HTML", "CSS"],
  address: {
    city: "Halifax",
    province: "NS"
  }
};`;

// Convert to JSON string (for storage/transmission)
const jsonString = JSON.stringify(person, null, 2);
document.getElementById('jsonStringDisplay').textContent = jsonString;

// Parse button: JSON string → JavaScript object
document.getElementById('parseBtn').addEventListener('click', () => {
    const output = document.getElementById('output');
    const parsed = JSON.parse(jsonString);
    output.innerHTML = `
<strong>✓ Parsed JSON string to JavaScript object:</strong>
Type: ${typeof parsed}
Name: ${parsed.name}
City: ${parsed.address.city}
First course: ${parsed.courses[0]}
    `;
});

// Stringify button: JavaScript object → JSON string
document.getElementById('stringifyBtn').addEventListener('click', () => {
    const output = document.getElementById('output');
    const jsonStr = JSON.stringify(person);
    output.innerHTML = `
<strong>✓ Stringified object to JSON:</strong>
Type: ${typeof jsonStr}
Length: ${jsonStr.length} characters
Can save to localStorage: Yes!
Ready for API transmission: Yes!

Full JSON string:
${jsonStr}
    `;
});
