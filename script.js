const addItemsForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const itemsList = document.querySelector('#todo-list');
const btnClear = document.querySelector('#clear');
let items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
    e.preventDefault();
    const text = e.target.item.value;
    //   console.log(text)
    const item = {
        text,
        checked: false
    }

    if (todoInput.value != "") {
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
        displayItems(items, itemsList);
        this.reset();
        todoInput.focus();
    }
};

function displayItems(tasks, taskList) {

    taskList.innerHTML = tasks.map((task, index) => {
        return `<li><div class="checkbox"><input type='checkbox' id=item${index} data-index='${index}' ${task.checked ? 'checked' : ''}/></div>
      <label for='item${index}'>${task.text}</label>
      </li>`
    }).join('');
};


function toggleClick(e) {
    if (!e.target.matches('input')) return;

    const element = e.target.dataset.index;
    items[element].checked = !items[element].checked;
    localStorage.setItem('items', JSON.stringify(items));
    displayItems(items, itemsList);

    if (e.target.checked) {
      
       
    }
}


btnClear.addEventListener('click', clearAll);
addItemsForm.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleClick);
displayItems(items, itemsList);

function clearAll(e) {
    e.preventDefault();
    todoInput.value = "";
    items = [];
    displayItems(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
}


