const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const css = getComputedStyle(document.documentElement);
const clr = name => css.getPropertyValue(name).trim();

const cx = canvas.width  / 2;
const cy = canvas.height / 2;
