
$ = function(x){
  return document.getElementById(x);
}
const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const completedList = document.getElementById('completedTodo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

var todoList = []
var count = 0;
var todoObjArr = []
var completedTodoObjArr = []


completedTodo()

function completedTodo(){
  var child = completedList.lastElementChild;  

  while(child){
    completedList.removeChild(child)
    child = completedList.lastElementChild;
  }  
  for(var i = 0; i < completedTodoObjArr.length; i++){
    let liElement = document.createElement("il")
    liElement.classList.add("todo-item")

    let liText = document.createTextNode(completedTodoObjArr[i].textOfTodo)
    liElement.appendChild(liText);
    completedList.appendChild(liElement);
  }


}

function newTodo() {
  // validate text box 
  if($("todo-text").value != ""){
    // create a new il element and append it to ul
    let liElement = document.createElement("il")
    count = parseInt(count) + 1;
    var listN = 'list'+count;
    liElement.setAttribute("id", listN)
    liElement.classList.add("todo-item")

    // include a checkbox in each il 
    let checkBoxElement = document.createElement("input")
    checkBoxElement.setAttribute("type","checkbox")
    checkBoxElement.setAttribute("class","todo-checkbox")
    var checkboxN = "itemCheck"+count
    checkBoxElement.setAttribute("id",checkboxN)
    checkBoxElement.setAttribute("onClick","checkItem()")
    liElement.appendChild(checkBoxElement)

    // add text from user to il text 
    let liText = document.createTextNode($("todo-text").value)
    liElement.appendChild(liText);
    list.appendChild(liElement);

    // create an obj for each list item 
    const todoObj = {
      checkboxId: checkboxN,
      todoListId: listN,
      index: count,
      textOfTodo: $("todo-text").value,
      checkedValue: () => {
        return $(checkboxN).checked
      }
    }

    todoObjArr.push(todoObj)

    $("todo-text").value = "";
    itemCountSpan.innerHTML = todoObjArr.length;
    uncheckedCountSpan.innerHTML = checkItem();
    header()
    $("todo-text").focus();

  }  
}

function deleteTodoItem(){
  
  for(var i = 0; i < completedTodoObjArr.length; i++){
    completedTodoObjArr.splice(i,1)
    i--
  }
  itemCountSpan.innerHTML = todoObjArr.length;
  header()
  completedTodo()
}

function checkItem(){
  var uncheckedCount = todoObjArr.length;

  for(var i = 0; i < todoObjArr.length; i++){
    // let checkBoxNamee = 'itemCheck'+ (parseInt(i + 1))
    if(todoObjArr[i].checkedValue() === true){
       completedTodoObjArr.push(todoObjArr[i])
       uncheckedCount = parseInt(uncheckedCount) - 1;
       $(todoObjArr[i].todoListId).style.display = "none";
        todoObjArr.splice(i,1)
        i--

      }
  }
  completedTodo()
  header()

  
  uncheckedCountSpan.innerHTML = uncheckedCount;
  return uncheckedCount
}

function header(){
  if(todoObjArr.length >= 1){
    $("todoHeader").style.display = "block"
    $("todoHeader").contentEditable = true;
  }else {
    $("todoHeader").style.display = "none"
  }

  if(completedTodoObjArr.length >= 1){
    $("completedTodoHeader").style.display = "block"
  }else{
    $("completedTodoHeader").style.display = "none"
  }
  
}

$("todo-container").classList.add(classNames.TODO_ITEM);
$("todo-text").classList.add(classNames.TODO_TEXT)

window.onload = function(){
  $("todo-text").focus();
} 
