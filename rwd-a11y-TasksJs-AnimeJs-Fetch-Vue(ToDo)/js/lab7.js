// Задача 1
console.log('ЗАДАЧА 1');

function countSandwiches(bread, cheese) {
    let result;
    numBread = bread / 2;
    
    if (bread < 2 || cheese <= 0) {
        result = 0;
    } else {
        result = numBread >= cheese ? cheese: Math.trunc(numBread);
    }
    return `countSandwiches(bread: ${bread}, cheese: ${cheese}) -> ${result}`;
}

console.log(countSandwiches(2,5));

// Задача 2
console.log('ЗАДАЧА 2');

function generateMultiplicationTable(number) {
    
    let firstStr = '';
    for (let i = 1; i <= number; i++) {
        firstStr += String(i) + ' ';
    }
    firstStr = '  ' + firstStr;
    console.log(firstStr);
   
    for (let i = 1; i <= number; i++) {
        let arr = [];
        arr.push(i);
        for (let k = 1; k <= number; k++) {
            arr.push(k * i);
        }
        console.log(arr.join(' '));
    }
}

generateMultiplicationTable(5);

// Задача 3
console.log('ЗАДАЧА 3');

function showQuote(arr, symbol) {

    let strLengthArr = [];

    arr.forEach(element => {
        strLengthArr.push(element.length);
    })

    maxLength = Math.max.apply(null, strLengthArr);
    
    let lineFirstEnd = `${symbol}`.repeat(maxLength + 4);

    console.log(lineFirstEnd);
    
    arr.forEach(element => {
        console.log(`${symbol}` + ' ' + element + ' '.repeat(maxLength - element.length + 1) + `${symbol}`);
    });

    console.log(lineFirstEnd);
}

showQuote(['Hello', 'World', 'In', 'Js'], '*');

// Задача 4
console.log('ЗАДАЧА 4');


function combineArrays(arr1, arr2) {

    let result = [];
    let maxLen = arr1.length >= arr2.length ? arr1.length : arr2.length;
    for (let i = 0; i <= maxLen; i++) {
        if (arr1[i]) {
            result.push(arr1[i]);
        }
        if (arr2[i]) {
            result.push(arr2[i]);
        }
    }
    return result;
}

console.log(combineArrays([1, 2, 3], ['a', 'b', 'c', 'd']));

// Задача 5
console.log('ЗАДАЧА 5');

 function countUniqueValues(arr) {
    const uniqueElements = {};
    arr.forEach((el) => {
        if (uniqueElements[el]) {
            uniqueElements[el]++;
        } else {
            uniqueElements[el] = 1;
        }
    })
    return uniqueElements;
 }

 console.log(countUniqueValues([1,2,1,2,3,4,2,5]));

 // Задача 6

const burger_menu = document.querySelector('.btn-menu');
const line1 = document.querySelector('.burger-menu__line1');
const line2 = document.querySelector('.burger-menu__line2');
const line3 = document.querySelector('.burger-menu__line3');
const headerNav = document.querySelector('.header__nav');
const body = document.querySelector("#body");
const navList = document.querySelector('.nav__list');


burger_menu.addEventListener('click', () => {
    line1.classList.toggle("burger-menu__line1--animation");
    line2.classList.toggle("burger-menu__line2--animation");
    line3.classList.toggle("burger-menu__line3--animation");
    headerNav.classList.toggle("header-nav-active");
    body.classList.toggle("lock");
})

navList.addEventListener("click", () => {
    body.classList.remove("lock");
    headerNav.classList.remove("header-nav-active");
    line1.classList.remove("burger-menu__line1--animation");
    line2.classList.remove("burger-menu__line2--animation");
    line3.classList.remove("burger-menu__line3--animation");
})

 // Задача 7

const toast = document.querySelector('.toast');
const close = document.querySelector('.close');
const data =  {
    name: 'Robert',
    message: 'Some Message',
}

toast.prepend(`Hello,${data.name}!. It is ${data.message} for you.`);

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        toast.classList.add("toast-active");
    },2000)
 })
 
 close.addEventListener("click", () => {
    toast.classList.add("toast-hidden");
    setTimeout(() => {
        toast.classList.remove("toast-active");
    },2000)
 })

 