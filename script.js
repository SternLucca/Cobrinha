const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const audio = new Audio('audio.mp3');
const death = new Audio('death.mp3');
const sizeButtons = document.querySelector(".sizes");
const smallButton = document.getElementById("small");
const mediumButton = document.getElementById("medium");
const largeButton = document.getElementById("large");
const score = document.querySelector(".score--value");
const finalScore = document.getElementById("scoreF");
const highScore = document.getElementById("high");
const menu = document.querySelector(".menu-screen");
const buttonPlay = document.querySelector(".btn-play");
const gear = document.getElementById("gear");
const config = document.querySelector(".configScreen");
const close = document.getElementById("close");
const red = document.getElementById("red");
const blue = document.getElementById("blue");
const green = document.getElementById("green");
const yellow = document.getElementById("yellow");
const white = document.getElementById("white");
const pink = document.getElementById("pink");
const slow = document.getElementById("slow");
const fast = document.getElementById("fast");
const mediumSpeed = document.getElementById("mediumSpeed");
const smallBoard = document.getElementById("smallBoard");
const mediumBoard = document.getElementById("mediumBoard");
const largeBoard = document.getElementById("largeBoard");
const cima = document.getElementById("cima");
const esquerda = document.getElementById("esquerda");
const direita = document.getElementById("direita");
const baixo = document.getElementById("baixo");
const setas = document.querySelector(".setas");
const toggle = document.querySelector(".toggleButton");
const circle = document.querySelector(".circle");
let initialSize = 30;
let size = 30;
let initialPosition = {x: size*4, y:size*4};
let snake = [initialPosition];
let snakeColor = "#ddd";
let speed = 100;
let toggleNum = 2;
const incrementScore = () => {
    score.innerText = +score.innerText + 1;
};
const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
};
const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size);
    return Math.round(number/size)*size;
};
const randomColor = () => {
    const red = randomNumber(0, 255);
    const green = randomNumber(0, 255);
    const blue = randomNumber(0, 255);
    return `rgb(${red}, ${green}, ${blue})`
};
let food = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor()
};
let direction, initialDirection, loopID;
const drawFood = () => {
    const {x, y, color} = food;
    ctx.shadowColor = color;
    ctx.shadowBlur = 20;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
    ctx.shadowBlur = 0;
};
const drawSnake = () => {
    ctx.fillStyle = snakeColor;
    snake.forEach((position, index) =>{
        if (index == snake.length-1) {
            ctx.fillStyle = "white";
        }
        ctx.fillRect(position.x, position.y, size, size);
    });
};
const moveSnake = () => {
    if (!direction) return;
    const head = snake[snake.length-1];
    if (direction == "right"){
        snake.push({x:head.x + size, y:head.y});
    }
    if (direction == "left"){
        snake.push({x:head.x - size, y:head.y});
    }
    if (direction == "up"){
        snake.push({x:head.x, y:head.y - size});
    }
    if (direction == "down"){
        snake.push({x:head.x, y:head.y + size});
    }
    snake.shift();
};
const drawGrid = () => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#707070";
    for (let i = size; i < canvas.width; i += size) {
    ctx.beginPath();
    ctx.lineTo(i, 0);
    ctx.lineTo(i, 600);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineTo(0, i);
    ctx.lineTo(600, i);
    ctx.stroke();
    }
};
const chackEat = () => {
    const head = snake[snake.length-1];
    if (head.x == food.x && head.y == food.y){
        incrementScore();
        snake.push(head);
        audio.play();
        let x = randomPosition();
        let y = randomPosition();
        while (snake.find((position) => position.x == x && position.y == y)) {
            x = randomPosition();
            y = randomPosition();
        }
        food.x = x;
        food.y = y;
        food.color = randomColor();
    }
};
const checkCollision = () => {
    const head = snake[snake.length - 1];
    const canvasLimit = canvas.width - size;
    const neckIndex =snake.length - 2;
    const wallCollision = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit;
    const selfCollision = snake.find((position, index)=> {
        return index < neckIndex && position.x == head.x && position.y == head.y;
    });
    if (wallCollision || selfCollision){
        gameOver();
    }
};
const gameOver = () => {
    direction = undefined;
    menu.style.display = "flex";
    finalScore.innerHTML = score.innerHTML;
    if (parseInt(score.innerHTML) > parseInt(highScore.innerHTML)) {
        highScore.innerHTML = finalScore.innerHTML;
    }
    canvas.style.filter = "blur(10px)";
    sizeButtons.style.filter = "blur(10px)";
    setas.style.filter = "blur(10px)";
};
const directionChange = () => {
    if (initialDirection != direction){
        initialDirection = direction;
        if (direction == "up"){
            cima.classList.add("cimaA");
            setTimeout(() => {
                cima.classList.remove("cimaA");
            }, 300);
        }
        if (direction == "left"){
            esquerda.classList.add("esquerdaA");
            setTimeout(() => {
                esquerda.classList.remove("esquerdaA");
            }, 300);
        }
        if (direction == "right"){
            direita.classList.add("direitaA");
            setTimeout(() => {
                direita.classList.remove("direitaA");
            }, 300);
        }
        if (direction == "down"){
            baixo.classList.add("baixoA");
            setTimeout(() => {
                baixo.classList.remove("baixoA");
            }, 300);
        }
    }
};
const gameLoop = () => {
    if (size == 30){
        smallButton.style.background = "rgba(0, 0, 0, 0.6)";
        mediumButton.style.background = "rgba(0, 0, 0, 0.4)";
        largeButton.style.background = "rgba(0, 0, 0, 0.4)";
    }
    if (size == 40){
        mediumButton.style.background = "rgba(0, 0, 0, 0.6)";
        largeButton.style.background = "rgba(0, 0, 0, 0.4)";
        smallButton.style.background = "rgba(0, 0, 0, 0.4)";
    }
    if (size == 50){
        largeButton.style.background = "rgba(0, 0, 0, 0.6)";
        smallButton.style.background = "rgba(0, 0, 0, 0.4)";
        mediumButton.style.background = "rgba(0, 0, 0, 0.4)";
    }
    if (size != initialSize){
        initialSize = size;
        initialPosition = {x: size*4, y:size*4};
        snake = [initialPosition];
        food.x = randomPosition();
        food.y = randomPosition();
    }
    clearInterval(loopID);
    ctx.clearRect(0, 0, canvas.width, canvas.width);
    drawGrid();
    drawFood();
    moveSnake();
    drawSnake();
    chackEat();
    directionChange();
    checkCollision();
    loopID = setTimeout(() => {
        gameLoop();
    }, speed);
};
gameLoop();
function onlyPink () {
    pink.style.borderColor = "green";
    white.style.borderColor = "rgba(0, 0, 0, 0)";
    green.style.borderColor = "rgba(0, 0, 0, 0)";
    blue.style.borderColor = "rgba(0, 0, 0, 0)";  
    yellow.style.borderColor = "rgba(0, 0, 0, 0)"; 
    red.style.borderColor = "rgba(0, 0, 0, 0)";  
}
function onlyWhite () {
    pink.style.borderColor = "rgba(0, 0, 0, 0)";
    white.style.borderColor = "green";
    green.style.borderColor = "rgba(0, 0, 0, 0)";
    blue.style.borderColor = "rgba(0, 0, 0, 0)";  
    yellow.style.borderColor = "rgba(0, 0, 0, 0)"; 
    red.style.borderColor = "rgba(0, 0, 0, 0)";  
}
function onlyGreen () {
    pink.style.borderColor = "rgba(0, 0, 0, 0)";
    white.style.borderColor = "rgba(0, 0, 0, 0)";
    green.style.borderColor = "green";
    blue.style.borderColor = "rgba(0, 0, 0, 0)";  
    yellow.style.borderColor = "rgba(0, 0, 0, 0)"; 
    red.style.borderColor = "rgba(0, 0, 0, 0)";  
}
function onlyBlue () {
    pink.style.borderColor = "rgba(0, 0, 0, 0)";
    white.style.borderColor = "rgba(0, 0, 0, 0)";
    green.style.borderColor = "rgba(0, 0, 0, 0)";
    blue.style.borderColor = "green";  
    yellow.style.borderColor = "rgba(0, 0, 0, 0)"; 
    red.style.borderColor = "rgba(0, 0, 0, 0)";  
}
function onlyYellow () {
    pink.style.borderColor = "rgba(0, 0, 0, 0)";
    white.style.borderColor = "rgba(0, 0, 0, 0)";
    green.style.borderColor = "rgba(0, 0, 0, 0)";
    blue.style.borderColor = "rgba(0, 0, 0, 0)";  
    yellow.style.borderColor = "green"; 
    red.style.borderColor = "rgba(0, 0, 0, 0)";  
}
function onlyRed () {
    pink.style.borderColor = "rgba(0, 0, 0, 0)";
    white.style.borderColor = "rgba(0, 0, 0, 0)";
    green.style.borderColor = "rgba(0, 0, 0, 0)";
    blue.style.borderColor = "rgba(0, 0, 0, 0)";  
    yellow.style.borderColor = "rgba(0, 0, 0, 0)"; 
    red.style.borderColor = "green";  
}
document.addEventListener("keydown", ({key}) => {
    if (key == "ArrowRight" && direction != "left") {
        direction = "right";
    }
    if (key == "d" && direction != "left") {
        direction = "right";
    }
    if (key == "ArrowLeft" && direction != "right") {
        direction = "left";
    }
    if (key == "a" && direction != "right") {
        direction = "left";
    }
    if (key == "ArrowUp" && direction != "down") {
        direction = "up";
    }
    if (key == "w" && direction != "down") {
        direction = "up";
    }
    if (key == "ArrowDown" && direction != "up") {
        direction = "down";
    }
    if (key == "s" && direction != "up") {
        direction = "down";
    }
});
buttonPlay.addEventListener("click", () => {
    score.innerText = "0";
    menu.style.display = "none";
    canvas.style.filter = "none";
    sizeButtons.style.filter = "none";
    setas.style.filter = "none";
    snake = [initialPosition];
});
mediumButton.addEventListener("click", () =>{
    console.log("medium");
    size = 40;
});
largeButton.addEventListener("click", () =>{
    console.log("large");
    size = 50;
});
smallButton.addEventListener("click", () =>{
    console.log("small");
    size = 30;
});
gear.addEventListener("click", () => {
    config.style.display = "flex";
    canvas.style.filter = "blur(10px)";
    sizeButtons.style.filter = "blur(10px)";
    setas.style.filter = "blur(10px)";
});
close.addEventListener("click", () => {
    config.style.display = "none";
    canvas.style.filter = "none";
    sizeButtons.style.filter = "none";
    setas.style.filter = "none";
});
red.addEventListener("click", () => {
    snakeColor = "rgb(255, 75, 75)";
    onlyRed();
});
yellow.addEventListener("click", () => {
    snakeColor = "yellow";
    onlyYellow();
});
blue.addEventListener("click", () => {
    snakeColor = "lightblue";
    onlyBlue();
});
green.addEventListener("click", () => {
    snakeColor = "greenyellow";
    onlyGreen();
});
white.addEventListener("click", () => {
    snakeColor = "#ddd";
    onlyWhite();
});
pink.addEventListener("click", () => {
    snakeColor = "rgb(255, 0, 255)";
    onlyPink();
});
slow.addEventListener("click", () => {
    speed = 150;
    slow.style.background = "rgba(0, 0, 0, 0.6)";
    fast.style.background = "rgba(0, 0, 0, 0.4)";
    mediumSpeed.style.background = "rgba(0, 0, 0, 0.4)";
});
mediumSpeed.addEventListener("click", () => {
    speed = 100;
    slow.style.background = "rgba(0, 0, 0, 0.4)";
    fast.style.background = "rgba(0, 0, 0, 0.4)";
    mediumSpeed.style.background = "rgba(0, 0, 0, 0.6)";
});
fast.addEventListener("click", () => {
    speed = 50;
    slow.style.background = "rgba(0, 0, 0, 0.4)";
    fast.style.background = "rgba(0, 0, 0, 0.6)";
    mediumSpeed.style.background = "rgba(0, 0, 0, 0.4)";
});
mediumBoard.addEventListener("click", () => {
    canvas.style.width = "500px";
    smallBoard.style.background = "rgba(0, 0, 0, 0.4)";
    mediumBoard.style.background = "rgba(0, 0, 0, 0.6)";
    largeBoard.style.background = "rgba(0, 0, 0, 0.4)";
});
largeBoard.addEventListener("click", () => {
    canvas.style.width = "600px";
    smallBoard.style.background = "rgba(0, 0, 0, 0.4)";
    mediumBoard.style.background = "rgba(0, 0, 0, 0.4)";
    largeBoard.style.background = "rgba(0, 0, 0, 0.6)";
});
smallBoard.addEventListener("click", () => {
    canvas.style.width = "400px";
    smallBoard.style.background = "rgba(0, 0, 0, 0.6)";
    mediumBoard.style.background = "rgba(0, 0, 0, 0.4)";
    largeBoard.style.background = "rgba(0, 0, 0, 0.4)";
});
cima.addEventListener("click", () => {
    direction = "up";
});
esquerda.addEventListener("click", () => {
    direction = "left";
});
direita.addEventListener("click", () => {
    direction = "right";
});
baixo.addEventListener("click", () => {
    direction = "down";
});
toggle.addEventListener("click", () => {
    if (toggleNum == 0) {
    circle.classList.remove("toggleA2");
    toggle.classList.remove("colorA2");
    circle.classList.add("toggleA1");
    toggle.classList.add("colorA1");
    setas.style.display = "none";
    toggleNum = 1;
    }else if (toggleNum == 2) {
    circle.classList.add("toggleA1");
    toggle.classList.add("colorA1");
    setas.style.display = "none";
    toggleNum = 1;
    }else if (toggleNum == 1){
    circle.classList.remove("toggleA1");
    toggle.classList.remove("colorA1");
    circle.classList.add("toggleA2");
    toggle.classList.add("colorA2");
    setas.style.display = "flex";
    toggleNum = 0;
    }
});