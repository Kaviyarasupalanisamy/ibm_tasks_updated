        const SET_ITEM = "set";
		const SET_DELETE = "delete";
		const SET_COMPLETE ="complete";
		const SET_INCOMPLETE ="incomplete";
		const SET_UPDATE ="updtae";
		var SET_STORAGE_TODO="todo";
		var SET_STORAGE_COMPLETED="completed"; 
		
		var taskInput = document.getElementById("new-task");
        var addButton = document.getElementsByTagName("button")[0];
        var incompleteTasksHolder = document.getElementById("incomplete-tasks");
        var completedTasksHolder = document.getElementById("completed-tasks");

        var createNewTaskElement = function(taskString, arr) {
          listItem = document.createElement("li");
          checkBox = document.createElement("input");
          label = document.createElement("label");
          editInput = document.createElement("input");
          editButton = document.createElement("button");
          deleteButton = document.createElement("button");

          checkBox.type = "checkbox";
          editInput.type = "text";
          editButton.innerText = "Edit";
          editButton.className = "edit";
          deleteButton.innerText = "Delete";
          deleteButton.className = "delete";
          label.innerText = taskString;

          listItem.appendChild(checkBox);
          listItem.appendChild(label);
          listItem.appendChild(editInput);
          listItem.appendChild(editButton);
          listItem.appendChild(deleteButton);

          return listItem;
        };

        var addTask = function (storageValue) {
          var listItemName = taskInput.value
		  if(listItemName.trim() == "")
		  {
			 taskInput.classList.add("error");
			 return;
		  }else{
			  taskInput.classList.remove("error");
		  }
          listItem = createNewTaskElement(listItemName)
		  console.log(listItemName);
		  setLocalStorage(SET_ITEM,SET_STORAGE_TODO,listItemName);
          incompleteTasksHolder.appendChild(listItem)
		  console.log(listItem);
          bindTaskEvents(listItem, taskCompleted)
          taskInput.value = "";
        };

        var editTask = function () {
          var listItem = this.parentNode;
          var editInput = listItem.querySelectorAll("input[type=text")[0];
          var label = listItem.querySelector("label");
          var button = listItem.getElementsByTagName("button")[0];

          var containsClass = listItem.classList.contains("editMode");
          if (containsClass) {
              label.innerText = editInput.value
              button.innerText = "Edit";
          } else {
             editInput.value = label.innerText
             button.innerText = "Save";
          }
          setLocalStorage(SET_UPDATE,SET_STORAGE_TODO,editInput.value);
          listItem.classList.toggle("editMode");
        };

        var deleteTask = function (el) {
          var listItem = this.parentNode;
          var ul = listItem.parentNode;
          ul.removeChild(listItem);
		  setLocalStorage(SET_DELETE,SET_STORAGE_TODO,listItem.querySelector("label").innerText);
        };

        var taskCompleted = function (el) {
          var listItem = this.parentNode;
          completedTasksHolder.appendChild(listItem);
		  bindTaskEvents(listItem, taskIncomplete);
		  setLocalStorage(SET_COMPLETE,SET_STORAGE_TODO,listItem.querySelector("label").innerText);
		  
        };

        var taskIncomplete = function() {
          var listItem = this.parentNode;
          incompleteTasksHolder.appendChild(listItem);
          bindTaskEvents(listItem, taskCompleted);
		  setLocalStorage(SET_INCOMPLETE,SET_STORAGE_TODO,listItem.querySelector("label").innerText);
        };

        var bindTaskEvents = function(taskListItem, checkBoxEventHandler, cb) {
          var checkBox = taskListItem.querySelectorAll("input[type=checkbox]")[0];
          var editButton = taskListItem.querySelectorAll("button.edit")[0];
          var deleteButton = taskListItem.querySelectorAll("button.delete")[0];
          editButton.onclick = editTask;
          deleteButton.onclick = deleteTask;
          checkBox.onchange = checkBoxEventHandler;
        };

        addButton.addEventListener("click", addTask);

        for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
          bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
        }

        for (var i = 0; i < completedTasksHolder.children.length; i++) {
          bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
        }
		var toDoItem = [];
		var completedItem=[];
		function setLocalStorage(opertation,name,value)
		{   
			if (typeof(Storage) !== "undefined") {
				if(opertation == SET_ITEM)
				{    
				     toDoItem.push(value);
				     localStorage.setItem(name, toDoItem);
				}
				else if(opertation == SET_DELETE)
				{   
					var todo = localStorage.getItem(name);
					todos=todo.split(",");
					var todos = todos.filter((val)=> val!=value);
					localStorage.setItem(name, todos.join(","));
					
					var completed = localStorage.getItem(SET_STORAGE_COMPLETED);
					completed=completed.split(",");
					var completed = completed.filter((val)=> val!=value);
					localStorage.setItem(SET_STORAGE_COMPLETED, completed.join(","));
					
				}
				else if(opertation == SET_COMPLETE)
				{
					var todo = localStorage.getItem(name);
					todos=todo.split(",");
					todoIndex=todos.indexOf(value);
					todos.splice(todoIndex,1);
					todos=todos.join(",");
					localStorage.setItem(name, todos);
					
					var completedItem = localStorage.getItem(SET_STORAGE_COMPLETED);
					if(completedItem)
					{
						completedItem=completedItem.split(",");
					}
					else
					{
						completedItem=[];
					}
					completedItem.push(value);
					completedItem=completedItem.join(",");
					localStorage.setItem(SET_STORAGE_COMPLETED,completedItem);
				}
				else if(opertation == SET_INCOMPLETE)
				{
					var completed = localStorage.getItem(SET_STORAGE_COMPLETED);
					completed=completed.split(",");
					todoIndex=completed.indexOf(value);
					completed.splice(todoIndex,1);
					completed=completed.join(",");
					localStorage.setItem(SET_STORAGE_COMPLETED, completed);
					
					var todo = localStorage.getItem(name);
					if(todo.trim()!="")
					{
					 todos=todo.split(",");
					}
					else
					{
						todos=[];
					}
					todos.push(value);
					toDoItem_INC=todos.join(",");
					localStorage.setItem(SET_STORAGE_TODO,toDoItem_INC);
				}
				else if(opertation == SET_UPDATE)
				{
					var completed = localStorage.getItem(SET_STORAGE_COMPLETED);
					completed=completed.split(",");
					todoIndex=completed.indexOf(value);
					completed.splice(todoIndex,1);
					completed=completed.join(",");
					localStorage.setItem(SET_STORAGE_COMPLETED, completed);
					
					var todo = localStorage.getItem(name);
					todos=todo.split(",");
					todos.push(value);
					toDoItem_TODO=todos.join(",");
					localStorage.setItem(SET_STORAGE_TODO,toDoItem_TODO);
				}
			} else {
			  document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
			}
		}
		
document.addEventListener('DOMContentLoaded', function(event) {
  if (typeof(Storage) !== "undefined") {
	  var todo = localStorage.getItem(SET_STORAGE_TODO);
	  if(todo)
	  {
		  todo=todo.split(",");
		  todo.map((val)=>
		  {
			  listItem = createNewTaskElement(val)
			  incompleteTasksHolder.appendChild(listItem)
			  bindTaskEvents(listItem, taskCompleted)
		  });
	}
	var completed  = localStorage.getItem(SET_STORAGE_COMPLETED);
	if(completed)
	  {
		  completed=completed.split(",");
		  completed.map((val)=>
		  {
			  var completedCont = `<li><input type="checkbox" checked><label>${val}</label><input type="text"><button class="edit">Edit</button><button class="delete">Delete</button></li>`;
			  var HTMLStr = stringToHTML(completedCont);
			  completedTasksHolder.appendChild(HTMLStr);
			  bindTaskEvents(HTMLStr, taskIncomplete);
		  });
	  }
	} 
	else 
	{
		console.log("localstorage not available");
	}
});


var stringToHTML = function (str) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(str, 'text/html');
	console.log(doc.body.getElementsByTagName("li")[0]);
	return doc.body.getElementsByTagName("li")[0];
};