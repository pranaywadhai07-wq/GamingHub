// ==========================================
// GAMING HUB - MAIN JAVASCRIPT
// ==========================================


// ==========================================
// THEME
// ==========================================

function toggleTheme() {

    document.body.classList.toggle("light");

    const themeBtn = document.getElementById("themeBtn");

    if (document.body.classList.contains("light")) {
        themeBtn.textContent = "☀️";
        localStorage.setItem("theme", "light");
    } else {
        themeBtn.textContent = "🌙";
        localStorage.setItem("theme", "dark");
    }
}


// Load saved theme
if (localStorage.getItem("theme") === "light") {

    document.body.classList.add("light");

    const themeBtn = document.getElementById("themeBtn");

    if (themeBtn) {
        themeBtn.textContent = "☀️";
    }
}


// ==========================================
// FREE FIRE SENSITIVITY
// ==========================================

function calculateSensitivity() {

    const input = document.getElementById("ffSensitivity");

    const result = document.getElementById("sensitivityResult");

    const sensitivity = Number(input.value);

    if (!sensitivity || sensitivity <= 0) {

        result.textContent = "⚠️ Enter a valid sensitivity.";

        return;
    }

    /*
       This is only a calculator.
       It does NOT claim to know the perfect
       sensitivity for your device.
    */

    const recommended = Math.round(sensitivity * 0.85);

    result.innerHTML =
        `Recommended starting point: <strong>${recommended}</strong>`;
}


// ==========================================
// DPI / eDPI CALCULATOR
// ==========================================

function calculateDPI() {

    const dpi = Number(
        document.getElementById("dpi").value
    );

    const sensitivity = Number(
        document.getElementById("mouseSensitivity").value
    );

    const result = document.getElementById("dpiResult");

    if (!dpi || dpi <= 0 || !sensitivity || sensitivity <= 0) {

        result.textContent = "⚠️ Enter valid DPI and sensitivity.";

        return;
    }

    const edpi = dpi * sensitivity;

    result.innerHTML =
        `Your eDPI: <strong>${edpi.toFixed(2)}</strong>`;
}


// ==========================================
// GAMING TIMER
// ==========================================

let timerSeconds = 0;

let timerInterval = null;


function updateTimerDisplay() {

    const hours = Math.floor(timerSeconds / 3600);

    const minutes = Math.floor(
        (timerSeconds % 3600) / 60
    );

    const seconds = timerSeconds % 60;


    const display =
        `${String(hours).padStart(2, "0")}:` +
        `${String(minutes).padStart(2, "0")}:` +
        `${String(seconds).padStart(2, "0")}`;


    document.getElementById("timer").textContent = display;
}


function startTimer() {

    if (timerInterval !== null) {
        return;
    }

    timerInterval = setInterval(() => {

        timerSeconds++;

        updateTimerDisplay();

    }, 1000);
}


function pauseTimer() {

    clearInterval(timerInterval);

    timerInterval = null;
}


function resetTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

    timerSeconds = 0;

    updateTimerDisplay();
}


// ==========================================
// GAMING STATS
// ==========================================

function updateStats() {

    const games = Number(
        document.getElementById("statGames").value
    ) || 0;

    const wins = Number(
        document.getElementById("statWins").value
    ) || 0;

    const kills = Number(
        document.getElementById("statKills").value
    ) || 0;

    const deaths = Number(
        document.getElementById("statDeaths").value
    ) || 0;


    let kd = 0;

    if (deaths > 0) {
        kd = kills / deaths;
    } else if (kills > 0) {
        kd = kills;
    }


    document.getElementById("gamesPlayed").textContent = games;

    document.getElementById("wins").textContent = wins;

    document.getElementById("kills").textContent = kills;

    document.getElementById("kd").textContent =
        kd.toFixed(2);


    // Save stats
    const stats = {
        games,
        wins,
        kills,
        deaths
    };

    localStorage.setItem(
        "gamingStats",
        JSON.stringify(stats)
    );
}


// Load saved stats
function loadStats() {

    const saved =
        localStorage.getItem("gamingStats");

    if (!saved) {
        return;
    }

    const stats = JSON.parse(saved);


    document.getElementById("gamesPlayed").textContent =
        stats.games;

    document.getElementById("wins").textContent =
        stats.wins;

    document.getElementById("kills").textContent =
        stats.kills;


    let kd = 0;

    if (stats.deaths > 0) {
        kd = stats.kills / stats.deaths;
    } else if (stats.kills > 0) {
        kd = stats.kills;
    }

    document.getElementById("kd").textContent =
        kd.toFixed(2);


    document.getElementById("statGames").value =
        stats.games;

    document.getElementById("statWins").value =
        stats.wins;

    document.getElementById("statKills").value =
        stats.kills;

    document.getElementById("statDeaths").value =
        stats.deaths;
}


// ==========================================
// ADD GAME
// ==========================================

function addGame() {

    const input =
        document.getElementById("newGame");

    const name = input.value.trim();


    if (!name) {

        alert("Please enter a game name.");

        return;
    }


    // games.js ke games array me add karo
    addGameToLibrary(name);


    input.value = "";
}


// ==========================================
// START GAMING BUTTON
// ==========================================

function startGaming() {

    document
        .getElementById("sensitivity")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// ==========================================
// REAL BROWSER FPS TEST
// ==========================================

let fpsRunning = false;

let fpsFrames = 0;

let fpsStartTime = 0;

let fpsAnimationId = null;


function startFPS() {

    if (fpsRunning) {
        return;
    }


    fpsRunning = true;

    fpsFrames = 0;

    fpsStartTime = performance.now();


    const fpsValue =
        document.getElementById("fpsValue");

    const fpsStatus =
        document.getElementById("fpsStatus");


    fpsValue.textContent = "-- FPS";

    fpsStatus.textContent =
        "Testing browser rendering...";


    function measureFrame(currentTime) {

        if (!fpsRunning) {
            return;
        }


        fpsFrames++;


        const elapsed =
            currentTime - fpsStartTime;


        /*
           Test for approximately 3 seconds.
        */

        if (elapsed >= 3000) {

            const fps =
                fpsFrames / (elapsed / 1000);


            fpsValue.textContent =
                `${fps.toFixed(1)} FPS`;


            fpsStatus.textContent =
                "✅ Browser FPS test complete";


            fpsRunning = false;

            fpsAnimationId = null;

            return;
        }


        fpsAnimationId =
            requestAnimationFrame(measureFrame);
    }


    fpsAnimationId =
        requestAnimationFrame(measureFrame);
}


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadStats();

        updateTimerDisplay();

    }
);