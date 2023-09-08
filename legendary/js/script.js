const gameBoard = document.querySelector(".game-board");
const gridSize = 20;
const snakeSpeed = 150; // Millisekunteina

let snake = [{ x: 10, y: 10 }];
let nextDirection = "right";
let food = { x: 5, y: 5 };

function createGrid() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = `cell-${i}-${j}`;
            gameBoard.appendChild(cell);
        }
    }
}

function drawSnake() {
    snake.forEach(segment => {
        const cell = document.getElementById(`cell-${segment.x}-${segment.y}`);
        cell.classList.add("snake");
    });
}

function drawFood() {
    const cell = document.getElementById(`cell-${food.x}-${food.y}`);
    cell.classList.add("food");
}

function update() {
    const head = Object.assign({}, snake[0]); // Kopioidaan p‰‰n koordinaatit

    // P‰ivitet‰‰n liikkumisen suunta
    direction = nextDirection;

    // P‰ivitet‰‰n p‰‰n sijainti liikkumisen suunnan perusteella
    switch (direction) {
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;
        case "left":
            head.x--;
            break;
        case "right":
            head.x++;
            break;
    }

    // Lis‰t‰‰n uusi p‰‰ matoon
    snake.unshift(head);

    // Tarkistetaan, osutaanko ruokaan
    if (head.x === food.x && head.y === food.y) {
        // Generoidaan uusi ruoka satunnaisesti
        food.x = Math.floor(Math.random() * gridSize);
        food.y = Math.floor(Math.random() * gridSize);
    } else {
        // Poistetaan viimeinen osa matosta, jos ei osuttu ruokaan
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];

    // Tarkistetaan, osutaanko sein‰‰n
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
        clearInterval(gameInterval);
        alert("Peli p‰‰ttyi! Tˆrm‰sit sein‰‰n.");
    }

    // Tarkistetaan, osutaanko omaan h‰nt‰‰n
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            clearInterval(gameInterval);
            alert("Peli p‰‰ttyi! Tˆrm‰sit omaan h‰nt‰‰n.");
        }
    }
}

function gameLoop() {
    update();
    checkCollision();
    // Poistetaan kaikki solut pelilaudalta ja piirret‰‰n uudestaan
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.className = "cell";
    });
    drawSnake();
    drawFood();
}

createGrid();
const gameInterval = setInterval(gameLoop, snakeSpeed);

document.addEventListener("keydown", (event) => {
    switch (event.code) {
        case "KeyW":
            nextDirection = "left";
            break;
        case "KeyS":
            nextDirection = "right";
            break;
        case "KeyA":
            nextDirection = "up";
            break;
        case "KeyD":
            nextDirection = "down";
            break;
    }
});










