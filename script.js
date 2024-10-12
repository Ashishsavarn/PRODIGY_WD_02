let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById("display");
const lapsDiv = document.getElementById("laps");

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateDisplay, 100);
        running = true;
    }
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    display.innerHTML = 
        (hours < 10 ? "0" + hours : hours) + ":" + 
        (minutes < 10 ? "0" + minutes : minutes) + ":" + 
        (seconds < 10 ? "0" + seconds : seconds);
}

function pauseTimer() {
    clearInterval(tInterval);
    running = false;
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00";
    lapsDiv.innerHTML = "";
    lapCount = 0;
}

function recordLap() {
    if (running) {
        lapCount++;
        const lapTime = display.innerHTML;
        const lapItem = document.createElement("div");
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapsDiv.appendChild(lapItem);
    }
}

document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("pauseBtn").addEventListener("click", pauseTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);
document.getElementById("lapBtn").addEventListener("click", recordLap);
