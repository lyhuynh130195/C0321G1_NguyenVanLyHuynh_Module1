let canvas, ctx;
let score=0;
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


    moveCollision() {
        if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
            this.speedX = -this.speedX;
        }
        if (this.y - this.radius <= 0) {
            this.speedY = -this.speedY;
        }
        if (this.y + this.radius > paddle.y + paddle.height) {
            document.location.reload()
        }
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill()
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

    drawPaddle() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#1B5E20";
        ctx.fill();
        ctx.closePath();
    }

}

let paddle = new Paddle(100, 500, 80, 15, 25);
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

function checkBallAndPaddle() {
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
    if (ball.y + ball.radius > paddle.y - paddle.height &&
        ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
        ball.speedY = -ball.speedY;
        score+=1;
    }
    if(ball.x===canvas.width&&ball.y===paddle.y-paddle.height){
        ball.speedX=-ball.speedX;
        ball.speedY=-ball.speedY;
    }
    if(ball.x===canvas.width-canvas.width&&ball.y===paddle.y-paddle.height){
        ball.speedX=-ball.speedX;
        ball.speedY=-ball.speedY;
    }
}

function disPlayScore() {
    if (ball.y + ball.radius == paddle.y - paddle.height &&
        ball.x >= paddle.x && ball.x <= paddle.x + paddle.width) {
        score += 1;
        if(score>20){
            ball.speedX=10;
            ball.speedY=10;
        }
        document.getElementById('score').innerHTML='Score :'+score;
    }
}

function upDate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw();
    paddle.drawPaddle();
    ball.move();
    ball.moveCollision();
    checkBallAndPaddle();
    disPlayScore();
}


setInterval('upDate()', 23)
