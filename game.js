const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById('scoreDisplay');

const bubbles = [];
const maxBubbles = 20;
const bubbleRadius = 20;
let score = 0;

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

function Bubble(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = getRandomColor();
}

Bubble.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, bubbleRadius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
};

Bubble.prototype.move = function() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x - bubbleRadius < 0 || this.x + bubbleRadius > canvas.width) {
        this.dx = -this.dx;
    }

    if (this.y - bubbleRadius < 0 || this.y + bubbleRadius > canvas.height) {
        this.dy = -this.dy;
    }
};

function initializeBubbles() {
    for (let i = 0; i < maxBubbles; i++) {
        let x = Math.random() * (canvas.width - 2 * bubbleRadius) + bubbleRadius;
        let y = Math.random() * (canvas.height - 2 * bubbleRadius) + bubbleRadius;
        let dx = (Math.random() - 0.5) * 4;
        let dy = (Math.random() - 0.5) * 4;

        bubbles.push(new Bubble(x, y, dx, dy));
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const bubble of bubbles) {
        bubble.move();
        bubble.draw();
    }

    requestAnimationFrame(update);
}

function resetGame() {
    bubbles.length = 0;
    score = 0;
    scoreDisplay.textContent = score;
    initializeBubbles();
}

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let i = 0; i < bubbles.length; i++) {
        const bubble = bubbles[i];
        const distance = Math.sqrt((x - bubble.x) ** 2 + (y - bubble.y) ** 2);
        if (distance < bubbleRadius) {
            bubbles.splice(i, 1);
            score++;
            scoreDisplay.textContent = score;
            break;
        }
    }
});

document.getElementById('restartButton').addEventListener('click', resetGame);


initializeBubbles();
update();
