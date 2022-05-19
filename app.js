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
let progressBar = document.querySelector(".progress-bar");
const sound = new Audio('./assets/Bell.mp3');


setting.addEventListener('click', () => {
    modale.classList.remove('none');
    closeModale.classList.remove('none');
})
closeModale.addEventListener('click', () => {
    modale.classList.add('none');
    closeModale.classList.add('none');
})

let work;
let short;
let long;

if(localStorage.getItem('workSt', 'shortSt', 'longSt')) {
    work = localStorage.getItem('workSt');
    short = localStorage.getItem('shortSt');
    long = localStorage.getItem('longSt');

    mins.innerHTML = `${work}`;
    secs.innerHTML = '00';
} else {
    work = "25";
    short = "05";
    long = "15";

    mins.innerHTML = `${work}`;
    secs.innerHTML = '00';
}

// Récupération des velues des inputs
const btnSetting = document.querySelector('.setting_save');
const pomoInput = document.querySelector('#work');
const shortInput = document.querySelector('#short');
const longInput = document.querySelector('#long');

btnSetting.addEventListener('click', (event) => {
    event.preventDefault();

    work = pomoInput.value > 9 ? pomoInput.value : `0${pomoInput.value}`;
    short = shortInput.value > 9 ? shortInput.value : `0${shortInput.value}`;
    long = longInput.value > 9 ? longInput.value : `0${longInput.value}`;

    localStorage.setItem('workSt', `${work}`);
    localStorage.setItem('shortSt', `${short}`);
    localStorage.setItem('longSt', `${long}`);

    work.value > 9 ? pomoInput.value : `0${pomoInput.value}`;
    short.value > 9 ? shortInput.value : `0${shortInput.value}`;
    long.value > 9 ? longInput.value : `0${longInput.value}`;

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
    mins.innerHTML = `${work}`;
    secs.innerHTML = '00';
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
    secs.innerHTML = '00';
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
    secs.innerHTML = '00';
})

function convertTime(minutes) {
    let timeConverted = minutes * 60;
    return timeConverted
};

// Période du pomodoro
const orderPomo = ['work', 'short', 'work', 'short', 'work', 'short', 'work', 'long'];
let circleColor = '#e74c3c';


function timer(time, array){
    sound.play();
    let degRadiant = (time / 360);
    timerPlaying = setInterval(function(){
        time--
        console.log(time);

        mins.innerHTML = Math.floor(time/60) > 9 ? Math.floor(time/60) : `0${Math.floor(time/60)}`;
        secs.innerHTML = time % 60 > 9 ? time % 60 : `0${time%60}`;

        progressBar.style.background = `conic-gradient(
            ${circleColor} ${time / degRadiant}deg,
            #212c3b ${time / degRadiant}deg
        )`;

        if(time == 0){
            array.shift();
            console.log(array[0]);
            if(array.length > 0) {
                clearInterval(timerPlaying)
                progressBar.style.background = `transparent`;
                switch(array[0]){
                    case 'work':
                        time = convertTime(work);
                        circleColor = '#e74c3c';
                        btn1.classList.add("active");
                        btn2.classList.remove("active");
                        btn3.classList.remove("active");
                        btnBg.classList.add("anim1");
                        btnBg.classList.remove("anim2");
                        btnBg.classList.remove("anim3");
                        horlogeTitle.innerHTML = 'Work Time';
                        break;
                    case 'short':
                        time = convertTime(short);
                        circleColor = '#2ecc71';
                        btn1.classList.remove("active");
                        btn2.classList.add("active");
                        btn3.classList.remove("active");
                        btnBg.classList.remove("anim1");
                        btnBg.classList.add("anim2");
                        btnBg.classList.remove("anim3");
                        horlogeTitle.innerHTML = 'Short Break';
                        break;
                    case 'long':
                        time = convertTime(long);
                        circleColor = '#3498db';
                        btn1.classList.remove("active");
                        btn2.classList.remove("active");
                        btn3.classList.add("active");
                        btnBg.classList.remove("anim1");
                        btnBg.classList.remove("anim2");
                        btnBg.classList.add("anim3");
                        horlogeTitle.innerHTML = 'Long Break';
                        break;
                }
                timer(time, array)
            } else {
                clearInterval(timerPlaying)
                progressBar.style.background = `transparent`;
                btn1.classList.add("active");
                btn2.classList.remove("active");
                btn3.classList.remove("active");
                btnBg.classList.add("anim1");
                btnBg.classList.remove("anim2");
                btnBg.classList.remove("anim3");
                mins.innerHTML = `${work}`;
                secs.innerHTML = '00';
                return;
            }
        }
    }, 1000);
}

playBtn.addEventListener('click', () => {
    btnPlay.classList.toggle('none');
    btnStop.classList.toggle('none');

    if(playBtn.classList['value'] === 'play') {
        let actual = convertTime(work);
        timer(actual, orderPomo)
        btn1.classList.add("active");
        btn2.classList.remove("active");
        btn3.classList.remove("active");
        btnBg.classList.add("anim1");
        btnBg.classList.remove("anim2");
        btnBg.classList.remove("anim3");
        horlogeTitle.innerHTML = 'Work Time';
    }
    if(playBtn.classList['value'] === 'stop') {
        clearInterval(timerPlaying)
        progressBar.style.background = `transparent`;
        mins.innerHTML = `${work}`;
        secs.innerHTML = '00';
    }

    playBtn.classList.toggle('play');
    playBtn.classList.toggle('stop');
})