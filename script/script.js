let isRunning = false;
let timer;
let cicle = document.getElementById('cicleTime')
let pointToBeGood = 0;

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    } else {
        timer = setInterval(countdown, 1000);
        isRunning = true;
    }
    
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    document.getElementById('timer-label').innerText = 'Working';
    document.getElementById('time-left').innerText = '25:00';
    cicle.style.stroke='#8E672B'
    cicle.style.strokeDashoffset = 0;
}

function countdown() {
    let timeLeft = document.getElementById('time-left').innerText;
    let [minutes, seconds] = timeLeft.split(':').map(Number);
    

    if (minutes === 0 && seconds === 0) {
        if (document.getElementById('timer-label').innerText === 'Working') {
            

            if(pointToBeGood === 4){
                document.getElementById('timer-label').innerText = 'Be good';
                timeLeft = '15:00';
                cicle.style.stroke='#518E2B'
                pointToBeGood = 0;
            }else{
                document.getElementById('timer-label').innerText = 'Relaxing';
                timeLeft = '05:00';
                cicle.style.stroke='#2B6A8E'
            }
            pointToBeGood++;
            console.log(pointToBeGood);

            
            
        } else {
            document.getElementById('timer-label').innerText = 'Working';
            timeLeft = '25:00';
            cicle.style.stroke='#8E672B'
            
            
        }
    } else {
        if (seconds === 0) {
            minutes--;
            seconds = 59;           
        } else {
            seconds--;
        }
        if(document.getElementById('timer-label').innerText === 'Working'){
            cicle.style.strokeDashoffset = 440-(17.6*minutes);
        }
        if(document.getElementById('timer-label').innerText === 'Relaxing'){
            cicle.style.strokeDashoffset = 440-(88*minutes);
        }
        if(document.getElementById('timer-label').innerText === 'Be good'){
            cicle.style.strokeDashoffset = 440-(29.3*minutes);
        }
        timeLeft = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    document.getElementById('time-left').innerText = timeLeft;
}
