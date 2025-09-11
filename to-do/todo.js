const input = document.getElementById('fname');
const addBtn = document.querySelector('.input-wrapper button');
const list = document.querySelector('.task-list');

loadFromLocalStorage();

function addToLocal(){
  let arrayOfLists = [];

  let lists = document.querySelectorAll('.task-list li');
  lists.forEach(function(li){
    const span = li.querySelector('span');
    if(span.classList.contains('strike')){
      arrayOfLists.push([span.textContent,'done']);
    }
    else{
      arrayOfLists.push([span.textContent,'pending']);
    }
    // arrayOfLists.push(li.querySelector('span').textContent);
  });

  console.log(JSON.stringify(arrayOfLists));

  localStorage.setItem('tasks',JSON.stringify(arrayOfLists));
}

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
  addToLocal();
}

function addToListFromLocal(task){
  
  const li = document.createElement('li');
  const toggle = document.createElement('input');
  toggle.type = 'checkbox';
  const span = document.createElement('span');
  span.textContent = task[0];
  if(task[1]=='done'){
    span.classList.toggle('strike');
    toggle.checked = true;
  }
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
}

function deleteTask(e){
  // if(e.target.tagName==='BUTTON'){
  //   e.target.parentElement.remove();
  // }

  if(e.target.className == 'delete-btn'){
    e.target.parentElement.parentElement.remove();
    addToLocal();
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
    addToLocal();
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
    let prevElement = e.target.parentElement.previousElementSibling;
    let strikeCheck = false;
    if(prevElement.classList.contains('strike')) strikeCheck = true;
    prevElement.replaceWith(editInput);
    
    const editSlot = e.target.parentElement.previousElementSibling;
    console.log(editSlot);

    editInput.addEventListener('keydown',function(e){
    if(e.key==='Enter'){
          
          const newSpan = document.createElement('span');
          newSpan.innerHTML = `${editInput.value}`
          if(strikeCheck) newSpan.classList.add('strike');
          editSlot.replaceWith(newSpan);
          addToLocal();
    }

    if(e.key=='Escape'){
      editSlot.replaceWith(prevElement);
    }
});
  }
}


function loadFromLocalStorage(){
  if(localStorage.getItem('tasks')){

    const taskList = JSON.parse(localStorage.getItem('tasks')) 
  taskList.forEach(function(task){
    addToListFromLocal(task);
  })
  }
  
}


// this is essential if we are putting our script in head of HTML file 
// window.addEventListener('load',loadFromLocalStorage);
