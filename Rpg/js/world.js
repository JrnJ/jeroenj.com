import { Player } from './player.js';
import { mouseMoved } from './controls.js';

class World {
    constructor(worldElement) {
        this.element = worldElement;
    }

    addChild(child) {
        this.element.append(child);
    }
}

const world = new World(document.querySelector('#world'));
const player = new Player(31, 31);

document.addEventListener('DOMContentLoaded', () => {
    world.addChild(player.element);

    let previousTime = performance.now();
    let currentTime = 0;
    let deltaTime = 0;

    setInterval(() => {
        if (mouseMoved === false) return;

        // 0. Timing
        currentTime = performance.now();
        deltaTime = (currentTime - previousTime) / 1000;
        previousTime = currentTime;

        player.update(deltaTime);
    }, 1000 / 60);
});