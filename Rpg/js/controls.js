const background = document.querySelector('#background');

document.addEventListener('DOMContentLoaded', (e) => {
    // Day/Night cycle
    {
        let currentBrightness = 1;
        let targetBrightness = 1;
    
        document.querySelector('#dayNightSlider').addEventListener('input', (e) => {
            targetBrightness = e.target.value;
            lerpBrightness();
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
    }
});
