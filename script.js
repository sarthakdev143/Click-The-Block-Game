document.addEventListener("DOMContentLoaded", () => {
    let score = 0;
    let timer;
    let gameInterval;
    let timerInterval;

    const scoreElement = document.getElementById("score");
    const timerElement = document.getElementById("timer");
    const startButton = document.getElementById("start-button");
    const instructionsButton = document.getElementById("instructions-button");
    const backButton = document.getElementById("back-button");
    const menu = document.getElementById("menu");
    const instructions = document.getElementById("instructions");
    const timerSelect = document.getElementById("timer-select");

    function startGame() {
        const selectedTimer = parseInt(timerSelect.value);
        startButton.classList.add("clicked");
        menu.style.display = "none";
        score = 0;
        timer = selectedTimer;
        scoreElement.textContent = score;
        timerElement.textContent = timer;
        startButton.disabled = true;

        gameInterval = setInterval(spawnSquare, Math.random() * 1000 + 500);
        timerInterval = setInterval(updateTimer, 1000);

        setTimeout(() => {
            clearInterval(gameInterval);
            clearInterval(timerInterval);
            startButton.disabled = false;
            alert("Game Over! Your score is: " + score);
            menu.style.display = "flex";
            startButton.classList.remove("clicked");
        }, timer * 1000);
    }

    function updateTimer() {
        timer--;
        timerElement.textContent = timer;

        if (timer <= 0) {
            clearInterval(gameInterval);
            clearInterval(timerInterval);
            startButton.disabled = false;
        }
    }

    function spawnSquare() {
        const square = document.createElement("div");
        square.className = "square";

        // Set random position
        const x = Math.random() * (window.innerWidth - 3 * 16); // Subtract square size
        const y = Math.random() * (window.innerHeight - 3 * 16);
        square.style.left = `${x}px`;
        square.style.top = `${y}px`;

        // Set random lifetime
        const lifetime = Math.random() * 2000 + 1000; // Between 1 and 3 seconds

        // Remove square after lifetime or if clicked
        const timeoutId = setTimeout(() => {
            square.remove();
        }, lifetime);

        square.addEventListener("click", () => {
            clearTimeout(timeoutId);
            square.remove();
            score++;
            scoreElement.textContent = score;
        });

        document.querySelector("main").appendChild(square);
    }

    function showInstructions() {
        menu.style.display = "none";
        instructions.style.display = "flex";
    }

    function backToMenu() {
        instructions.style.display = "none";
        menu.style.display = "flex";
    }

    startButton.addEventListener("click", startGame);
    instructionsButton.addEventListener("click", showInstructions);
    backButton.addEventListener("click", backToMenu);
});
