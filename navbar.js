const hamburger = document.querySelector('.hamburger-wrapper');
const dropdown = document.querySelector('.dropdown');
hamburger.addEventListener('click', (e)=>{
    if(!dropdown.classList.contains('open')){
        dropdown.style.display = 'flex';
        dropdown.classList.add('open')
    }
    else{
        dropdown.style.display = 'none';
        dropdown.classList.remove('open')
    }
})