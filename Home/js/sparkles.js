import { mouseMoved } from './controls.js';

const particleLifetime = 0.5;
const particleMoveInterval = 0.15;
const particleSize = 5;
const particleGlowRadius = 10;

const totalColors = 100;
// const predefinedColors = [ 
//     'rgba(147, 116, 22, 255)', 'rgba(178, 148, 51, 255)', 'rgba(218, 196, 113, 255)', 
//     'rgba(255, 253, 184, 255)', 'rgba(226, 191, 78, 255)', 'rgba(203, 161, 53, 255)' 
// ];
// #937416, #b29433, #dac471, #fffdcc, #e2bf4e, #cba135
// const glowColor = 'rgba(255, 253, 184, 0.8)';

const predefinedColors = [ 
    'rgba(255, 255, 255, 255)',
    'rgba(238, 238, 238, 255)',
    'rgba(210, 210, 210, 255)',
    'rgba(200, 200, 200, 255)',
    'rgba(190, 190, 190, 255)',
    'rgba(180, 180, 180, 255)',
];
const glowColor = 'rgba(255, 255, 255, 0.8)';

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

// TODO
class ParticleSpawner {
    constructor(colors, glowColor) {
        this.colors = colors;
        this.glowColor = glowColor;
    }

    update() {

    }

    resume() {

    }

    pause() {

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
    updateCanvasSize();
    generateColors();

    // Create a render loop
    let previousTime = performance.now();
    let currentTime = 0;
    let deltaTime = 0;
    setInterval(() => {
        if (mouseMoved === false) return;

        // 0. Timing
        currentTime = performance.now();
        deltaTime = (currentTime - previousTime) / 1000;
        previousTime = currentTime;

        // 1. Clear
        context.clearRect(0, 0, canvas.width, canvas.height);

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
    updateCanvasSize();
});

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCanvasSize() {
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth * dpr;
    const height = window.innerHeight * dpr;

    // Update canvas size on resize
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    context.shadowBlur = particleGlowRadius;
    context.shadowColor = glowColor; // Glow color
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    // Reapply scaling
    context.scale(dpr, dpr);
}

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