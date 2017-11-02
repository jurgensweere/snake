var canvas = document.getElementById('snake');
var ctx = canvas.getContext('2d');

var gameInterval;

const SIZE = 20;

var nvx = vx = 1
var nvy = vy = 0;
var px, py;
var trail = [];
var trailLength = 5;
var ax, ay;
var highScore = score = 0;

background();

function game() {
    vx = nvx; vy = nvy;
    background();

    ctx.fillStyle = 'red';
    ctx.fillRect(ax * SIZE, ay * SIZE, SIZE -1, SIZE -1);

    ctx.fillStyle = 'black';
    for (var i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * SIZE, trail[i].y * SIZE, SIZE -1, SIZE -1);
    }

    // eat apple
    if (ax == px && ay == py) {
        newApple();
        trailLength ++;
        score ++;
        if (score > highScore) {
            highScore = score;
        }
        updateScore();
    }

    // Move
    px += vx; py += vy;
    if (px >= canvas.width/SIZE) px = 0;
    if (py >= canvas.height/SIZE) py = 0;
    if (px < 0) px = canvas.width/SIZE;
    if (py < 0) py = canvas.height/SIZE;

    // death
    for (var i = 0; i < trail.length; i++) {
        if (trail[i].x == px && trail[i].y == py) {
            death();
            break;
        }
    }

    trail.push({x: px, y: py});
    if (trail.length > trailLength) {
        trail.shift();
    }
}

function startGame() {
    trail = [];
    trailLength = 5;
    score = 0;
    startPos();
    newApple();
    updateScore();
    gameInterval = setInterval(game, 1000/15);
}

function startPos() {
    px = Math.floor(canvas.width/2/SIZE);
    py = Math.floor(canvas.height/2/SIZE);
}

function death() {
    clearInterval(gameInterval);

    ctx.fillStyle = 'red';
    ctx.font = '32px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);

    document.getElementById('start').disabled = false;
}

function newApple() {
    ax = Math.floor(Math.random() * canvas.width / SIZE);
    ay = Math.floor(Math.random() * canvas.height / SIZE);
}

function background() {
    ctx.fillStyle = 'rgb(250, 250, 250)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function updateScore() {
    document.getElementById('score').textContent = score;
    document.getElementById('highscore').textContent = highScore;
}

document.getElementById('start').addEventListener('click', function() {
    startGame();
    document.getElementById('start').disabled = true;
});

document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowRight':
            if (vx == -1) break;
            nvx = 1; nvy = 0;
            break;
        case 'ArrowLeft':
            if (vx == 1) break;
            nvx = -1; nvy = 0;
            break;
        case 'ArrowUp':
            if (vy == 1) break;
            nvx = 0; nvy = -1;
            break;
        case 'ArrowDown':
            if (vy == -1) break;
            nvx = 0; nvy = 1;
            break;
    }
}, false);