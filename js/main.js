const boxButtons = document.querySelector('.box-buttons')
const buttonPlay = document.getElementById('play');
const buttonPause = document.getElementById('pause');
const buttonStop = document.getElementById('stop');
const spanHour = document.getElementById('hour');
const spanMinute = document.getElementById('minute');
const spanSeconds = document.getElementById('seconds');
const circleSeconds = document.getElementById('progress-seconds');
const circleMinutes = document.getElementById('progress-minutes');
const circleHours = document.getElementById('progress-hours');

let hour = 0;
let minute = 0;
let seconds = 0;
let set;

circleSeconds.style.strokeDashoffset = 0;
circleMinutes.style.strokeDashoffset = 0;
circleHours.style.strokeDashoffset = 0;

document.addEventListener('click', (e) => {
    let el = e.target.getAttribute('id');
    if (el === 'play') {
        buttonPlay.parentElement.removeChild(buttonPlay);
        set = setInterval(() => {
            timer();
            progressBars(seconds, minute, hour);
        }, 1000)
    }

    if (el === 'pause') {
        boxButtons.insertBefore(buttonPlay, buttonPause);
        setTimeout(() => {
            clearInterval(set)
        })
    }

    if (el === 'stop') {
        boxButtons.insertBefore(buttonPlay, buttonPause);
        clearInterval(set);
        seconds = 0;
        minute = 0;
        hour = 0;
        circleSeconds.style.strokeDashoffset = 0;
        circleMinutes.style.strokeDashoffset = 0;
        circleHours.style.strokeDashoffset = 0;
        spanHour.textContent = '00';
        spanMinute.textContent = '00';
        spanSeconds.textContent = '00';
    }
});

function verificarTimer(val) {
    return val < 10 ? '0' + val : val;
}

function timer() {
    if (seconds < 60) {
        seconds++;
        spanSeconds.textContent = verificarTimer(seconds);
        spanMinute.textContent = verificarTimer(minute);
    }

    if (seconds === 60) {
        seconds = 0;
        minute++;
        spanSeconds.textContent = verificarTimer(seconds);
        if (minute === 60) {
            minute = 0;
            hour++;
            spanMinute.textContent = verificarTimer(minute);
            spanHour.textContent = verificarTimer(hour);
        }
        spanMinute.textContent = verificarTimer(minute);
    }
}

function progressBars(s, m, h) {
    let progressSeconds = (100 * s / 60);
    let progressMinutes = (100 * m / 60);
    let progressHours = (100 * h / 24);
    circleSeconds.style.strokeDashoffset = 430 - (widthDocument() * (progressSeconds / 100));
    circleMinutes.style.strokeDashoffset = 430 - (widthDocument() * (progressMinutes / 100));
    circleHours.style.strokeDashoffset = 430 - (widthDocument() * (progressHours / 100));
}

function widthDocument(){
    const w = getComputedStyle(document.body)
    const width = w.width;
    let num = '';
    for (let i of width) {
        if (Number(i) || i == 0){
            num = num + `${i}`
        }
        if(i === '.'){
            break
        }
    }
    if (num <= 500) {
        return 220;
    }
    return 380;
}
