const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');       

canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;

const lineWidth = 6;
const lineHeight = 16;

const ballSize = 20;    
let ballX = cw / 2 - ballSize / 2;      // od 490 do 510 px
let ballY =  ch / 2 - ballSize / 2;     // od 240 do 260 px

let ballSpeedX = 2;
let ballSpeedY = 2;

const paddleHeight = 100;
const paddleWidth = 20;

const playerX = 70;
const aiX = 910;

let playerY = 200;
let aiY = 200;

const topCanvas = canvas.offsetTop;  
function ball() {
    ctx.fillStyle = "white";
    ctx.fillRect(ballX, ballY, ballSize, ballSize);

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY + ballSize >= ch) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballX + ballSize <=0 || ballX >= cw) {
        newBall();
    }

    if (ballX <= playerX + paddleWidth && 
        ballX > playerX + Math.abs(ballSpeedX) && 
        ballY + ballSize >= playerY && 
        ballY <= playerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
        speedUp();
    }

    if (ballX + ballSize >= aiX && 
        ballX + ballSize < aiX + Math.abs(ballSpeedX) && 
        ballY + ballSize >= aiY && 
        ballY <= aiY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
        speedUp();
    }
}

function player() {
    ctx.fillStyle = "lime";
    ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight)
}

function ai() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight);
}

function table() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cw, ch);

    for (let linePosition = 20; linePosition < ch; linePosition += 30) {
        ctx.fillStyle = "grey";
        ctx.fillRect(cw / 2 - lineWidth / 2, linePosition, lineWidth, lineHeight);
    }
}

playerPosition = (e) => {
    playerY = e.clientY - topCanvas - paddleHeight / 2;
    if(playerY > ch - paddleHeight) {
        playerY = ch - paddleHeight;
    }
    if(playerY < 0) {
        playerY = 0;
    }
}

aiPosition = () => {
    const middlePaddle = aiY + paddleHeight / 2;
    const middleBall = ballY + ballSize / 2;

    if(ballX > 500) {
        if (middlePaddle - middleBall > 200) {
            aiY -= 10;
        }
        else if (middlePaddle - middleBall > 50) {
            if (ballSpeedX > 6) { aiY -=10}
            else {aiY -= 5;}
        }
        else if (middlePaddle - middleBall < -200) {
            aiY += 10;
        }
        else if (middlePaddle - middleBall < -50) {
            if (ballSpeedX > 6) { aiY +=10}
            else {aiY += 5;}
        }
    
    }
    else if (ballX <= 500 && ballX > 150) {
        if (middlePaddle - middleBall > 100) {
            aiY -= 2;
        }
        else if (middlePaddle - middleBall < -100) {
            aiY += 2; 
        }
    }
}

function speedUp() {
    console.log(ballSpeedX);
    
    // prędkość X
    if(ballSpeedX > 0 && ballSpeedX < 16) {ballSpeedX += .3;}
    else if(ballSpeedX < 0 && ballSpeedX > -16) {ballSpeedX -= .3;}
    
    // prędkość Y
    if(ballSpeedY > 0 && ballSpeedY < 16) {ballSpeedY += .2;}
    else if(ballSpeedY < 0 && ballSpeedY > -16) {ballSpeedY -= .2;}
}

function newBall() {
    ballX = cw / 2 - ballSize / 2;
    ballY =  ch / 2 - ballSize / 2;
    ballSpeedX = - ballSpeedX / 2;
    ballSpeedY = - ballSpeedY / 2;
}

canvas.addEventListener("mousemove", playerPosition);

function game() {
table();
ball();
player();
ai();
aiPosition();
}
setInterval(game, 1000 / 60);