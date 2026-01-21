// ========================================
// PART 1: DEFINE A CLASS
// ========================================

class Task {
    constructor(id, title, description, priority) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority; // 'high', 'medium', 'low'
    }

    // Method to get priority CSS class
    getPriorityClass() {
        return `priority-${this.priority}`;
    }
}

// ========================================
// PART 2: CREATE OBJECTS FROM THE CLASS
// ========================================

// Instantiate Task objects
const task1 = new Task(1, "Learn JavaScript", "Study variables, functions, and objects", "high");
const task2 = new Task(2, "Build a Website", "Create a portfolio website with HTML/CSS", "medium");
const task3 = new Task(3, "Practice Git", "Learn version control basics", "low");
const task4 = new Task(4, "Debug Code", "Fix bugs in the calculator app", "high");
const task5 = new Task(5, "Read Documentation", "Review JavaScript MDN docs", "low");

// ========================================
// PART 3: STORE OBJECTS IN ARRAYS
// ========================================

// Two arrays to hold tasks
let todoTasks = [task1, task2, task3, task4, task5];
let doneTasks = [];

// ========================================
// PART 4: UTILITY FUNCTIONS
// ========================================

// Utility function: Render tasks in a list
function renderList(listElement, tasksArray) {
    listElement.innerHTML = ''; // Clear existing content

    tasksArray.forEach(function (task) {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.draggable = true;
        taskItem.dataset.taskId = task.id;

        taskItem.innerHTML = `
            <div class="task-title">${task.title}</div>
            <div class="task-description">${task.description}</div>
            <span class="task-priority ${task.getPriorityClass()}">${task.priority.toUpperCase()}</span>
        `;

        // Attach drag event listeners
        taskItem.addEventListener('dragstart', handleDragStart);
        taskItem.addEventListener('dragend', handleDragEnd);

        listElement.appendChild(taskItem);
    });
}

// Utility function: Update counters
function updateCounts() {
    document.getElementById('todoCount').textContent = todoTasks.length;
    document.getElementById('doneCount').textContent = doneTasks.length;
}

// Utility function: Find and remove task from array (FIFO operation)
function removeTaskFromArray(array, taskId) {
    const index = array.findIndex(function (task) {
        return task.id === taskId;
    });

    if (index !== -1) {
        // Remove and return the task using splice
        const removedTask = array.splice(index, 1)[0];
        console.log(`Removed task from array:`, removedTask);
        return removedTask;
    }

    return null;
}

// Utility function: Add task to array (using push - FIFO)
function addTaskToArray(array, task) {
    array.push(task);
    console.log(`Added task to array:`, task);
    console.log(`Array now contains ${array.length} tasks`);
}

// ========================================
// PART 5: DRAG AND DROP EVENT HANDLERS
// ========================================

let draggedElement = null;

// Event handler: Drag start
const handleDragStart = function (event) {
    draggedElement = event.currentTarget;
    draggedElement.classList.add('dragging');
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', draggedElement.innerHTML);
};

// Event handler: Drag end
const handleDragEnd = function (event) {
    draggedElement.classList.remove('dragging');
    draggedElement = null;
};

// Event handler: Drag over (allow drop)
const handleDragOver = function (event) {
    event.preventDefault(); // Necessary to allow drop
    event.dataTransfer.dropEffect = 'move';
    event.currentTarget.classList.add('drag-over');
};

// Event handler: Drag leave
const handleDragLeave = function (event) {
    event.currentTarget.classList.remove('drag-over');
};

// Event handler: Drop
const handleDrop = function (event) {
    event.preventDefault();
    event.currentTarget.classList.remove('drag-over');

    if (draggedElement) {
        const taskId = parseInt(draggedElement.dataset.taskId);
        const targetList = event.currentTarget.dataset.list;

        console.log(`\n=== MOVING TASK ID ${taskId} ===`);
        console.log(`Target list: ${targetList}`);

        let task = null;

        // Determine source and destination arrays
        if (targetList === 'done') {
            // Moving from todoTasks to doneTasks
            task = removeTaskFromArray(todoTasks, taskId);
            if (task) {
                addTaskToArray(doneTasks, task);
            }
        } else if (targetList === 'todo') {
            // Moving from doneTasks to todoTasks
            task = removeTaskFromArray(doneTasks, taskId);
            if (task) {
                addTaskToArray(todoTasks, task);
            }
        }

        // Re-render both lists
        renderList(document.getElementById('todoList'), todoTasks);
        renderList(document.getElementById('doneList'), doneTasks);
        updateCounts();

        console.log(`Todo array:`, todoTasks);
        console.log(`Done array:`, doneTasks);
    }
};

// ========================================
// PART 6: ATTACH DROP ZONE LISTENERS
// ========================================

const dropZones = document.querySelectorAll('.drop-zone');

dropZones.forEach(function (zone) {
    zone.addEventListener('dragover', handleDragOver);
    zone.addEventListener('dragleave', handleDragLeave);
    zone.addEventListener('drop', handleDrop);
});

// ========================================
// INITIALIZATION
// ========================================

// Initial render
const todoList = document.getElementById('todoList');
const doneList = document.getElementById('doneList');

renderList(todoList, todoTasks);
renderList(doneList, doneTasks);
updateCounts();

console.log('Initial state:');
console.log('Todo tasks:', todoTasks);
console.log('Done tasks:', doneTasks);
