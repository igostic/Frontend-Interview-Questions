import "./styles.css";

var input = document.createElement("input");
input.type = "text";
input.placeholder = "Enter your items here";
document.body.appendChild(input);

var btn = document.createElement("button");
btn.textContent = "click";
document.body.appendChild(btn);

var taskList = document.createElement("ul");
document.body.appendChild(taskList);

function createTaskItem(val) {
  var item = document.createElement("li");
  var edit = document.createElement("button");
  edit.textContent = "edit";
  edit.classList.add("edit");
  var del = document.createElement("button");
  del.textContent = "delete";

  item.textContent = val;
  item.appendChild(edit);
  item.appendChild(del);

  // delete functionality
  del.addEventListener("click", function () {
    item.remove();
  });

  // edit functionality

  edit.addEventListener("click", function () {
    // Step 1: Get the current text content of the task
    var textContent = item.firstChild.nodeValue;

    // Step 2: Create a new input element
    var input = document.createElement("input");
    input.type = "text";

    // Step 3: Set the initial value of the input
    // field to the current task text
    input.value = textContent;

    // Step 4: Set up an event listener for when
    // the input field loses focus
    input.addEventListener("blur", function () {
      // Step 5: When the input field loses
      // focus, update the textContent
      // variable with the new value
      textContent = input.value;

      // Step 6: Update the li element's text
      // content with the new value entered by the user
      item.textContent = textContent;

      // Step 7: Re-add the "edit" and "delete"
      // buttons to the li element
      item.appendChild(edit);
      item.appendChild(del);
    });

    // Step 8: Clear the content of the li
    // element to make room for the input field
    item.textContent = "";

    // Step 9: Append the input field
    // to the li element
    item.appendChild(input);

    // Step 10: Focus on the input field
    // to allow the user to start typing
    input.focus();
  });

  return item;
}

function addTask() {
  let val = input.value;
  // don't append empty values
  if (!val) return;
  var item = createTaskItem(val);
  taskList.appendChild(item);
  input.value = "";
}

btn.addEventListener("click", addTask);
