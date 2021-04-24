let canvas, ctx;
let score = 0;
canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

class Ball {
    constructor(x, y, radius, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = speedX
        this.speedY = speedY
    }

    move() {
        this.y += this.speedY;
        this.x += this.speedX;
    }

    setSpeed() {
        if (this.speedX > 0) {
            this.speedX++
        } else {
            this.speedX--
        }
        if (this.speedY > 0) {
            this.speedY++
        } else {
            this.speedY--
        }
    }
}

let ball = new Ball(100, 100, 10, 5, 5);

class Paddle {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isMoveRight = false;
        this.isMoveLeft = false;
        this.speed = speed;
    }
}

let paddle = new Paddle(100, 500, 80, 15, 20);

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = "#1B5E20";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill()
    ctx.closePath();
}

function moveCollision() {
    if (ball.x + ball.radius >= canvas.width || ball.x - ball.radius <= 0) {
        ball.speedX = -ball.speedX;
    }
    if (ball.y - ball.radius <= 0) {
        ball.speedY = -ball.speedY;
    }
    if (ball.y + ball.radius > canvas.height) {
        document.location.reload()
    }

    if (ball.y + ball.radius === paddle.y &&
        ball.x  >= paddle.x && ball.x  <= paddle.x + paddle.width) {
        ball.speedY = -ball.speedY;
        stylePlayer();
        score += 1;
        ball.setSpeed();
    }
}

function stylePlayer() {
    if (paddle.isMoveRight === true && ball.speedX < 0) {
        ball.speedX = -ball.speedX;
    }
    if (paddle.isMoveLeft === true && ball.speedX > 0) {
        ball.speedX = -ball.speedX;
    }
}


//addEventListener keydown,keyup >>> ball move smooth
document.addEventListener('keydown', function (event) {
    if (event.keyCode === 39) {
        paddle.isMoveRight = true;
    } else if (event.keyCode === 37) {
        paddle.isMoveLeft = true;
    }
});
document.addEventListener('keyup', function (event) {
    if (event.keyCode === 39) {
        paddle.isMoveRight = false;
    } else if (event.keyCode === 37) {
        paddle.isMoveLeft = false;
    }
})

function checkPaddle() {
    if (paddle.isMoveLeft === true) {
        paddle.x -= paddle.speed;
    } else if (paddle.isMoveRight === true) {
        paddle.x += paddle.speed
    }

    if (paddle.x < 0) {
        paddle.x = 0;
    } else if (paddle.x + paddle.width > canvas.width) {
        paddle.x = canvas.width - paddle.width;
    }
}

function disPlayScore() {
    document.getElementById('score').innerHTML = 'Score :' + score;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveCollision();
    checkPaddle();
    ball.move();
    drawBall();
    drawPaddle();
    disPlayScore();
}


setInterval('draw()', 20)
