function Vector2(x, y) {
    this.x = x,
    this.y = y
};

const c = document.getElementById("renderer");
const ctx = c.getContext("2d");

const canvasHeight = c.clientHeight;
const canvasWidth = c.clientWidth;

// Chart Variables
const MinValue = 0;
const MaxValue = 100;
const ValueDeviderAmount = 10;

async function GetJSON() {
    let url = 'https://github.com/JrnJ/jeroenj.com/blob/main/Random/MKW/json/items.json';
    let obj = await (await fetch(url)).json();
    console.log(obj);
}

function ItemNameToColor(name) {
    switch (name) {
        case "GreenShell":
            return "#1BBE25";
        case "TripleGreenShells":
            return "#1B6D00";

        case "RedShell":
            return "#F90018";
        case "TripleRedShells":
            return "#FFFF00";

        case "Banana":
            return "#FFFF00";
        case "TripleBananas":
            return "#FFFF00";

        case "FakeItemBox":
            return "#4a0000";

        case "Mushroom":
            return "#ff2626";
        case "TripleMushrooms":
            return "#ffff00";
        case "GoldenMushroom":
            return "#";
        case "MegaMushroom":
            return "#";

        default:
            return 'purple';
    }
}

async function Main() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes

    //await GetJSON(); // stupid cors
    let json = JSON.parse('[{"Racers":12,"Positions":[{"Position":1,"ItemProbability":[{"ItemName":"GreenShell","Probability":32.5},{"ItemName":"Banana","Probability":37.5},{"ItemName":"FakeItemBox","Probability":20},{"ItemName":"TripleBananas","Probability":10}]},{"Position":2,"ItemProbability":[{"ItemName":"GreenShell","Probability":17.5},{"ItemName":"RedShell","Probability":25},{"ItemName":"Banana","Probability":20},{"ItemName":"FakeItemBox","Probability":7.5},{"ItemName":"Mushroom","Probability":12.5},{"ItemName":"TripleGreenShells","Probability":5},{"ItemName":"TripleBananas","Probability":12.5}]}]}]');
    console.log(json);

    // for (let racers = 11; racers >= 0; racers--) {
    //     //console.log("Amount of racers: " + (racers + 1));

    //     for (let positions = 0; positions <= racers; positions++)
    //     {
    //         //console.log("Positions: " + (positions + 1));
    //     }
    // }

    // Get Racers Amount
    for (let racers = json.length; racers > 0; racers--)
    {
        let placement = json[racers - 1];
        //console.log("Racers: " + placement.Racers);

        // Get Position in Racers
        for (let positions = 0; positions < placement.Positions.length; positions++)
        {
            let position = placement.Positions[positions];

            let previousHeight = 0;

            // Fill Chart with Item Probability
            for (let items = 0; items < position.ItemProbability.length; items++)
            {
                let item = position.ItemProbability[items];

                const height = canvasHeight / 100 * item.Probability;

                DrawQuad(new Vector2(100 * positions + (positions * 10), previousHeight), new Vector2(100, height), ItemNameToColor(item.Name));

                previousHeight += height;
            }
        }
    }
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