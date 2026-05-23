let tasks = [];
let completedTasks = [];
let completedTaskCount = 0;

function showTask() {
  if (tasks.length === 0) {
    return "Задачи отсутствуют";
  }

  tasks.forEach((item) => {
    console.log(item.title);
    console.log(item.description);
    console.log(item.isCompleted);
    console.log(item.createdDate);
    console.log(item.completedDate);
  });
}

function setTask(taskTitle, taskDescription) {
  if (taskTitle.length < 1 || taskDescription.length < 1) {
    return "Некорректный ввод задач: слишком короткое имя";
  }

  const newTask = {
    title: taskTitle,
    description: taskDescription,
    isCompleted: false,
    createdDate: new Date(),
    completedDate: null,
  };
  tasks.push(newTask);
}

function completeTask(index) {
  if (typeof index !== "number" || index >= tasks.length || index < 0) {
    return "Некорректный индекс";
  }

  let task = tasks[index];

  if (task.isCompleted === true) {
    return "Задача уже выполнена";
  }

  task.isCompleted = true;
  task.completedDate = new Date();

  const completedTask = tasks.splice(index, 1)[0];
  completedTasks.push(completedTask);
  completedTaskCount++;
}

function deleteTask(index) {
  if (typeof index !== "number" || index >= tasks.length || index < 0) {
    return "Некорректный индекс";
  }

  let task = tasks[index];

  if (task.isCompleted) {
    tasks.splice(index, 1);
    return "Таска удалена";
  }

  if (!task.isCompleted) {
    const answer = confirm("Таска еще не выполнена, удалить?");

    if (answer) {
      tasks.splice(index, 1);
      return "Таска удалена";
    } else {
      return "Удаление отменено";
    }
  }
}

function getTaskDescriptions() {
  return tasks.map((item) => item.description);
}

function getLongTasks() {
  return tasks.filter((item) => item.title.length > 10);
}

function getTasksByDateRange(startDate, endDate, isCompleted = false) {
  const taskList = isCompleted ? completedTasks : tasks;
  const dateField = isCompleted ? "completedDate" : "createdDate";

  return taskList.filter((item) => {
    const taskDate = item[dateField];

    return taskDate >= startDate && taskDate <= endDate;
  });
}

function clearShortTasks() {
  tasks = tasks.filter((item) => item.title.length >= 5);
}

function updateTitle(index, newTitle) {
  tasks[index].title = newTitle;
}

function clearTasks() {
  tasks = [];
}
