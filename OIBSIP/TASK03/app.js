let serialNumber = 1; // Initialize serial number

function addTask() {
    const taskTitleInput = document.getElementById('taskTitle');
    const taskDescriptionInput = document.getElementById('taskDescription');

    const taskTitle = taskTitleInput.value.trim();
    const taskDescription = taskDescriptionInput.value.trim();

    if (taskTitle === '') {
        alert('Title is compulsory');
        return;
    }

    const taskContainer = document.getElementById('tasksContainer');
    const taskDetailsAside = document.getElementById('taskDetails');

    const taskElement = document.createElement('div');
    taskElement.classList.add('task');

    taskElement.innerHTML = `
        <div class="task-details" onclick="showTaskDetails('${taskTitle}', '${taskDescription}')">
            <div class="task-serial">${serialNumber}</div>
            <div class="task-title">${taskTitle}</div>
            <div class="task-description">${taskDescription}</div>
        </div>
        <button class="delete-button" onclick="deleteTask(this)">Delete</button>
    `;

    taskContainer.appendChild(taskElement);

    // Increment serial number for the next task
    serialNumber++;

    // Clear input fields
    taskTitleInput.value = '';
    taskDescriptionInput.value = '';
}
function deleteTask(button) {
    const taskContainer = document.getElementById('tasksContainer');
    const taskDetailsAside = document.getElementById('taskDetails');
    const taskElement = button.parentElement;

    taskContainer.removeChild(taskElement);

    // Reset serial numbers after deleting a task
    resetSerialNumbers();

    taskDetailsAside.innerHTML = '';
}

function resetSerialNumbers() {
    // Reset serial number to 1
    serialNumber = 1;

    // Update serial numbers for existing tasks
    const taskContainer = document.getElementById('tasksContainer');
    const taskElements = taskContainer.getElementsByClassName('task');

    for (const taskElement of taskElements) {
        const serialElement = taskElement.querySelector('.task-serial');
        if (serialElement) {
            serialElement.textContent = serialNumber++;
        }
    }
}

