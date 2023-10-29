const building1 = document.querySelector('.building-1')
const building2 = document.querySelector('.building-2')
const building3 = document.querySelector('.building-3')
const building4 = document.querySelector('.building-4')

let title1 = document.querySelector('.map__item-1')
let title2 = document.querySelector('.map__item-2')
let title3 = document.querySelector('.map__item-3')
let title4 = document.querySelector('.map__item-4')


const handleBuildingClick = (element) => {
    console.log(element);
    element.classList.toggle("map__item--active");
}


building1.addEventListener("click", () => {
    handleBuildingClick(title1);
})

building2.addEventListener("click", () => {
    handleBuildingClick(title2);
})

building3.addEventListener("click", () => {
    handleBuildingClick(title3);
})

building4.addEventListener("click", () => {
    handleBuildingClick(title4);
})








