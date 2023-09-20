const startColor = document.querySelector('[data-start]');
const stopColor = document.querySelector('[data-stop]');
const body = document.querySelector('body');

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

startColor.addEventListener('click', startChangeColor);
stopColor.addEventListener('click', stopChangeColor);

let timerId = null;

function changeColor(){
    body.style.backgroundColor = getRandomHexColor();
}

function startChangeColor(){
    if(!timerId){
        changeColor();
        timerId = setInterval(changeColor, 1000);
        startColor.disabled = true;
        stopColor.disabled = false;
    }
}

function stopChangeColor(){
    if(timerId){
        clearInterval(timerId);
        timerId = null;
        startColor.disabled = false;
        stopColor.disabled = true;
    }
}