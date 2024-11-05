let homeScore = 0;
let guestScore = 0;
let timerMinutes = 20; // Set the timer to 20 minutes
let timerSeconds = 0;
let timerInterval;
let isPaused = false;

document.getElementById('add1').addEventListener('click', function() {
    addPoints('home', 1);
});

document.getElementById('add2').addEventListener('click', function() {
    addPoints('home', 2);
});

document.getElementById('add3').addEventListener('click', function() {
    addPoints('home', 3);
});

document.getElementById('add1b').addEventListener('click', function() {
    addPoints('guest', 1);
});

document.getElementById('add2b').addEventListener('click', function() {
    addPoints('guest', 2);
});

document.getElementById('add3b').addEventListener('click', function() {
    addPoints('guest', 3);
});

document.getElementById('newGame').addEventListener('click', function() {
    resetGame();
});

document.getElementById('pauseTimer').addEventListener('click', () => {
    isPaused = !isPaused;
    document.getElementById('pauseTimer').textContent = isPaused ? 'Resume Timer' : 'Pause Timer';
});

function addPoints(team, points) {
    if (team === 'home') {
        homeScore += points;
        document.getElementById('homeScore').innerText = homeScore;
    } else if (team === 'guest') {
        guestScore += points;
        document.getElementById('guestScore').innerText = guestScore;
    }
}

function resetGame() {
    homeScore = 0;
    guestScore = 0;
    timerMinutes = 20; // Set the timer to 20 minutes
    timerSeconds = 0;
    document.getElementById('homeScore').innerText = homeScore;
    document.getElementById('guestScore').innerText = guestScore;
    document.getElementById('timer').innerText = formatTime(timerMinutes, timerSeconds);
    document.getElementById('winnerText').innerText = '';
    clearInterval(timerInterval);
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(function() {
        if (!isPaused) {
            if (timerSeconds === 0) {
                if (timerMinutes === 0) {
                    clearInterval(timerInterval);
                    determineWinner();
                    return;
                } else {
                    timerMinutes--;
                    timerSeconds = 59;
                }
            } else {
                timerSeconds--;
            }
            document.getElementById('timer').innerText = formatTime(timerMinutes, timerSeconds);
        }
    }, 1000);
}

function formatTime(minutes, seconds) {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function determineWinner() {
    let winnerText = '';
    if (homeScore > guestScore) {
        winnerText = 'Home wins!';
    } else if (guestScore > homeScore) {
        winnerText = 'Guest wins!';
    } else {
        winnerText = 'It\'s a tie!';
    }
    document.getElementById('winnerText').innerText = winnerText;
}

startTimer();