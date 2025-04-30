export let mouseMoved = false;

document.addEventListener('mousemove', (e) => {
    mouseMoved = true;
}, { once: true });