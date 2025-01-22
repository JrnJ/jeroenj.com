class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        
        this.element = createPlayerElement(this);
    }
}

const player = new Player(100, 100);
const world = document.querySelector('#world');

document.addEventListener('DOMContentLoaded', (e) => {
    world.append(player.element);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'w') {
        // player.element.style.top = `${player.y += 10}px`;
    }
    if (e.key === 's') {
        
    }
    if (e.key === 'a') {
        
    }
    if (e.key === 'd') {
        
    }
});

function createPlayerElement(player) {
    const playerElement = document.createElement('div');
    playerElement.id = "player";
    playerElement.classList.add('player');
    playerElement.classList.add('img-pixelated');

    const playerImage = document.createElement('img');
    playerImage.classList.add('contained-img');
    playerImage.src = "./images/icon.png";
    playerElement.append(playerImage);

    return playerElement;
}