let hamburger = document.getElementById('hamburger');
let headerContent = document.querySelector('.header-content');
let menu = document.querySelector('.menu');
// console.log(hamburger);
// console.log(headerContent);
// console.log(menu);
hamburger.addEventListener('click',()=>{
    headerContent.classList.toggle('none');
    menu.classList.toggle('none');
})
