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
        case "Green Shell":
            return "#1BBE25";
        case "Triple Green Shells":
            return "#1B6D00";

        case "Red Shell":
            return "#ff2929";
        case "Triple Red Shells":
            return "#FF0000";

        case "Banana":
            return "#d4d415";
        case "Triple Bananas":
            return "#bfbf15";

        case "Fake Item Box":
            return "#4a0000";
        case "Thundercloud":
            return "#7894CF";

        case "Mushroom":
            return "#ff0000";
        case "Triple Mushroom":
            return "#b30000";
        case "Golden Mushroom":
            return "#ffa508";
        case "Mega Mushroom":
            return "#d6a508";

        case "Bob-omb":
            return "#26273D";
        case "Blue Shell":
            return "#0873ff";
        case "POW Block":
            return "#313a84";
        case "Blooper":
            return "#525a63"; 
        case "Lightning":
            return "#d4d415";

        case "Star":
            return "#ffff63";
        case "Bullet Bill":
            return "#000000";

        default:
            return 'purple';
    }
}

async function Main() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes

    //await GetJSON(); // stupid cors
    let json = JSON.parse('[{"Racers":12,"Positions":[{"Position":1,"ItemProbability":[{"Name":"Green Shell","Probability":32.5},{"Name":"Banana","Probability":37.5},{"Name":"Fake Item Box","Probability":20},{"Name":"Triple Bananas","Probability":10}]},{"Position":2,"ItemProbability":[{"Name":"Green Shell","Probability":17.5},{"Name":"Red Shell","Probability":25},{"Name":"Banana","Probability":20},{"Name":"Fake Item Box","Probability":7.5},{"Name":"Mushroom","Probability":12.5},{"Name":"Triple Green Shells","Probability":5},{"Name":"Triple Bananas","Probability":12.5}]},{"Position":3,"ItemProbability":[{"Name":"Green Shell","Probability":15},{"Name":"Red Shell","Probability":25},{"Name":"Banana","Probability":7.5},{"Name":"Fake Item Box","Probability":5},{"Name":"Mushroom","Probability":17.5},{"Name":"Bob-omb","Probability":2.5},{"Name":"Thundercloud","Probability":2.5},{"Name":"Triple Green Shells","Probability":10},{"Name":"Triple Red Shells","Probability":5},{"Name":"Triple Bananas","Probability":10}]},{"Position":4,"ItemProbability":[{"Name":"Green Shell","Probability":7.5},{"Name":"Red Shell","Probability":20},{"Name":"Banana","Probability":2.5},{"Name":"Fake Item Box","Probability":2.5},{"Name":"Mushroom","Probability":22.5},{"Name":"Triple Mushroom","Probability":5},{"Name":"Bob-omb","Probability":5},{"Name":"Blue Shell","Probability":2.5},{"Name":"Mega Mushroom","Probability":2.5},{"Name":"Thundercloud","Probability":7.5},{"Name":"Triple Green Shells","Probability":10},{"Name":"Triple Red Shells","Probability":10},{"Name":"Triple Bananas","Probability":2.5}]},{"Position":5,"ItemProbability":[{"Name":"Green Shell","Probability":5},{"Name":"Red Shell","Probability":15},{"Name":"Mushroom","Probability":15},{"Name":"Triple Mushroom","Probability":10},{"Name":"Bob-omb","Probability":7.5},{"Name":"Blue Shell","Probability":5},{"Name":"Mega Mushroom","Probability":7.5},{"Name":"Blooper","Probability":5},{"Name":"POW Block","Probability":5},{"Name":"Thundercloud","Probability":7.5},{"Name":"Triple Green Shells","Probability":7.5},{"Name":"Triple Red Shells","Probability":10}]},{"Position":6,"ItemProbability":[{"Name":"Red Shell","Probability":10},{"Name":"Mushroom","Probability":12.5},{"Name":"Triple Mushroom","Probability":15},{"Name":"Bob-omb","Probability":7.5},{"Name":"Blue Shell","Probability":7.5},{"Name":"Golden Mushroom","Probability":2.5},{"Name":"Mega Mushroom","Probability":10},{"Name":"Blooper","Probability":7.5},{"Name":"POW Block","Probability":5},{"Name":"Thundercloud","Probability":7.5},{"Name":"Triple Green Shells","Probability":5},{"Name":"Triple Red Shells","Probability":10}]},{"Position":7,"ItemProbability":[{"Name":"Red Shell","Probability":5},{"Name":"Mushroom","Probability":10},{"Name":"Triple Mushroom","Probability":25},{"Name":"Bob-omb","Probability":5},{"Name":"Blue Shell","Probability":7.5},{"Name":"Golden Mushroom","Probability":10},{"Name":"Mega Mushroom","Probability":7.5},{"Name":"Blooper","Probability":7.5},{"Name":"POW Block","Probability":7.5},{"Name":"Thundercloud","Probability":5},{"Name":"Triple Green Shells","Probability":2.5},{"Name":"Triple Red Shells","Probability":7.5}]},{"Position":8,"ItemProbability":[{"Name":"Red Shell","Probability":2.5},{"Name":"Triple Mushroom","Probability":32.5},{"Name":"Blue Shell","Probability":5},{"Name":"Star","Probability":12.5},{"Name":"Golden Mushroom","Probability":22.5},{"Name":"Mega Mushroom","Probability":5},{"Name":"Blooper","Probability":5},{"Name":"POW Block","Probability":5},{"Name":"Thundercloud","Probability":5},{"Name":"Triple Red Shells","Probability":5}]},{"Position":9,"ItemProbability":[{"Name":"Triple Mushroom","Probability":37.5},{"Name":"Blue Shell","Probability":2.5},{"Name":"Star","Probability":20},{"Name":"Golden Mushroom","Probability":27.5},{"Name":"Blooper","Probability":5},{"Name":"POW Block","Probability":5},{"Name":"Bullet Bill","Probability":2.5}]},{"Position":10,"ItemProbability":[{"Name":"Triple Mushroom","Probability":30},{"Name":"Star","Probability":27.5},{"Name":"Golden Mushroom","Probability":35},{"Name":"Bullet Bill","Probability":7.5}]},{"Position":11,"ItemProbability":[{"Name":"Triple Mushroom","Probability":12.5},{"Name":"Lightning","Probability":7.5},{"Name":"Star","Probability":27.5},{"Name":"Golden Mushroom","Probability":30},{"Name":"Bullet Bill","Probability":22.5}]},{"Position":12,"ItemProbability":[{"Name":"Triple Mushroom","Probability":5},{"Name":"Lightning","Probability":20},{"Name":"Star","Probability":17.5},{"Name":"Golden Mushroom","Probability":22.5},{"Name":"Bullet Bill","Probability":35}]}]}]');
    console.log(json);

    for (let racers = 11; racers >= 0; racers--) {
        //console.log("Amount of racers: " + (racers + 1));

        for (let positions = 0; positions <= racers; positions++)
        {
            //console.log("Positions: " + (positions + 1));
        }
    }

    //Get Racers Amount
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
            await DrawImage("./images/Positions/" + position.Position + ".png",
                new Vector2(10 + 110 * positions, 10), new Vector2(80, 80),
                new Vector2(0, 0), new Vector2(80, 80)
            );

            for (let items = 0; items < position.ItemProbability.length; items++)
            {
                let item = position.ItemProbability[items];

                const height = (canvasHeight - 100) / 100 * item.Probability;

                DrawQuad(
                    new Vector2(100 * positions + (positions * 10), previousHeight + 100), new Vector2(100, height), 
                    ItemNameToColor(item.Name));

                // Make sure to crop the image
                // Sorry for double code but its faster
                if (height < 60)
                {
                    await DrawImage("./images/Items/" + item.Name.replace(/\s+/g, '') + ".png",
                        new Vector2(100 * positions + (positions * 10) + 20, previousHeight - 30 + height / 2 + ((60 - height) / 2) + 100), new Vector2(60, 60),
                        new Vector2(0, (60 - height) / 2), new Vector2(60, height)
                    );
                }
                else
                {
                    await DrawImage("./images/Items/" + item.Name.replace(/\s+/g, '') + ".png",
                        new Vector2(100 * positions + (positions * 10) + 20, previousHeight - 30 + height / 2 + 100), new Vector2(60, 60),
                        new Vector2(0, 0), new Vector2(60, 60)
                    );
                }

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

async function DrawImage(image, leftTop, size, sourceLeftTop, sourceSize) {
    //ctx.beginPath();

    let img = new Image();

    await new Promise(r => img.onload = r, img.src = image);
    ctx.drawImage(img, 
        // Where to place  
        img.naturalHeight / size.x * sourceLeftTop.x,

        // Size
        img.naturalWidth  / size.y * sourceLeftTop.y,


        // Where to start   
        img.naturalHeight / size.x * sourceSize.x,

        // Where to end
        img.naturalWidth  / size.y * sourceSize.y,
        
        leftTop.x, leftTop.y, sourceSize.x, sourceSize.y);
}

window.onload = Main;