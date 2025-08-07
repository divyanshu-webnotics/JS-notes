const accordion = document.querySelectorAll('.accordion');
const content = document.querySelectorAll('.content');
console.log(accordion);

// accordion.forEach((acc,index)=>{
//     acc.addEventListener((e)=>{
//         // content.forEach((c)=>{
//         //     c.style.display = 'none';
//         // })

//         // accordion.forEach((a)=>{
//         //     a.classList.remove('open');
//         // })

//         content[index].style.display = 'block';
//     })
// })

// accordion.forEach((val, index) => {
    
//     val.addEventListener('click', (e) => {
//          content.forEach((element,i) => {
//                 element.style.display = 'none';
//             })
//             accordion.forEach((val)=>{
//                 val.className = 'accordion'
//             })
//         // debugger;
//         if (val.className === 'accordion') {
           
//             content[index].style.display = 'block';
//             val.className = 'accordion open';
//         }
//         else {
//             content[index].style.display = 'none';
//             val.className = 'accordion';
//         }
//     })
// })


accordion.forEach((val, index) => {
    
    val.addEventListener('click', (e) => {
         content.forEach((element,i) => {
                element.style.display = 'none';
            })
        // debugger;
            content[index].style.display = 'block';
    })
})