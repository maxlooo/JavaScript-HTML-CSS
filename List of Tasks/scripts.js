class TasksToDoClass {
    constructor() {
      this.tasks = JSON.parse(localStorage.getItem('ALLTASKS'));
      this.listTasks();
      this.loadTasks();
      this.addKeyPressListener();
    }

    // listTasks populates the tasks array
    listTasks() {
      // alert("listTasks this.tasks = " + this.tasks);
      if(!this.tasks) {
        this.tasks = [
          {task: 'Go Lunch', isComplete: false},
          {task: 'Go Print', isComplete: false},
          {task: 'Go Library', isComplete: false},
          {task: 'Go Dinner', isComplete: false},
          {task: 'Go Exercise', isComplete: false},
        ];
      }
    }

    // refreshTasksList clears localStorage, repopulates tasks array 
    // and reload tasks list
    refreshTasksList() {
      localStorage.clear();
      this.tasks = null;
      this.listTasks();
      this.loadTasks();
    }
    // Add Task upon pressing Enter key
    addKeyPressListener() {
      document.getElementById('addATask').addEventListener("keypress", event => {
        if(event.keyCode === 13) {
          this.addTask(event.target.value);
          event.target.value = "";
        }
      });
    }

    // Add Task upon clicking Add task button
    addTaskClickListener() {
      let target = document.getElementById('addATask');
      this.addTask(target.value);
      target.value = ""
    }

    addTask(task) {
      let newTask = {
        task,
        isComplete: false,
      };
      let parentDiv = document.getElementById('addATask').parentElement;
      if(task.trim() === '') {
        parentDiv.classList.add('has-error');
      } else {
        parentDiv.classList.remove('has-error');
        this.tasks.push(newTask);
        this.loadTasks();
      }
    }

    toggleTaskStatus(index) {
      this.tasks[index].isComplete = !this.tasks[index].isComplete;
      this.loadTasks();
    }

    deleteTask(event, taskIndex) {
      event.preventDefault();
      this.tasks.splice(taskIndex, 1);
      this.loadTasks();
      // console.log(event);
    }

    generateTaskHtml(task, index) {
      return `
        <li class="list-group-item checkbox">
          <div class="row">
            <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
              <label><input id="toggleTaskStatus" type="checkbox" onchange="toDo.toggleTaskStatus(${index})" value="" class="" ${task.isComplete?'checked':''}></label>
            </div>
            <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text ${task.isComplete?'complete':''}">
              ${task.task}
            </div>
            <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">
              <a class="" href="/" onClick="toDo.deleteTask(event, ${index})"><i id="deleteTask" data-id="${index}" class="delete-icon glyphicon glyphicon-trash"></i></a>
            </div>
          </div>
        </li>
      `;
    }

    loadTasks() {
      localStorage.setItem('ALLTASKS', JSON.stringify(this.tasks));
      let tasksHtml = this.tasks.reduce((html, task, index) => html += this.generateTaskHtml(task, index), '');
      document.getElementById('taskList').innerHTML = tasksHtml;
    }
}

let toDo;

window.addEventListener("load", () => {
  tasksToDo = new TasksToDoClass();
});
