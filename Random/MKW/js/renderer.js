function Vector2(x, y) {
    this.x = x,
    this.y = y
};

const c = document.getElementById("renderer");
const ctx = c.getContext("2d");

// Chart Variables
const MinValue = 0;
const MaxValue = 100;
const ValueDeviderAmount = 10;

async function GetJSON() {
    let url = '../json/items.json';
    let obj = await (await fetch(url)).json();
    console.log(obj);
}

async function Main() {
    //DrawQuad(new Vector2(100, 0));
    //DrawCircle(80, true, '#FF6600');

    // Initialize Graph
    // for (let i = 0; i < ValueDeviderAmount; i++)
    // {
    //     DrawLine(new Vector2(100, 100), new Vector2(200, i * 10 + 100), "#FF6600");
    // }

    // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes

    // DrawLine(new Vector2(100, 100), new Vector2(200, 100), "#FF6600");
    // DrawText("200", new Vector2(70, 100), "#000000");
    // DrawCircle(new Vector2(100, 100), 10, true, "rgba(255, 0, 0, 1)");
    // DrawCircle(new Vector2(200, 100), 10, true, "#FF0000");

    let url = '';

    await GetJSON();

    for (let racers = 11; racers >= 0; racers--) {
        //console.log("Amount of racers: " + (racers + 1));

        for (let positions = 0; positions <= racers; positions++)
        {
            //console.log("Positions: " + (positions + 1));
        }
    }

    DrawQuad(new Vector2(0, 0), new Vector2(100, 200), "#FF6600");
}

const hexToRgbA = (hex) => {
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
    }
    throw new Error('Bad Hex');
}

const DrawText = (text, position, color, verticalCenter = true) => {
    // Set font
    ctx.font = '12px consolas';

    // Set color
    ctx.fillStyle = color;

    // Draw Text
    ctx.fillText(text, position.x, position.y + 4);
}

/// Draws a line on the canvas
// p1 > Point 1
// p2 > Point 2
// color > HEX color line
const DrawLine = (p1, p2, color) => {
    ctx.beginPath();

    // Set Color
    ctx.fillStyle = color;

    // Place Line
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);

    ctx.stroke();
} 

const DrawQuad = (leftTop, rightBottom, color) => {
    ctx.beginPath();
    ctx.fillStyle = color;

    ctx.fillRect(leftTop.x, leftTop.y, rightBottom.x, rightBottom.y);
}

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
        console.log("Hahhaa");
        ctx.stroke();
    }
}

window.onload = Main;