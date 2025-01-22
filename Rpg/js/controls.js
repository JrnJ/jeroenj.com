class RangeRounded extends HTMLElement {
    constructor() {
        super();

        // Variables
        this.mouseDown = false;
        this.value = 0;

        // Create
        // this.circle = document.createElement('div');
        this.classList.add('round-slider');

        this.thumb = document.createElement('div');
        this.thumb.classList.add('thumb');

        // Methods
        const circleRadius = this.clientWidth / 2; // Radius of the circle
        const centerX = circleRadius;
        const centerY = circleRadius;

        // Append
        this.append(this.thumb);

        // Events
        this.thumb.addEventListener('mousedown', (e) => {
            this.mouseDown = true;
            e.preventDefault();
        });

        window.addEventListener('mouseup', (e) => {
            if (!this.mouseDown) return;
            this.mouseDown = false;
            e.preventDefault();
        });

        window.addEventListener('mousemove', (e) => {
            if (!this.mouseDown) return;

            e.preventDefault();

            const rect = this.getBoundingClientRect();
            const mouseX = e.clientX - rect.left - centerX; // mouse pos relative to circle center
            const mouseY = e.clientY - rect.top - centerY;

            const angle = Math.atan2(mouseY, mouseX);
            this.setThumb(angle, circleRadius);
        });

        this.setThumb(-90 * (Math.PI / 180), circleRadius);
    }

    setThumb(angle, circleRadius) {
        const thumbRadius = this.thumb.clientWidth / 2;

        // Calculate the new position of the thumb
        const x = circleRadius * Math.cos(angle) + thumbRadius;
        const y = circleRadius * Math.sin(angle) + thumbRadius;

        this.thumb.style.transform = `translate(${x - this.thumb.clientWidth / 2}px, ${y - this.thumb.clientHeight / 2}px)`;
        this.value = this.radiansToNormalizedValue(angle);

        const event = new CustomEvent('input', {
            detail: this.value, 
        });
        this.dispatchEvent(event);
    }

    radiansToNormalizedValue(angleInRadians) {
        const angleInDegrees = angleInRadians * (180 / Math.PI);
        const normalized = (angleInDegrees + 180) % 360;
    
        return 1 / 360 * normalized;
    }
}

customElements.define('range-rounded', RangeRounded);

const background = document.querySelector('#background');
const timeDisplay = document.querySelector('#timeDisplay');

document.addEventListener('DOMContentLoaded', (e) => {
    // Display Time
    {
        updateClock();
        setInterval(updateClock, 1000);
    }

    // Day/Night cycle
    {
        let currentBrightness = 1;
        let targetBrightness = 1;
    
        document.querySelector('#dayNightSlider').addEventListener('input', (e) => {

            currentBrightness = mapBrightness(e.detail);
            console.log(e.detail, currentBrightness);
            // lerpBrightness(); // TODO: breaks due to the lerpSpeed being too fast, ill fix it later
            background.style.filter = `brightness(${currentBrightness})`;
        });
    
        function lerpBrightness() {
            const lerpSpeed = 0.05;
        
            function animate() {
                currentBrightness += (targetBrightness - currentBrightness) * lerpSpeed;
                background.style.filter = `brightness(${currentBrightness})`;
    
                if (Math.abs(targetBrightness - currentBrightness) > 0.01) {
                    requestAnimationFrame(animate);
                }
            }
            requestAnimationFrame(animate);
        }

        // value is between 0 and 1
        function mapBrightness(value) {
            // 0.25 => 1
            // 0.75 => 0
            // 1.0 || 0.5 => 0.5
            const minBrightness = 0.1;
            const maxBrightness = 1;

            let newValue = 0;
            if (value >= 0.75) {
                newValue = (value - 0.75) * 2;
            } else if (value < 0.25) {
                newValue = (value + 0.25) * 2;
            } else if (value < 0.75) {
                newValue = Math.abs(value - 0.75) * 2;
            }

            // TODO: somehow use the min and max as a range but idk how
            return Math.max(minBrightness, Math.min(maxBrightness, newValue));
        }
    }
});


function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    timeDisplay.textContent = `${hours}:${minutes}`;
}