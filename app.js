// gestion apparriion/disparition de la modale de réglage
const body = document.querySelector('body');
const setting = document.querySelector('.setting');
const modale = document.querySelector('.modale');
const closeModale = document.querySelector('.close_modale');
const allBtns = document.querySelectorAll('.btns');

setting.addEventListener('click', () => {
    modale.classList.remove('none');
    closeModale.classList.remove('none');
})

closeModale.addEventListener('click', () => {
    modale.classList.add('none');
    closeModale.classList.add('none');
})

// Default value
let pomodoro = 25;
let short = 5;
let long = 15;

// Récupération des velues des inputs
const btnSetting = document.querySelector('.setting_save');
const pomoInput = document.querySelector('#work');
const shortInput = document.querySelector('#short');
const longInput = document.querySelector('#long');

btnSetting.addEventListener('click', (event) => {
    event.preventDefault();
    pomodoro = pomoInput.value;
    short = shortInput.value;
    long = longInput.value;
    modale.classList.add('none');
    closeModale.classList.add('none');
})

const btnBg = document.querySelector(".back-btn")
const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");
const btn3 = document.querySelector(".btn3");
const horlogeTitle = document.querySelector('.horloge_title');
const mins = document.querySelector('.mins');

let weStartfor;

// Animation sur les 3 boutons du menu
btn1.addEventListener('click', function() {
    btn1.classList.add("active");
    btn2.classList.remove("active");
    btn3.classList.remove("active");
    btnBg.classList.add("anim1");
    btnBg.classList.remove("anim2");
    btnBg.classList.remove("anim3");
    weStartfor = orderPomo.work;
    horlogeTitle.innerHTML = 'Work Time';
    mins.innerHTML = `${pomodoro}`;
})
btn2.addEventListener('click', function() {
    btn1.classList.remove("active");
    btn2.classList.add("active");
    btn3.classList.remove("active");
    btnBg.classList.remove("anim1");
    btnBg.classList.add("anim2");
    btnBg.classList.remove("anim3");
    weStartfor = orderPomo.short;
    horlogeTitle.innerHTML = 'Short Break';
    mins.innerHTML = `${short}`;
})
btn3.addEventListener('click', function() {
    btn1.classList.remove("active");
    btn2.classList.remove("active");
    btn3.classList.add("active");
    btnBg.classList.remove("anim1");
    btnBg.classList.remove("anim2");
    btnBg.classList.add("anim3");
    weStartfor = orderPomo.short;
    horlogeTitle.innerHTML = 'Long Break';
    mins.innerHTML = `${long}`;
})


// Ordre du timer pomodoro
const orderPomo = {
    work: ['work', 'short', 'work', 'short', 'work', 'short', 'work', 'long'],
    short: ['short', 'work', 'short', 'work', 'short', 'work', 'short', 'work', 'long'],
    long: ['long', 'work', 'short', 'work', 'short', 'work', 'short', 'work', 'long']
}


// Changer la couleur du cercle en fonction du timer en cours work, short ou long
let circleColor = '#e74c3c';
function specActualPomodori(actualPomo) {
    switch(actualPomo) {
        case 'work':
            circleColor = '#e74c3c';
            break;
        case 'short':
            circleColor = '#2ecc71';
            break;
        case 'long':
            circleColor = '#3498db';
            break;
    }
}

const playBtn = document.querySelector('#play_pause');
playBtn.addEventListener('click', () => {
    alert('start le timer !');
})


let min = 0;

function convertTime(minutes) {
    let timeConverted = minutes * 60;
    return timeConverted
};


let progressBar = document.querySelector(".progress-bar");

let actual = pomodoro;
let degRadiant = (actual / 360);


// let countCircle = setInterval(()=> {
//     actual--;

//     progressBar.style.background = `conic-gradient(
//         #e74c3c ${actual / degRadiant}deg,
//         #222F3E ${actual / degRadiant}deg
//     )`;

//     if(actual == min) {
//         clearInterval(actual)
//     }
// }, 1000);




