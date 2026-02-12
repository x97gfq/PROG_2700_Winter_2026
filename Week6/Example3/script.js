$(document).ready(function () {
    let tasks = [];
    let taskIdCounter = 1;

    // Initialize jQuery UI components
    initializeUI();

    // Event Handlers
    $("#add-task-btn").on("click", openAddTaskDialog);
    $("#clear-completed-btn").on("click", clearCompletedTasks);
    $("#priority-filter").on("change", filterTasks);

    // Initialize UI Components
    function initializeUI() {
        // Initialize accordion
        $("#task-accordion").accordion({
            collapsible: true,
            active: false,
            heightStyle: "content",
            animate: 300
        });

        // Initialize datepicker
        $("#task-due-date").datepicker({
            dateFormat: "yy-mm-dd",
            minDate: 0,
            showAnim: "slideDown",
            changeMonth: true,
            changeYear: true
        });

        // Initialize progress slider
        $("#task-progress").slider({
            min: 0,
            max: 100,
            value: 0,
            slide: function (event, ui) {
                $("#progress-value").text(ui.value);
            }
        });

        // Initialize add task dialog
        $("#add-task-dialog").dialog({
            autoOpen: false,
            modal: true,
            width: 500,
            buttons: {
                "Add Task": function () {
                    if (validateForm()) {
                        addTask();
                        $(this).dialog("close");
                    }
                },
                "Cancel": function () {
                    $(this).dialog("close");
                }
            },
            open: function () {
                resetForm();
            },
            show: {
                effect: "fade",
                duration: 300
            },
            hide: {
                effect: "fade",
                duration: 300
            }
        });

        // Initialize confirmation dialog
        $("#confirm-dialog").dialog({
            autoOpen: false,
            modal: true,
            buttons: {
                "Delete": function () {
                    const taskId = $(this).data("taskId");
                    deleteTask(taskId);
                    $(this).dialog("close");
                },
                "Cancel": function () {
                    $(this).dialog("close");
                }
            },
            show: {
                effect: "shake",
                duration: 300
            },
            hide: {
                effect: "fade",
                duration: 300
            }
        });

        updateStats();
    }

    // Open add task dialog
    function openAddTaskDialog() {
        $("#add-task-dialog").dialog("open");
    }

    // Validate form
    function validateForm() {
        const title = $("#task-title").val().trim();
        if (!title) {
            alert("Please enter a task title!");
            return false;
        }
        return true;
    }

    // Reset form
    function resetForm() {
        $("#task-form")[0].reset();
        $("#task-progress").slider("value", 0);
        $("#progress-value").text("0");
    }

    // Add new task
    function addTask() {
        const task = {
            id: taskIdCounter++,
            title: $("#task-title").val().trim(),
            description: $("#task-description").val().trim(),
            dueDate: $("#task-due-date").val(),
            priority: $("#task-priority").val(),
            progress: $("#task-progress").slider("value"),
            completed: false
        };

        tasks.push(task);
        renderTask(task);
        updateStats();

        // Hide empty state if visible
        $("#empty-state").fadeOut(300);
    }

    // Render task
    function renderTask(task) {
        const priorityClass = `priority-${task.priority}`;
        const completedClass = task.completed ? "completed" : "";

        const taskHtml = `
            <h3 class="${priorityClass} ${completedClass}" data-task-id="${task.id}">
                <div class="task-header">
                    <div class="task-title">
                        <i class="fas fa-${task.completed ? 'check-circle' : 'circle'}"></i>
                        ${task.title}
                    </div>
                    <div class="task-actions">
                        <button class="btn btn-small btn-success toggle-task" data-task-id="${task.id}">
                            <i class="fas fa-${task.completed ? 'undo' : 'check'}"></i>
                        </button>
                        <button class="btn btn-small btn-danger delete-task" data-task-id="${task.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </h3>
            <div>
                <div class="task-content">
                    ${task.description ? `<div class="task-detail"><strong>Description:</strong> ${task.description}</div>` : ''}
                    ${task.dueDate ? `<div class="task-detail"><strong><i class="fas fa-calendar"></i> Due Date:</strong> ${task.dueDate}</div>` : ''}
                    <div class="task-detail"><strong><i class="fas fa-flag"></i> Priority:</strong> ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</div>
                    <div class="task-detail">
                        <strong><i class="fas fa-tasks"></i> Progress:</strong>
                        <div class="task-progress-bar">
                            <div class="task-progress-fill" style="width: ${task.progress}%">
                                ${task.progress}%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        $("#task-accordion").append(taskHtml).accordion("refresh");

        // Animate new task
        const newTaskHeader = $(`#task-accordion h3[data-task-id="${task.id}"]`);
        newTaskHeader.hide().slideDown(400);

        // Attach event handlers
        attachTaskEventHandlers(task.id);
    }

    // Attach event handlers to task buttons
    function attachTaskEventHandlers(taskId) {
        $(`.toggle-task[data-task-id="${taskId}"]`).on("click", function (e) {
            e.stopPropagation();
            toggleTask(taskId);
        });

        $(`.delete-task[data-task-id="${taskId}"]`).on("click", function (e) {
            e.stopPropagation();
            confirmDelete(taskId);
        });
    }

    // Toggle task completion
    function toggleTask(taskId) {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            const header = $(`#task-accordion h3[data-task-id="${taskId}"]`);

            if (task.completed) {
                header.addClass("completed").find("i").first()
                    .removeClass("fa-circle").addClass("fa-check-circle");
                header.find(".toggle-task i")
                    .removeClass("fa-check").addClass("fa-undo");
            } else {
                header.removeClass("completed").find("i").first()
                    .removeClass("fa-check-circle").addClass("fa-circle");
                header.find(".toggle-task i")
                    .removeClass("fa-undo").addClass("fa-check");
            }

            // Animate the change
            header.effect("highlight", {}, 500);
            updateStats();
        }
    }

    // Confirm delete
    function confirmDelete(taskId) {
        $("#confirm-dialog").data("taskId", taskId).dialog("open");
    }

    // Delete task
    function deleteTask(taskId) {
        const header = $(`#task-accordion h3[data-task-id="${taskId}"]`);
        const content = header.next();

        // Animate removal
        header.slideUp(400, function () {
            content.remove();
            $(this).remove();
            $("#task-accordion").accordion("refresh");

            // Remove from array
            tasks = tasks.filter(t => t.id !== taskId);
            updateStats();

            // Show empty state if no tasks
            if (tasks.length === 0) {
                $("#empty-state").fadeIn(300);
            }
        });
    }

    // Clear completed tasks
    function clearCompletedTasks() {
        const completedTasks = tasks.filter(t => t.completed);

        if (completedTasks.length === 0) {
            alert("No completed tasks to clear!");
            return;
        }

        completedTasks.forEach(task => {
            const header = $(`#task-accordion h3[data-task-id="${task.id}"]`);
            const content = header.next();

            header.fadeOut(400, function () {
                content.remove();
                $(this).remove();
                $("#task-accordion").accordion("refresh");
            });
        });

        tasks = tasks.filter(t => !t.completed);

        setTimeout(() => {
            updateStats();
            if (tasks.length === 0) {
                $("#empty-state").fadeIn(300);
            }
        }, 400);
    }

    // Filter tasks
    function filterTasks() {
        const filter = $("#priority-filter").val();

        $("#task-accordion h3").each(function () {
            const taskId = $(this).data("task-id");
            const task = tasks.find(t => t.id === taskId);
            const content = $(this).next();

            if (filter === "all" || task.priority === filter) {
                $(this).slideDown(300);
                content.show();
            } else {
                $(this).slideUp(300);
                content.hide();
            }
        });
    }

    // Update statistics
    function updateStats() {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const pending = total - completed;

        animateValue("#total-tasks", parseInt($("#total-tasks").text()), total);
        animateValue("#completed-tasks", parseInt($("#completed-tasks").text()), completed);
        animateValue("#pending-tasks", parseInt($("#pending-tasks").text()), pending);
    }

    // Animate number change
    function animateValue(selector, start, end) {
        const duration = 500;
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;

        const timer = setInterval(function () {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            $(selector).text(Math.round(current));
        }, 16);
    }

    console.log("Interactive Task Manager initialized!");
});
