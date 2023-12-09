let allCir = document.querySelectorAll('.bi-circle-fill');
let wheel = document.getElementById('wheelTime');
let playerPause = document.getElementById('playerPause');
let audReset = document.getElementById('audReset');
let audStartStop = document.getElementById('audStartStop');
let audSkip = document.getElementById('audSkip');
let sidebar = document.getElementById('sidebar');
let expAction = document.getElementById('exp-action');
let isRunning = false;
let pointForLongRest = 0;
let CirRoll = 0;
let timeoutId;
let timer;

function startStop() {
    audStartStop.play();
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        playerPause.setAttribute('class','bi-caret-right');
    } else {
        timer = setInterval(countdown, 1000);
        isRunning = true;
        playerPause.setAttribute('class','bi-pause');
    }    
}

// Reset action to be performed after 1 second
document.getElementById('reset').addEventListener('mousedown', () => {
    timeoutId = setTimeout(() => {
        clearInterval(timer);
        audReset.play();
        isRunning = false;
        document.getElementById('timer-label').innerText = 'Working';
        document.getElementById('time-left').innerText = '25:00';
        wheel.style.stroke='#8E672B'
        wheel.style.strokeDashoffset = 0;
        playerPause.setAttribute('class','bi-caret-right')
        //Clear all Cir and reset
        CirRoll = 0;
        for(let i=0;i<4;i++){
            allCir[i].style.color='#ffffff77';
        }
    }, 1000);
});

// Do not execute if aborted before 1 second
document.getElementById('reset').addEventListener('mouseup', () => {
    clearTimeout(timeoutId);
});

function skip(){
    playerPause.setAttribute('class','bi-skip-end');
    audSkip.play()
    playerPause.style.transition = '.5s'
    document.getElementById('time-left').innerText = '00:00';
}

function countdown() {
    let timeLeft = document.getElementById('time-left').innerText;
    let audAlarm = document.getElementById('pomoAlarm')
    let [minutes, seconds] = timeLeft.split(':').map(Number);

    // When you multiply this value with the minutes converted into seconds plus the seconds, 
    // based on the longest possible minute, for example: 25 min, 15 min or 05 min, you get 440, 
    // which is the value needed to make the complete wheel cycle
    let workingSecondToMakePerfectWheel = 0.29352901934623082054703135423616;
    let relaxingSecondToMakePerfectWheel = 1.4715719063545150501672240802676; 
    let longRestSecondToMakePerfectWheel = 0.48943270300333704115684093437152;
    
    playerPause.setAttribute('class','bi-pause')  
    if (minutes === 0 && seconds === 0) {
        if (document.getElementById('timer-label').innerText === 'Working') {    
            if(pointForLongRest === 4){
                document.getElementById('timer-label').innerText = 'Enjoy and rest';
                timeLeft = '15:00';
                wheel.style.stroke='#518E2B'
                
                // reset the long rest indicator balls
                for(let i=0;i<4;i++){
                    allCir[i].style.color='#ffffff77';
                }
                pointForLongRest=0
                CirRoll = 0          
            }else{
                // short rest
                document.getElementById('timer-label').innerText = 'Relaxing';
                timeLeft = '05:00';
                wheel.style.stroke='#2B6A8E'
                allCir[CirRoll].style.color='#ffffff';
                CirRoll++
                pointForLongRest++;
            }
            audAlarm.play();
        } else {
            document.getElementById('timer-label').innerText = 'Working';
            timeLeft = '25:00';
            wheel.style.stroke='#8E672B'
            audAlarm.play();
            
        }
    } else {
        // decrements minutes and seconds
        if (seconds === 0) {
            minutes--;
            seconds = 59;           
        } else {
            seconds--;
        }
        let minutesInSeconds = minutes*60; 
        let minutesPlusSecond = minutesInSeconds+seconds;
        
        // changing the time wheel based on minutes and seconds
        if(document.getElementById('timer-label').innerText === 'Working'){
            wheel.style.strokeDashoffset = 440-(workingSecondToMakePerfectWheel*minutesPlusSecond);
        }
        if(document.getElementById('timer-label').innerText === 'Relaxing'){
            wheel.style.strokeDashoffset = 440-(relaxingSecondToMakePerfectWheel*minutesPlusSecond);
        }
        if(document.getElementById('timer-label').innerText === 'Enjoy and rest'){
            wheel.style.strokeDashoffset = 440-(longRestSecondToMakePerfectWheel*minutesPlusSecond);
        }
        timeLeft = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    document.getElementById('time-left').innerText = timeLeft;
}
//Makes the hamburger menu work
let hamburgerOn = false;
function actionHamburger(){
    if(hamburgerOn === false){
        sidebar.setAttribute('class','action');
        expAction.setAttribute('class','bi-x-lg');
        hamburgerOn = true;
        
    }else{
        sidebar.setAttribute('class','off');
        expAction.setAttribute('class','bi-list');
        hamburgerOn = false;
    }
    
}