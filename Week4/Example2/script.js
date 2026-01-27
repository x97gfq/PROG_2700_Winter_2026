// ============================================
// JavaScript Literal Array of Student Objects
// ============================================

const students = [
    {
        id: 1,
        name: "Emma Johnson",
        program: "Computer Programming",
        year: 2,
        gpa: 3.8,
        email: "emma.johnson@example.com"
    },
    {
        id: 2,
        name: "Liam Smith",
        program: "Web Development",
        year: 1,
        gpa: 3.5,
        email: "liam.smith@example.com"
    },
    {
        id: 3,
        name: "Olivia Brown",
        program: "Software Engineering",
        year: 3,
        gpa: 3.9,
        email: "olivia.brown@example.com"
    },
    {
        id: 4,
        name: "Noah Davis",
        program: "Computer Programming",
        year: 2,
        gpa: 3.6,
        email: "noah.davis@example.com"
    },
    {
        id: 5,
        name: "Ava Wilson",
        program: "Web Development",
        year: 1,
        gpa: 3.7,
        email: "ava.wilson@example.com"
    },
    {
        id: 6,
        name: "Ethan Martinez",
        program: "Software Engineering",
        year: 3,
        gpa: 4.0,
        email: "ethan.martinez@example.com"
    }
];

// ============================================
// Using forEach() to generate Bootstrap cards
// ============================================

// Get the container element
const cardContainer = document.getElementById('studentCards');

// Use forEach to iterate through each student and create a card
students.forEach(function (student) {
    // Create the card HTML for each student (simplified for classroom)
    const cardHTML = `
        <div class="col-md-6 col-lg-4">
            <div class="card student-card h-100">
                <div class="card-header bg-primary text-white">
                    <h5>${student.name}</h5>
                </div>
                <div class="card-body">
                    <p><strong>Program:</strong> ${student.program}</p>
                    <p><strong>Year:</strong> ${student.year}</p>
                    <p><strong>GPA:</strong> ${student.gpa}</p>
                </div>
            </div>
        </div>
    `;

    // Add the card to the container
    cardContainer.innerHTML += cardHTML;
});
