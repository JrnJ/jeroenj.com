let isDragging = false;
let xOff = 0;
let yOff = 0;

// Track Mouse Position
(function()  {
    document.onmousemove = handleMouseMove;
    function handleMouseMove(event) 
    {
        if (isDragging)
        {
            event = event || window.event;

            textMouseX.innerHTML = 'X: ' + event.clientX;
            textMouseY.innerHTML = 'Y: ' + event.clientY;

            let X = event.clientX;
            let Y = event.clientY;
    
            document.getElementById("mover").style.top = (Y + yOff) + "px";
            document.getElementById("mover").style.left = (X + xOff) + "px";
            console.log("hii");
        }
    }
})
();

const DragMouseDown = (event) => {
    isDragging = true;
    xOff = document.getElementById("mover").style.left.replace("px", '') - event.clientX;
    yOff = document.getElementById("mover").style.top.replace("px", '') - event.clientY;
}

const DragMouseUp = () => {
    isDragging = false;
}