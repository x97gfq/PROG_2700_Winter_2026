// ========================================
// PART 1: DEFINING OBJECTS
// ========================================

// Define a student object using object literal notation
const student1 = {
    name: "Alice Johnson",
    age: 20,
    grade: 95
};

const student2 = {
    name: "Bob Smith",
    age: 19,
    grade: 87
};

const student3 = {
    name: "Charlie Davis",
    age: 21,
    grade: 92
};

const student4 = {
    name: "Diana Lee",
    age: 20,
    grade: 78
};

const student5 = {
    name: "Ethan Brown",
    age: 19,
    grade: 88
};

const student6 = {
    name: "Fiona White",
    age: 22,
    grade: 96
};

// ========================================
// PART 2: STORING OBJECTS IN AN ARRAY
// ========================================

// Create an array of student objects
let students = [student1, student2, student3, student4, student5, student6];

// Keep a reference to the original array for "Show All"
let displayedStudents = students;

// ========================================
// PART 3: UTILITY FUNCTIONS
// ========================================

// Utility function: Determine student status based on grade
function getStatus(grade) {
    if (grade >= 90) {
        return "Honors";
    } else if (grade >= 80) {
        return "Good Standing";
    } else {
        return "Needs Improvement";
    }
}

// Utility function: Render the student table
function renderTable(studentArray) {
    const tableBody = document.getElementById('studentTable');
    tableBody.innerHTML = ''; // Clear existing rows

    // Use forEach to iterate through the array
    studentArray.forEach(function (student) {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.grade}</td>
            <td><span class="badge bg-info">${getStatus(student.grade)}</span></td>
        `;

        tableBody.appendChild(row);
    });
}

// Utility function: Calculate and display statistics
function updateStatistics(studentArray) {
    // Total students
    const total = studentArray.length;
    document.getElementById('totalStudents').textContent = total;

    // Average grade using reduce
    const sum = studentArray.reduce(function (accumulator, student) {
        return accumulator + student.grade;
    }, 0);
    const average = total > 0 ? (sum / total).toFixed(1) : 0;
    document.getElementById('averageGrade').textContent = average;

    // Count honors students using filter
    const honorsStudents = studentArray.filter(function (student) {
        return student.grade >= 90;
    });
    document.getElementById('honorsCount').textContent = honorsStudents.length;
}

// ========================================
// PART 4: ARRAY METHODS - SORTING
// ========================================

// Event handler: Sort by name
const handleSortByName = function () {
    // Use sort method with compare function
    displayedStudents = [...students].sort(function (a, b) {
        return a.name.localeCompare(b.name);
    });
    renderTable(displayedStudents);
    updateStatistics(displayedStudents);
};

// Event handler: Sort by age
const handleSortByAge = function () {
    displayedStudents = [...students].sort(function (a, b) {
        return a.age - b.age;
    });
    renderTable(displayedStudents);
    updateStatistics(displayedStudents);
};

// Event handler: Sort by grade (descending)
const handleSortByGrade = function () {
    displayedStudents = [...students].sort(function (a, b) {
        return b.grade - a.grade; // Descending order
    });
    renderTable(displayedStudents);
    updateStatistics(displayedStudents);
};

// ========================================
// PART 5: ARRAY METHODS - FILTERING
// ========================================

// Event handler: Filter to show only honors students
const handleFilterHonors = function () {
    // Use filter method to get students with grade >= 90
    displayedStudents = students.filter(function (student) {
        return student.grade >= 90;
    });
    renderTable(displayedStudents);
    updateStatistics(displayedStudents);
};

// Event handler: Show all students
const handleShowAll = function () {
    displayedStudents = students;
    renderTable(displayedStudents);
    updateStatistics(displayedStudents);
};

// ========================================
// PART 6: ATTACH EVENT LISTENERS
// ========================================

document.getElementById('sortByName').addEventListener('click', handleSortByName);
document.getElementById('sortByAge').addEventListener('click', handleSortByAge);
document.getElementById('sortByGrade').addEventListener('click', handleSortByGrade);
document.getElementById('filterHonors').addEventListener('click', handleFilterHonors);
document.getElementById('showAll').addEventListener('click', handleShowAll);

// ========================================
// INITIALIZATION
// ========================================

// Initial render
renderTable(displayedStudents);
updateStatistics(displayedStudents);
