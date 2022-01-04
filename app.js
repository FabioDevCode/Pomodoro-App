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