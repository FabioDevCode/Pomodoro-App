const btnBg = document.querySelector(".back-btn");

const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");
const btn3 = document.querySelector(".btn3");


btn1.addEventListener('click', function() {
    btn1.classList.add("active");
    btn2.classList.remove("active");
    btn3.classList.remove("active");
    btnBg.classList.add("anim1");
    btnBg.classList.remove("anim2");
    btnBg.classList.remove("anim3");
})

btn2.addEventListener('click', function() {
    btn1.classList.remove("active");
    btn2.classList.add("active");
    btn3.classList.remove("active");
    btnBg.classList.remove("anim1");
    btnBg.classList.add("anim2");
    btnBg.classList.remove("anim3");
})

btn3.addEventListener('click', function() {
    btn1.classList.remove("active");
    btn2.classList.remove("active");
    btn3.classList.add("active");
    btnBg.classList.remove("anim1");
    btnBg.classList.remove("anim2");
    btnBg.classList.add("anim3");
})



// Countdown Process
let pomodoro = 60;
let short = 5;
let long = 15;
let min = 0;

function convertTime(minutes) {
    let timeConverted = minutes * 60;
    return timeConverted
};

let progressBar = document.querySelector(".progress-bar");

let speed = 100;
let actual = pomodoro;
let degRadiant = (actual / 360);



let countCircle = setInterval(()=> {
    actual--;

    progressBar.style.background = `conic-gradient(
        #ff6347 ${actual / degRadiant}deg,
        #212c3b ${actual / degRadiant}deg
    )`;
    if(actual == min) {
        clearInterval(actual)
    }
}, 1000);




