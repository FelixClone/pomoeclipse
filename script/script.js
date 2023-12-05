let isRunning = false;
let timer;
let wheel = document.getElementById('wheelTime');
let playerPause = document.getElementById('playerPause');
let audReset = document.getElementById('audReset');
let audStartStop = document.getElementById('audStartStop');

let pointToBeGood = 0;
let timeoutId;

function startStop() {
    audStartStop.play()
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        playerPause.setAttribute('class','bi-caret-right')
    } else {
        timer = setInterval(countdown, 1000);
        isRunning = true;
        playerPause.setAttribute('class','bi-pause')
    }
    
}
document.getElementById('reset').addEventListener('mousedown', () => {
    timeoutId = setTimeout(() => {
        // Ação a ser executada após 1 segundo
        clearInterval(timer);
        audReset.play();
        isRunning = false;
        document.getElementById('timer-label').innerText = 'Working';
        document.getElementById('time-left').innerText = '25:00';
        wheel.style.stroke='#8E672B'
        wheel.style.strokeDashoffset = 0;
        playerPause.setAttribute('class','bi-caret-right')
    }, 1000);
});

document.getElementById('reset').addEventListener('mouseup', () => {
    clearTimeout(timeoutId);
});


function countdown() {
    let timeLeft = document.getElementById('time-left').innerText;
    let [minutes, seconds] = timeLeft.split(':').map(Number);
    let workingSecondToMakePerfectWheel = 0.29352901934623082054703135423616;
    let relaxingSecondToMakePerfectWheel = 1.4715719063545150501672240802676; 
    let beGoodSecondToMakePerfectWheel = 0.48943270300333704115684093437152;
    let alarm = document.getElementById('pomoAlarm')

    if (minutes === 0 && seconds === 0) {
        if (document.getElementById('timer-label').innerText === 'Working') {
            

            if(pointToBeGood === 4){
                document.getElementById('timer-label').innerText = 'Be good';
                timeLeft = '15:00';
                wheel.style.stroke='#518E2B'
                pointToBeGood = 0;
            }else{
                document.getElementById('timer-label').innerText = 'Relaxing';
                timeLeft = '05:00';
                wheel.style.stroke='#2B6A8E'
            }
            pointToBeGood++;
            alarm.play();
            
            
        } else {
            document.getElementById('timer-label').innerText = 'Working';
            timeLeft = '25:00';
            wheel.style.stroke='#8E672B'
            alarm.play();
            
        }
    } else {
        if (seconds === 0) {
            minutes--;
            seconds = 59;           
        } else {
            seconds--;
        }
        let minutesInSeconds = minutes*60;
        let minutesPlusSecond = minutesInSeconds+seconds;
        if(document.getElementById('timer-label').innerText === 'Working'){
            wheel.style.strokeDashoffset = 440-(workingSecondToMakePerfectWheel*minutesPlusSecond);
        }
        if(document.getElementById('timer-label').innerText === 'Relaxing'){
            wheel.style.strokeDashoffset = 440-(relaxingSecondToMakePerfectWheel*minutesPlusSecond);
        }
        if(document.getElementById('timer-label').innerText === 'Be good'){
            wheel.style.strokeDashoffset = 440-(beGoodSecondToMakePerfectWheel*minutesPlusSecond);
        }
        timeLeft = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    document.getElementById('time-left').innerText = timeLeft;
}
