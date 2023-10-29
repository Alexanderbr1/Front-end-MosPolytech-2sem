const body = document.querySelector('body');
const preloader = document.querySelector('.loader');
const galleryList = document.querySelector('.gallery__wrapper');
const reloadBtn = document.querySelector('.floating-button');

const toast = document.querySelector('.toast');
const close = document.querySelector('.close');

const form = document.querySelector('.form');
const btnSumbit = document.querySelector('.form__btn');

let url = 'http://194.67.93.117:80';

window.addEventListener("load", () => {
    preloader.style = "display:block"
    fetch('http://194.67.93.117:80/images')
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        if (data.length == 0) {
            preloader.style = "display:none";
            let p = document.createElement('p');
            p.classList.add("no-img");
            p.innerHTML = "Изображения не найдены";
            reloadBtn.after(p);
        } else {
            if (data[0].alt != undefined) {
                console.log('good');
                preloader.style = "display:none";
                toast.style = "background: green"
                toast.prepend(`Данные получены`);
                toast.classList.add("toast-active");
                data.forEach(element => {
                    console.log(element.alt);
                    let div = document.createElement('div');
                    div.classList.add("gallery__item");

                    let img = document.createElement('img');
                    img.src = element.url;
                    img.alt = element.alt;
                    img.classList.add("gallery__img");

                    let desc = document.createElement('span');
                    desc.classList.add("gallery__desc");
                    desc.innerHTML = `${element.description}`;

                    div.prepend(img);
                    div.append(desc);
                    galleryList.prepend(div);
                });
            } else {
                preloader.style = "display:none";
                toast.style = "background: red";
                toast.prepend(data[0].message);
                toast.classList.add("toast-active");
            }
        }
    })
    .catch((error) => {
        preloader.style = "display:none";
        toast.style = "background: red";
        toast.prepend(`Неизвестная ошибка`);
        toast.classList.add("toast-active");
        console.log(error);
    })
})

 
 close.addEventListener("click", () => {
    toast.classList.add("toast-hidden");
    setTimeout(() => {
        toast.classList.remove("toast-active");
    },2000)
 })

form.addEventListener('submit', function(event) {
    event.preventDefault();
    let classValue = form.querySelector('[name="class"]').value;
    let tempValue = form.querySelector('[name="temp"]').value;
    const data = {
        class: String(classValue),
        temp: Number(tempValue)
    }
    btnSumbit.disabled = true;
    fetch("http://194.67.93.117:80/temp", {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        //make sure to serialize your JSON body
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then((answer) => {
            event.target.reset();
            toast.innerHTML = '';
            let btnClose = document.createElement('button');
            btnClose.classList.add("close");
            btnClose.innerHTML = "&#10060;";
            toast.prepend(btnClose);
            toast.style = "background: green";
            toast.prepend(`${answer.message}`);
            toast.classList.add("toast-active");
            toast.classList.remove("toast-hidden");
            btnClose.addEventListener("click", () => {
                toast.classList.add("toast-hidden");
                setTimeout(() => {
                    toast.classList.remove("toast-active");
                },2000)
            })
        })
        .catch( (error) => {
            toast.innerHTML = '';
            let btnClose = document.createElement('button');
            btnClose.classList.add("close");
            btnClose.innerHTML = "&#10060;";
            toast.prepend(btnClose);
            toast.style = "background: red";
            toast.prepend(`${error}`);
            toast.classList.add("toast-active");
            toast.classList.remove("toast-hidden");
            btnClose.addEventListener("click", () => {
                toast.classList.add("toast-hidden");
                setTimeout(() => {
                    toast.classList.remove("toast-active");
                },2000)
            })
        })
        .finally(() => {
            btnSumbit.disabled = false;
        })
})








