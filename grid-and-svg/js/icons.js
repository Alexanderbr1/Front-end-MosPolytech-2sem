const BURGER_MENU = document.querySelector('.btn-menu');
let line1 = document.querySelector('.burger-menu__line1');
let line2 = document.querySelector('.burger-menu__line2');
let line3 = document.querySelector('.burger-menu__line3');

BURGER_MENU.addEventListener('click', () => {
    line1.classList.toggle("burger-menu__line1--animation");
    line2.classList.toggle("burger-menu__line2--animation");
    line3.classList.toggle("burger-menu__line3--animation");
})