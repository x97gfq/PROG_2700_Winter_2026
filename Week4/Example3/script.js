// JavaScript literal array of student objects
const students = [
    { name: "Charlie", score: 85 },
    { name: "Alice", score: 92 },
    { name: "Bob", score: 78 },
    { name: "Diana", score: 95 },
    { name: "Eve", score: 88 }
];

console.log("=== Original Array ===");
console.log(students);
document.getElementById('original').textContent = JSON.stringify(students, null, 2);

// Sort alphabetically by name
const sortedByName = [...students].sort(function (a, b) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
});

console.log("\n=== Sorted Alphabetically ===");
console.log(sortedByName);
document.getElementById('sortedAlpha').textContent = JSON.stringify(sortedByName, null, 2);

// Sort by score (descending - highest first)
const sortedByScore = [...students].sort(function (a, b) {
    return b.score - a.score;
});

console.log("\n=== Sorted by Score (Descending) ===");
console.log(sortedByScore);
document.getElementById('sortedScore').textContent = JSON.stringify(sortedByScore, null, 2);
