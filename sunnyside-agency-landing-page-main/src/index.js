let hamburger = document.getElementById('hamburger');
let headerContent = document.querySelector('.header-content');
let menuMobile = document.querySelector('.menu-mobile');


// console.log(hamburger);
// console.log(headerContent);
// console.log(menu);
hamburger.addEventListener('click',()=>{
    headerContent.classList.toggle('none');
    menuMobile.classList.toggle('none');
})
