const particleLifetime = 0.5;
const particleMoveInterval = 0.15;
const particleSize = 5;
const particleGlowRadius = 10;

const totalColors = 100;
const predefinedColors = [ 
    'rgba(147, 116, 22, 255)', 'rgba(178, 148, 51, 255)', 'rgba(218, 196, 113, 255)', 
    'rgba(255, 253, 184, 255)', 'rgba(226, 191, 78, 255)', 'rgba(203, 161, 53, 255)' 
];

class ParticleArray {
    constructor(x, y, xDirection, yDirection, color) {
        this.x = x;
        this.y = y;

        this.xDirection = xDirection;
        this.yDirection = yDirection;

        this.color = color;

        this.lifeTime = particleLifetime;
        this.moveInterval = particleMoveInterval;
    }
}

const canvas = document.getElementById('sparkles');
const context = canvas.getContext('2d');

let mouseX = 0;
let mouseY = 0;

let particleArray = [];
let particleColors = [];
let atColor = 0;

document.addEventListener('DOMContentLoaded', (e) => {
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth * dpr;
    const height = window.innerHeight * dpr;

    // 1 canvas unit is now always one pixel
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    // Particle glow effect (this can also be done every frame, but the particles are "static" colors)
    context.shadowBlur = particleGlowRadius;
    context.shadowColor = 'rgba(255, 253, 184, 0.8)'; // Glow color
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    // Scale the context
    context.scale(dpr, dpr);
    generateColors();

    // Create a render loop
    let previousTime = performance.now();
    let currentTime = 0;
    let deltaTime = 0;
    setInterval(() => {
        // 0. Timing
        currentTime = performance.now();
        deltaTime = (currentTime - previousTime) / 1000;
        previousTime = currentTime;

        // 1. Clear
        {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }

        // 2. Input (Not relevant here)
        // 3. Update => 4. Draw
        {
            particleArray.push(
                new ParticleArray(
                    mouseX + getRandomOffset(), mouseY + getRandomOffset(), 
                    particleSize * getRandomDirection(), particleSize * getRandomDirection(),
                    particleColors[atColor++ % totalColors]
                )
            );
            
            // Reverse loop to allow deletion
            for (let i = particleArray.length - 1; i >= 0; i--) {
                const particle = particleArray[i];

                particle.lifeTime -= deltaTime;
                if (particle.lifeTime <= 0) {
                    particleArray.splice(i, 1);
                }
                if (particle.lifeTime < 0.1) {
                    particle.color
                }

                particle.moveInterval -= deltaTime;
                if (particle.moveInterval <= 0) {
                    // Move
                    particle.x += particle.xDirection;
                    particle.y += particle.yDirection;

                    particle.moveInterval = particleMoveInterval;
                }

                drawParticle(particle.x, particle.y, particleSize, particle.color);
            }
        }

    }, (1000 / 60));
});

window.addEventListener('resize', (e) => {
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth * dpr;
    const height = window.innerHeight * dpr;

    // Update canvas size on resize
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    context.shadowBlur = particleGlowRadius;
    context.shadowColor = 'rgba(255, 253, 184, 0.8)'; // Glow color
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    // Reapply scaling
    context.scale(dpr, dpr);
});

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function drawParticle(posX, posY, size, color) {
    context.fillStyle = color;
    context.fillRect(posX, posY, size, size);
}

function getRandomOffset() {
    const squareRadius = 20;
    const min = -squareRadius;
    const max = squareRadius;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDirection() {
    const min = -1;
    const max = 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateColors() {
    particleColors = [];
    for (let i = 0; i < totalColors; i++) {
        particleColors.push(predefinedColors[getRandom(0, predefinedColors.length - 1)]);
    }
}