// gestion apparriion/disparition de la modale de réglage
const body = document.querySelector('body');
const setting = document.querySelector('.setting');
const modale = document.querySelector('.modale');
const closeModale = document.querySelector('.close_modale');
const allBtns = document.querySelectorAll('.btns');
const btnBg = document.querySelector(".back-btn")
const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");
const btn3 = document.querySelector(".btn3");
const horlogeTitle = document.querySelector('.horloge_title');
const playBtn = document.querySelector('#play_pause');
const btnPlay = document.querySelector('.svgPlay');
const btnStop = document.querySelector('.svgStop');
const mins = document.querySelector('.mins');
const secs = document.querySelector('.secs');



setting.addEventListener('click', () => {
    modale.classList.remove('none');
    closeModale.classList.remove('none');
})
closeModale.addEventListener('click', () => {
    modale.classList.add('none');
    closeModale.classList.add('none');
})

// Default value
let pomodoro = "25";
let short = "5";
let long = "15";

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


    pomodoro.length < 2 ? `0${pomoInput.value}`: pomoInput.value;
    short.length < 2 ? `0${shortInput.value}`: shortInput.value;
    long.length < 2 ? `0${longInput.value}`: longInput.value;

    // Mise à jour de l'horloge (timer) validation de la durer de le bouton réglage.
    allBtns.forEach((btn) => {
        if(btn.classList.length == 3) {
            switch(btn.classList[1]) {
                case 'btn1':
                    btn1.click();
                    break;
                case 'btn2':
                    btn2.click();
                    break;
                case 'btn3':
                    btn3.click();
                    break;
            }
        }
    })

    modale.classList.add('none');
    closeModale.classList.add('none');
})




// Animation sur les 3 boutons du menu
btn1.addEventListener('click', function() {
    btn1.classList.add("active");
    btn2.classList.remove("active");
    btn3.classList.remove("active");
    btnBg.classList.add("anim1");
    btnBg.classList.remove("anim2");
    btnBg.classList.remove("anim3");
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
    horlogeTitle.innerHTML = 'Long Break';
    mins.innerHTML = `${long}`;
})

function convertTime(minutes) {
    let timeConverted = minutes * 60;
    return timeConverted
};

// Ordre du timer pomodoro
const orderPomo = ['work', 'short', 'work', 'short', 'work', 'short', 'work', 'long'];

let circleColor = '#e74c3c';



function timer(time, array){
    timerPlaying = setInterval(function(){
        // Décompte du temps
        time--
        console.log(time);

        if(time == 0){
            if(array.length > 0) {
                clearInterval(timerPlaying)
                let firstArray = array.shift();
                switch(firstArray){
                    case 'work':
                        time = convertTime(pomodoro);
                        break;
                    case 'short':
                        time = convertTime(short);
                        break;
                    case 'long':
                        time = convertTime(long);
                        break;
                }
                timer(time, array)
            } else {
                return;
            }
        }
    }, 1000);
}


playBtn.addEventListener('click', () => {
    btnPlay.classList.toggle('none');
    btnStop.classList.toggle('none');

    if(playBtn.classList['value'] === 'play') {
        let actual = convertTime(pomodoro);
        timer(actual, orderPomo)
    }
    if(playBtn.classList['value'] === 'stop') {
        clearInterval(timerPlaying)
    }

    playBtn.classList.toggle('play');
    playBtn.classList.toggle('stop');
})
