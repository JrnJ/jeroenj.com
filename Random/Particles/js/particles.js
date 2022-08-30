class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
};

class CanvasObject {
    constructor(position, radius, color) {
        this.position = position;
        this.radius = radius;
        this.color = color;
    }
};

const c = document.getElementById("particleCanvas");
const ctx = c.getContext("2d");

const canvasHeight = c.clientHeight;
const canvasWidth = c.clientWidth;

let CanvasObjects = [];

async function Main() {
    // Event Listeners
    c.addEventListener('mousedown', e => {
        MouseDown(e.offsetX, e.offsetY);
    });

    c.addEventListener('mousemove', e => {
        MouseMove(e.offsetX, e.offsetY);
    });

    c.addEventListener('mouseup', e => {
        MouseUp(e.offsetX, e.offsetY);
    });

    // Populate List
    // // Follows Mouse
    // CanvasObjects.push(new CanvasObject(new Vector2(0, 100), 10, "#FF6600"));

    // // Follows a Sine wave
    // CanvasObjects.push(new CanvasObject(new Vector2(0, 100), 10, "#FF0000"));
    // CanvasObjects.push(new CanvasObject(new Vector2(0, 100), 10, "#FF0000"));
    // CanvasObjects.push(new CanvasObject(new Vector2(0, 100), 10, "#FF0000"));

    for (let i = 0; i < 2; i++) {
        // CanvasObjects.push(new CanvasObject(new Vector2(canvasWidth / 2 + Math.random() * 10, canvasHeight / 2), 10, "#FF0000"));
        CanvasObjects.push(new CanvasObject(new Vector2(canvasWidth / 2, canvasHeight / 2), 10, "#FF0000"));
    }
    CanvasObjects[1].position.x += 5;
    CanvasObjects[1].position.y += 5;
}

let MousePosition = new Vector2(0, 0);

let time = 0;
let dt = 0;

const DrawCircle = (position, radius, fill, color) => {

    ctx.beginPath();

    ctx.fillStyle = color;

    ctx.arc(
        // Center: radius / 2 + position.x, radius / 2 + position.y,
        position.x, position.y,
        radius / 2, // width in px
        0, 2 * Math.PI);

    if (fill == true) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
}

const DrawLine = (p1, p2, color) => {
    ctx.beginPath();

    // Set Color
    ctx.fillStyle = color;

    // Place Line
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);

    ctx.stroke();
}

// <Events> //
const MouseDown = (x, y) => {

}

const MouseMove = (x, y) => {
    MousePosition = new Vector2(x, y);
}

const MouseUp = (x, y) => {

}

window.onload = Main;
// </Events> //

// <Game? Loop> //
function input() {

}

function update() {
    //CanvasObjects[0].position = MousePosition;

    physics();
}


function distanceBetweenCircles(obj1, obj2) {
    return Math.sqrt((obj2.x - obj1.x) * (obj2.x - obj1.x) + (obj2.y - obj1.y) * (obj2.y - obj1.y));
}

function distanceBetweenCirclesSquared(obj1, obj2) {
    return ((obj2.x - obj1.x) * (obj2.x - obj1.x) + (obj2.y - obj1.y) * (obj2.y - obj1.y));
}

function angleBetweenCircles(obj1, obj2) {
    return Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
}

function physics() {

    for (let i = 0; i < CanvasObjects.length; i++) {
        const circle1 = CanvasObjects[i];

        for (let j = 0; j < CanvasObjects.length; j++) {
            if (i != j) {
                const circle2 = CanvasObjects[j];

                // Check for collision
                let dx = (circle1.position.x + circle1.radius) - (circle2.position.x + circle2.radius);
                let dy = (circle1.position.y + circle1.radius) - (circle2.position.y + circle2.radius);
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < circle1.radius + circle2.radius) {
                    // collision detected!
                    const distanceToMove = circle1.radius + circle2.radius - distanceBetweenCircles(circle1.position, circle2.position);
                    const angle = angleBetweenCircles(circle1.position, circle2.position);

                    CanvasObjects[j].position.x += Math.cos(angle) * distanceToMove;
                    CanvasObjects[j].position.y += Math.sin(angle) * distanceToMove;
                }

                // const dbcs = distanceBetweenCirclesSquared(mainObj.position, secondaryObj.position);
                // const dbc  = distanceBetweenCircles(mainObj.position, secondaryObj.position)
                // const idk2 = (mainObj.radius + secondaryObj.radius) * (mainObj.radius + secondaryObj.radius);
                // const idk3 = (mainObj.radius + secondaryObj.radius);

                // console.log(dbcs + " : " + idk2 + "\n" + dbc + " : " + idk3);

                // if (dbcs > idk2) {
                //     console.log("uhm");

                //     const distanceToMove = mainObj.radius + secondaryObj.radius - distanceBetweenCircles(mainObj.position, secondaryObj.position);
                //     const angle = angleBetweenCircles(mainObj.position, secondaryObj.position);
                //     CanvasObjects[j].position.x += Math.cos(angle) * distanceToMove;
                //     CanvasObjects[j].position.y += Math.sin(angle) * distanceToMove;
                //     CanvasObjects[j].position = new Vector2();
                // }
            }
        }
    }
}

function render() {
    ctx.clearRect(0, 0, c.width, c.height);

    time += 0.1;
    //console.log(time);
    // CanvasObjects[1].position = new Vector2(260, 100 * Math.sin(time / 4) + 260);
    // CanvasObjects[2].position = new Vector2(410, 50 * Math.sin(time / 5) + 100);
    // CanvasObjects[3].position = new Vector2(560, 100 * Math.sin(time / 6) + 180);

    // DrawLine(CanvasObjects[1].position, CanvasObjects[2].position, "#FF6600");
    // DrawLine(CanvasObjects[2].position, CanvasObjects[3].position, "#FF6600");
    // DrawLine(CanvasObjects[3].position, CanvasObjects[1].position, "#FF6600");

    // Render Loop
    for (let i = 0; i < CanvasObjects.length; i++) {
        const obj = CanvasObjects[i];
        DrawCircle(obj.position, obj.radius, true, obj.color);
    }
}

function loop() {
    input();
    update();
    render();
}
setInterval(loop, 10);
// </Game? Loop> //