let time = 1500, secondTime = 300;
let minute = Math.floor(time / 60), second = time - minute * 60;
var audio = new Audio('finishSound.mp3');

let message = document.getElementById("message");
let timer = document.getElementById("timer");
let startBtn = document.getElementById("startBtn");
let pauseBtn = document.getElementById("pauseBtn");
let resumeBtn = document.getElementById("resumeBtn");

let mainTimer, breakTimer;

pauseBtn.style.display = resumeBtn.style.display = "none"
message.style.visibility = "hidden"

startBtn.addEventListener("click", start);
pauseBtn.addEventListener("click", pause);
resumeBtn.addEventListener("click", resume);

function start() {
    mainTimer = setInterval(pomodoro, 1000);
    pauseBtn.style.display = "block"
    resumeBtn.style.display = startBtn.style.display = "none"
}
function pause() {
    clearInterval(mainTimer);
    clearInterval(breakTimer);
    resumeBtn.style.display = "block"
    pauseBtn.style.display = startBtn.style.display = "none"
}

function resume() {
    if (time <= 0)
        breakTimer = setInterval(takeBreak, 1000);
    else
        mainTimer = setInterval(pomodoro, 1000);
    pauseBtn.style.display = "block"
    resumeBtn.style.display = startBtn.style.display = "none"
}

function pomodoro() {
    minute = Math.floor(time / 60);
    second = time - minute * 60;
    minute = ('0' + minute).slice(-2)
    second = ('0' + second).slice(-2)
    timer.innerText = minute + " : " + second;
    if (time <= 0) {
        audio.play();
        message.style.visibility = "visible"
        clearInterval(mainTimer);
    }
    time--;
}

function messageClear() {
    message.style.visibility = "hidden"
    if (time <= 0)
        breakTime();
}

function breakTime() {
    breakTimer = setInterval(takeBreak, 1000);
}

function takeBreak() {
    minute = Math.floor(secondTime / 60);
    second = secondTime - minute * 60;
    minute = ('0' + minute).slice(-2)
    second = ('0' + second).slice(-2)
    timer.innerText = minute + " : " + second;
    if (secondTime <= 0) {
        audio.play();
        message.innerHTML = "<span>Hurray, Now It's Time To Get Back To Work!! </span> <span onclick=\"messageClear()\">OK</span>"
        clearInterval(breakTimer);
        time = 1500, secondTime = 301;
        message.style.visibility = "visible"
        startBtn.style.display = "block"
        pauseBtn.style.display = resumeBtn.style.display = "none"
    }
    secondTime--;
}