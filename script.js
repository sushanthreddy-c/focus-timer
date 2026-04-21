let timer = null;

// ✅ Load saved time or default 25 min
let time = localStorage.getItem("time")
    ? parseInt(localStorage.getItem("time"))
    : 1500;

// ✅ Load study time
let studyMinutes = localStorage.getItem("studyTime")
    ? parseInt(localStorage.getItem("studyTime"))
    : 0;

// ✅ Load running state
let isRunning = localStorage.getItem("isRunning") === "true";

// Update UI initially
document.getElementById("studyTime").innerText = studyMinutes;

function updateDisplay() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    document.getElementById("timer").innerText =
        minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

    // ✅ Update progress bar
    let progress = ((1500 - time) / 1500) * 100;
    document.getElementById("progressBar").style.width = progress + "%";
}

function startTimer() {
    if (timer) return;

    localStorage.setItem("isRunning", true);

    timer = setInterval(() => {
        if (time > 0) {
            time--;

            // ✅ Save remaining time
            localStorage.setItem("time", time);

            let currentSession = Math.floor((1500 - time) / 60);
            document.getElementById("studyTime").innerText = studyMinutes + currentSession;

            updateDisplay();
        } else {
            clearInterval(timer);
            timer = null;

            alert("Time's up!");

            studyMinutes += 25;
            localStorage.setItem("studyTime", studyMinutes);

            localStorage.setItem("isRunning", false);
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    timer = null;

    localStorage.setItem("isRunning", false);
}

function resetTimer() {
    clearInterval(timer);
    timer = null;

    time = 1500;
    studyMinutes = 0;

    // ✅ Clear storage
    localStorage.setItem("time", time);
    localStorage.setItem("studyTime", studyMinutes);
    localStorage.setItem("isRunning", false);

    document.getElementById("studyTime").innerText = studyMinutes;
    document.getElementById("progressBar").style.width = "0%";

    updateDisplay();
}

// ✅ Restore state on refresh
updateDisplay();

if (isRunning) {
    startTimer();
}