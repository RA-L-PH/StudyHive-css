var socket = io({autoConnect = true});
        
        let username = document.getElementById("username").value;

        socket.on("connect", function() {
            socket.emit("user_join", username);
        })
            

        document.getElementById("chat").style.display = "block";
        document.getElementById("landing").style.display = "none";

        
        

        document.getElementById("message").addEventListener("keyup", function (event) {
            if (event.key == "Enter") {
                let message = document.getElementById("message").value;
                socket.emit("new_message", message);
                document.getElementById("message").value = "";
            }
        });

        socket.on("chat", function(data) {
            let ul = document.getElementById("chat-messages");
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(data["username"] + ": " + data["message"]));
            ul.appendChild(li);
            ul.scrolltop = ul.scrollHeight;

                
const timerElement = document.getElementById("timer");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const updateIntervalsButton = document.getElementById("update-intervals-button");
const workTimeInput = document.getElementById("work-time");
const shortBreakTimeInput = document.getElementById("short-break-time");
const longBreakTimeInput = document.getElementById("long-break-time");

let timeRemaining = timerElement.dataset.time;
let timerInterval;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function updateTimerDisplay() {
    timerElement.textContent = formatTime(timeRemaining);
}

// Event listener for start button
startButton.addEventListener('click', () => {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            if (timeRemaining > 0) {
                timeRemaining--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                timerInterval = null;
                // Handle timer completion
                alert("Pomodoro session over successfully!");
            }
        }, 1000);
    }
});
// Event listener for reset button
resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    timeRemaining = parseInt(workTimeInput.value) * 60; // Reset to work time
    updateTimerDisplay();
});
// Event listener for update intervals button
updateIntervalsButton.addEventListener('click', () => {
    timeRemaining = parseInt(workTimeInput.value) * 60;
    resetButton.click();
});

updateTimerDisplay();
