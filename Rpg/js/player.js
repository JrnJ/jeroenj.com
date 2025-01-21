class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        
        this.element = createPlayerElement();
    }
}

const player = new Player(100, 100);
const world = document.querySelector('#world');

document.addEventListener('DOMContentLoaded', (e) => {
    // world.appendChild(player.element);
});

document.addEventListener('input', (e) => {

});

function createPlayerElement() {
    const playerElement = document.createElement('div');
    playerElement.id = "player";

    const playerImage = document.createElement('img');
    playerImage.src = "./images/icon.png";

    return playerElement;
}