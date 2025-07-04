let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG () {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha () {
    for(let i = 0; i < snake.length; i++) {
        let grad = context.createLinearGradient(snake[i].x, snake[i].y, snake[i].x + box, snake[i].y + box);
        grad.addColorStop(0, "#3fcf3f");
        grad.addColorStop(1, "#2b8f2b");

        context.fillStyle = grad;
        context.fillRect(snake[i].x, snake[i].y, box, box);

        context.strokeStyle = "#1e5f1e";
        context.strokeRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    context.beginPath();
    context.fillStyle = "#ff4747";
    context.arc(food.x + box / 2, food.y + box / 2, box / 2.5, 0, 2 * Math.PI);
    context.fill();
    context.strokeStyle = "#b30000";
    context.stroke();
}

document.addEventListener('keydown', update);

function update (event) {
    if(event.keyCode === 37 && direction !== "right") direction = "left";
    if(event.keyCode === 38 && direction !== "down") direction = "up";
    if(event.keyCode === 39 && direction !== "left") direction = "right";
    if(event.keyCode === 40 && direction !== "up") direction = "down";
}


function iniciarJogo () {
    if(snake[0].x > 15 * box && direction === "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction === "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction === "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction === "up") snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++) {
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            clearInterval(jogo);
            window.alert('GAME OVER :(')
        }
    }

    criarBG ();
    criarCobrinha ();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction === "right") snakeX += box;
    if(direction === "left") snakeX -= box;
    if(direction === "up") snakeY -= box;
    if(direction === "down") snakeY += box;

    if(snakeX !== food.x || snakeY !== food.y) {
        snake.pop();
    } else {food.x = Math.floor(Math.random() * 15 + 1) * box;
            food.y = Math.floor(Math.random() * 15 + 1) * box;

    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}


let jogo = setInterval(iniciarJogo, 100);
