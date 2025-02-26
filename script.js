function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const taskList = document.getElementById("taskList");

        const li = document.createElement("li");

        // Create checkbox
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.onclick = function() {
            toggleCompletion(li, checkBox);
        };

        const taskLabel = document.createElement("span");
        taskLabel.textContent = taskText;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function() {
            taskList.removeChild(li);
            saveTasks(); 
        };

        li.appendChild(checkBox);
        li.appendChild(taskLabel);
        li.appendChild(deleteButton);
        taskList.appendChild(li);

        saveTasks();

        taskInput.value = "";
    }
}

function toggleCompletion(li, checkBox) {
    const taskLabel = li.querySelector("span");
    if (checkBox.checked) {
        taskLabel.style.textDecoration = "line-through";  // Strike-through the task
    } else {
        taskLabel.style.textDecoration = "none";  // Remove the strike-through
    }

    saveTasks();  // Save updated task state
}

function saveTasks() {
    const tasks = [];
    const taskList = document.getElementById("taskList");
    const taskItems = taskList.getElementsByTagName("li");

    for (let i = 0; i < taskItems.length; i++) {
        const taskLabel = taskItems[i].querySelector("span");
        const isCompleted = taskItems[i].querySelector("input").checked;
        tasks.push({ text: taskLabel.textContent, completed: isCompleted });
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    if (tasks && tasks.length > 0) {
        const taskList = document.getElementById("taskList");
        tasks.forEach(task => {
            const li = document.createElement("li");

            const checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.checked = task.completed;
            checkBox.onclick = function() {
                toggleCompletion(li, checkBox);
            };

            const taskLabel = document.createElement("span");
            taskLabel.textContent = task.text;
            if (task.completed) {
                taskLabel.style.textDecoration = "line-through";  // Apply strike-through if task is completed
            }

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.onclick = function() {
                taskList.removeChild(li);
                saveTasks(); 
            };

            li.appendChild(checkBox);
            li.appendChild(taskLabel);
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    }
}

window.onload = function() {
    loadTasks();
}

document.getElementById("taskInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
    document.querySelector('footer').classList.toggle('dark-mode');
    document.querySelector('footer p').classList.toggle('dark-mode');
    document.querySelector('button').classList.toggle('dark-mode');
    document.querySelectorAll('li').forEach(function(item) {
        item.classList.toggle('dark-mode');
    });
    
    let buttonText = document.body.classList.contains('dark-mode') ? "🌙 Light Mode" : "🌚 Dark Mode";
    document.getElementById('themeToggle').textContent = buttonText;
}
