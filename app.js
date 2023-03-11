// Retrieve the form and task list elements from the HTML
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

// Define an array to store the current tasks
let tasks = [];

// Add an event listener to the form's submit button
taskForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting
  window.navigator.vibrate(500); // Vibrate the device for 500 milliseconds or 0.5 seconds

  // Retrieve the task name and description from the input fields
  const taskName = document.getElementById("task-name").value;
  const taskDesc = document.getElementById("task-desc").value;

  // Create a new task object with the given name and description
  const newTask = { name: taskName, desc: taskDesc };

  // Add the new task to the tasks array
  tasks.push(newTask);

  // Refresh the task list
  refreshTaskList();

  // Clear the input fields
  document.getElementById("task-name").value = "";
  document.getElementById("task-desc").value = "";
});

// Define a function to refresh the task list
function refreshTaskList() {
  // Create a new list item for each task in the tasks array
  const taskItems = tasks.map(function (task) {
    // Create a new list item with the task name and description
    const listItem = document.createElement("li");
    const taskName = document.createElement("strong");
    taskName.textContent = task.name;
    const taskDesc = document.createTextNode(`: ${task.desc}`);
    listItem.appendChild(taskName);
    listItem.appendChild(taskDesc);

    // Add a button to edit the task
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
      // Update the task name and description in the form
      document.getElementById("task-name").value = task.name;
      document.getElementById("task-desc").value = task.desc;

      // Remove the task from the tasks array
      const taskIndex = tasks.indexOf(task);
      if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
      }

      // Refresh the task list
      refreshTaskList();
    });
    listItem.appendChild(editButton);

    // Add a button to delete the task
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      // Remove the task from the tasks array
      const taskIndex = tasks.indexOf(task);
      if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
      }

      // Refresh the task list
      refreshTaskList();
    });
    listItem.appendChild(deleteButton);

    return listItem;
  });

  //   // Clear the current list items
  //   taskList.innerHTML = "";

  // Add the task items to the task list
  taskItems.forEach(function (taskItem) {
    taskList.appendChild(taskItem);
  });
}
