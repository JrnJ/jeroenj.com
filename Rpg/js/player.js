class InputHandler {
    constructor() {
        this.wDown = false;
        this.aDown = false;
        this.sDown = false;
        this.dDown = false;

        document.addEventListener('keydown', (e) => {
            if (e.key === 'w') {
                this.wDown = true;
            }
            if (e.key === 's') {
                this.sDown = true;
            }
            if (e.key === 'a') {
                this.aDown = true;
            }
            if (e.key === 'd') {
                this.dDown = true;
            }
        });
        
        document.addEventListener('keyup', (e) => {
            if (e.key === 'w') {
                this.wDown = false;
            }
            if (e.key === 's') {
                this.sDown = false;
            }
            if (e.key === 'a') {
                this.aDown = false;
            }
            if (e.key === 'd') {
                this.dDown = false;
            }
        });

        window.addEventListener('blur', () => {
            this.reset();
        });
    }

    reset() {
        this.wDown = false;
        this.aDown = false;
        this.sDown = false;
        this.dDown = false;
    }
}

class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // https://github.com/StereoKit/StereoKit/blob/master/StereoKit/Math/Vec2.cs
    normalized() {
        const length = Math.sqrt(this.x ** 2 + this.y ** 2);
        if (length === 0) {
            return new Vector2(0, 0);
        }
        return new Vector2(this.x / length, this.y / length);
    }
}

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        
        this.moveSpeed = 3;

        this.inputHandler = new InputHandler();

        this.element = createPlayerElement(this);
        this.image = this.element.querySelector('img');

        //
        this.setPosition(this.x, this.y);

        //
        this.dragging = false;
        this.element.addEventListener('mousedown', (e) => {
            this.dragging = true;
            e.preventDefault();
        });

        window.addEventListener('mouseup', (e) => {
            if (this.dragging === false) return;
            this.dragging = false;
            e.preventDefault();
        });

        window.addEventListener('mousemove', (e) => {
            if (this.dragging === false) return;
            this.setPosition(e.clientX - this.element.clientWidth / 2, e.clientY - this.element.clientHeight / 2);
            e.preventDefault();
        });
    }

    update(dt) {
        // Input
        let move = new Vector2(0, 0);

        if (this.inputHandler.wDown) {
            move.y -= this.moveSpeed;
        }
        if (this.inputHandler.sDown) {
            move.y += this.moveSpeed;
        }
        if (this.inputHandler.aDown) {
            move.x -= this.moveSpeed;
        }
        if (this.inputHandler.dDown) {
            move.x += this.moveSpeed;
        }
        move = move.normalized();

        if (move.x !== 0 || move.y !== 0) {
            this.setPosition(player.x += move.x * this.moveSpeed, player.y += move.y * this.moveSpeed);

            if (move.x > 0) {
                this.image.style.transform = 'rotateY(180deg)';
            } else if (move.x < 0) {
                this.image.style.transform = 'rotateY(0deg)';
            }
        }
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.element.style.top = `${this.y}px`;
        this.element.style.left = `${this.x}px`;
    }

    setRotation(angle) {

    }
}

const player = new Player(31, 31);
const world = document.querySelector('#world');

document.addEventListener('DOMContentLoaded', () => {
    world.append(player.element);

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