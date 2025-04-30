import { mouseMoved } from './controls.js';

export let deltaTime = 0;

document.addEventListener('DOMContentLoaded', () => {
    let previousTime = performance.now();
    let currentTime = 0;
    deltaTime = 0;

    setInterval(() => {
        if (mouseMoved === false) return;

        // 0. Timing
        currentTime = performance.now();
        deltaTime = (currentTime - previousTime) / 1000;
        previousTime = currentTime;
    }, 1000 / 60);
});