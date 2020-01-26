

var taskInput = document.getElementById("new-task"); 
var addButton = document.getElementsByTagName("button")[0]; 
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); 
var completedTasksHolder = document.getElementById("completed-tasks"); 



var createNewTaskElement = function(taskString) {
	// Create list item
	var listItem = document.createElement("li");
	// input (checkbox) 
	var checkBox = document.createElement("input"); 
	// label
	var label = document.createElement("label"); 
	// input (text)
	var editInput = document.createElement("input"); 
	// button.edit
	var editButton = document.createElement("button"); 
	// button.delete
	var deleteButton = document.createElement("button");
			
	
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
}



var addTask = function() {
	console.log("Add task...");
		
	var listItem = createNewTaskElement(taskInput.value);
	
	
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);	
}

var editTask = function() {
	console.log("Edit task...");

	var listItem = this.parentNode;
	
	var editInput = listItem.querySelector("input[type=text]");
	var label = listItem.querySelector("label");
	
	var containsClass = listItem.classList.contains("editMode");


	if(containsClass) {
			
				label.InnerText = editInput.value;
			} else  {
				// Switch to .editMode
				// input value become the label's text
				
				editInput.value = label.innerText;
				}
		
		listItem.classList.toggle("editMode");
	
		
}

var deleteTask = function() {
	console.log("Delete task...");
	var listItem = this.parentNode;
	var ul = listItem.parentNode;
	
	
	ul.removeChild(listItem);	
}


var taskCompleted = function() {
	console.log("Task complete...");
	
	var listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);
			
}

var taskIncomplete = function() {	
	console.log("Task incomplete...");		
	// Append this to #incomplete-tasks.
	var listItem = this.parentNode;
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);		
			
}
			
var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
	console.log("Bind list item events.");
	
	var checkbox = taskListItem.querySelector("input[type=checkbox]");
	var editButton = taskListItem.querySelector("button.edit");
	var deleteButton = taskListItem.querySelector("button.delete");
	
	
	editButton.onclick = editTask;
	
	deleteButton.onclick = deleteTask;
	
	checkbox.onchange = checkBoxEventHandler;
	
}
addButton.onclick = addTask;


	for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
		bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}
	
	for(var i = 0; i < completedTasksHolder.children.length; i++) {
		bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}