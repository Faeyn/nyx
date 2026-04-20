const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width  = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}
resize();
window.addEventListener('resize', resize);

const css = getComputedStyle(document.documentElement);
const clr = name => css.getPropertyValue(name).trim();

const cx = canvas.width  / 2;
const cy = canvas.height / 2;

let mouseY = 0;
let mouseX = 0;

window.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
});