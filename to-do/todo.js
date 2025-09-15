const input = document.getElementById('fname');
const addBtn = document.querySelector('.input-wrapper button');
const list = document.querySelector('.task-list');
const popUp = document.querySelector('.warning-overlay');
const selectAll = document.querySelector('.all-btns span:nth-child(1)');
const deleteAll = document.querySelector('.all-btns span:nth-child(2)');
const allWrapper = document.querySelector('.all-btns');
const select = document.querySelector('.filter-wrapper select');


loadFromLocalStorage();


select.addEventListener('change',(e)=>{
  if(select.value==='pending'){
//       console.log('heybeath')
//     const liSpan = 
// list.querySelectorAll('input[type="checkbox"]:not(:checked)');
//     const myLi = [];
//      liSpan.forEach((l)=>{
//       myLi.push(l.parentElement);
//     })
//  console.log(myLi);
//  list.innerHTML = '';
//     myLi.forEach((m)=>{
      
//   list.appendChild(m);
//     })




if(localStorage.getItem('tasks')){
  list.innerHTML = '';
 
    const taskList = JSON.parse(localStorage.getItem('tasks'));
    // console.log(taskList); 
  taskList.forEach(function(task){
    if(task[1]==='pending'){
          addToListFromLocal(task);
    }

  })
  }
  







  }
  else if(select.value==='completed'){
  
//         const liSpan = list.querySelectorAll('.strike') ;
//     const myLi = [];
//      liSpan.forEach((l)=>{
//       myLi.push(l.parentElement);
//     })

    
//  console.log(myLi);
//  list.innerHTML = '';
//     myLi.forEach((m)=>{
      
//   list.appendChild(m);
//     })
//   }


if(localStorage.getItem('tasks')){
  list.innerHTML = '';
 
    const taskList = JSON.parse(localStorage.getItem('tasks'));
    // console.log(taskList); 
  taskList.forEach(function(task){
    if(task[1]==='done'){
          addToListFromLocal(task);
    }

  })
  }




   
}

else if(select.value==='select'){
    list.innerHTML = '';
    console.log('bye');
    loadFromLocalStorage()
   }

})




allWrapper.addEventListener('click',(e)=>{
  console.log(e.target.textContent);
  console.log(typeof(e.target.textContent));
  if(e.target.className === 'select'){
    list.querySelectorAll('input').forEach((ip)=>{
      ip.checked = true;
      if(!(ip.nextElementSibling.classList.contains('strike'))){
        ip.nextElementSibling.classList.add('strike');
                addToLocal();
      }
      // ip.nextElementSibling.classList.toggle('strike');
    })
  }
  else if(e.target.className === 'delete'){
    const allLists = list.querySelectorAll('li');

    popUp.style.display = 'flex';

        function finalDeleteTask(e){
      if(e.target.classList.contains('yes-btn')){
        allLists.forEach((li)=>{
          li.remove();
        })
        popUp.style.display = 'none';
        addToLocal();
      }
    }

    popUp.addEventListener('click',finalDeleteTask);
  }
})

addBtn.style.display = 'none';
// input.addEventListener('focus',(e)=>{
//   addBtn.style.display = 'inline';
// })
input.addEventListener('keydown',function(e){
   addBtn.style.display = 'inline';
})
// input.addEventListener('blur',(e)=>{
//   setTimeout(function(){
//     addBtn.style.display = 'none';
//   },500)
  
// })

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
  addBtn.style.display = 'none';
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

let targetList;

popUp.addEventListener('click',function(e){
  console.log(e.target);
  if(e.target.className != 'warning' && e.target.className != 'yes-btn' && e.target.tagName != 'SPAN'){
    popUp.style.display = 'none';
  }
})

function deleteTask(e){
  // if(e.target.tagName==='BUTTON'){
  //   e.target.parentElement.remove();
  // }

  if(e.target.className == 'delete-btn'){
    // e.target.parentElement.parentElement.remove();
    const targetList = e.target.parentElement.parentElement;
    console.log(targetList);
    popUp.style.display = 'flex';

    function finalDeleteTask(e){
      if(e.target.classList.contains('yes-btn')){
        targetList.remove();
        popUp.style.display = 'none';
        addToLocal();
      }
    }

    list.addEventListener('click',finalDeleteTask);
  }
}

    function finalDeleteTask(e){
if(e.target.className == 'yes-btn')

  console.log(targetList);

      addToLocal();
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
  let editBtn = e.target;
  if(e.target.className === 'edit-btn'){
    e.target.disabled = true;
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
    console.log(editBtn);
    editBtn.disabled = false;
    
});
  }
}


function loadFromLocalStorage(){
  if(localStorage.getItem('tasks')){

    const taskList = JSON.parse(localStorage.getItem('tasks'));
    console.log(taskList); 
  taskList.forEach(function(task){
    addToListFromLocal(task);
  })
  }
  
}


// this is essential if we are putting our script in head of HTML file 
// window.addEventListener('load',loadFromLocalStorage);