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
  const span = document.createElement('span');
  span.appendChild(task);
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.innerHTML = `delete`;
  const editBtn = document.createElement('button');
  editBtn.className = 'edit-btn';
  editBtn.innerHTML = `edit`;
  const btnWrapper = document.createElement('div');
  btnWrapper.appendChild(editBtn);
  btnWrapper.appendChild(deleteBtn);
  editBtn.style.marginRight = '10px';
  li.appendChild(toggle);
  li.appendChild(span);
  li.appendChild(btnWrapper);
  list.appendChild(li);
  input.value = '';
}

function deleteTask(e){
  // if(e.target.tagName==='BUTTON'){
  //   e.target.parentElement.remove();
  // }

  if(e.target.className == 'delete-btn'){
    e.target.parentElement.parentElement.remove();
  }
}

addBtn.addEventListener('click',addToList);
input.addEventListener('keydown',enterDetection)

list.addEventListener('click',deleteTask);

list.addEventListener('click',editTask);

list.addEventListener('click',strikeOff);

function strikeOff(e){
  if(e.target.tagName === 'INPUT' && e.target.type === 'checkbox'){
    e.target.nextElementSibling.classList.toggle('strike');
    // console.log(e.target.nextElementSibling)
  }
}

function enterDetection(e){
  if(e.key==='Enter') addToList(e)
}

function editTask(e){
  if(e.target.className === 'edit-btn'){
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = e.target.parentElement.previousElementSibling.innerHTML;
    e.target.parentElement.previousElementSibling.replaceWith(editInput);
    const editSlot = e.target.parentElement.previousElementSibling;
    console.log(editSlot);

    editInput.addEventListener('keydown',function(e){
    if(e.key==='Enter'){
          
          const newSpan = document.createElement('span');
          newSpan.innerHTML = `${editInput.value}`
          editSlot.replaceWith(newSpan);
    }
});
  }
}

