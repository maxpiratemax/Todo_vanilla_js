const addItemsForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const itemsList = document.querySelector('#todo-list');
const btnClear = document.querySelector('#clear');
const img = document.querySelector('.img');
const img_small = document.querySelector('.img__small');
let items = JSON.parse(localStorage.getItem('items')) || [];
let input = todoInput.placeholder;
const screenWidth = document.body.clientWidth;


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
    } else {
        todoInput.placeholder = "Вы ничего не ввели";
        setTimeout(function () {
            todoInput.placeholder = input;
        }, 2000)
    }
};

function displayItems(tasks, taskList) {

    taskList.innerHTML = tasks.map((task, index) => {
        return `<li id="li-id${index}"><div class="checkbox"><input type='checkbox' id=${index} data-index='${index}' ${task.checked ? 'checked' : ''}/></div>
      <label data-tooltip="Нажмите чтобы удалить задачу" for='item${index}'>${task.text}</label>
      </li>`
    }).join('');
};


function toggleClick(e) {
    if (!e.target.matches('input')) return;

    const element = e.target.dataset.index;
    items[element].checked = !items[element].checked;
    localStorage.setItem('items', JSON.stringify(items));
    displayItems(items, itemsList);
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

itemsList.addEventListener('click', function (e) {
    
    let id = e.target;

    if (id.value != 0 && !id.matches('ul')) {
        items = items.filter(function (f) {
            return f.text !== id.textContent;
        });
        localStorage.setItem('items', JSON.stringify(items));

        id.parentElement.remove();

    }
})




