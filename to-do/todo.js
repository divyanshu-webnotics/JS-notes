const input = document.getElementById('fname');
const addBtn = document.querySelector('.input-wrapper button');
const list = document.querySelector('.task-list');

function addToList(e){
  if(input.value === '') return;
  const li = document.createElement('li');
  // li.innerHTML = `<input type='checkbox' class='toggle'> ${input.value}`;
  const toggle = document.createElement('input');
  toggle.type = 'checkbox';
  const task = document.createTextNode(`${input.value}`);
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.innerHTML = `delete`;
  li.appendChild(toggle);
  li.appendChild(task);
  li.appendChild(deleteBtn);
  list.appendChild(li);
  input.value = '';
}

function deleteTask(e){
  // if(e.target.tagName==='BUTTON'){
  //   e.target.parentElement.remove();
  // }

  if(e.target.className == 'delete-btn'){
    e.target.parentElement.remove();
  }
}

addBtn.addEventListener('click',addToList);

list.addEventListener('click',deleteTask);