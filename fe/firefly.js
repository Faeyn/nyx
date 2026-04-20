const outerRadius = 40;
const mouseDistance = 200;
const numberOfFlies = 100;

function drawFly(x, y, d_ratio, ts) {
    color = clr('--clr-neon-yellow');
   
    // px = x;
    px = x 
    py = y + ts * speed * d_ratio;
    if ( Math.abs(py - mouseY) ** 2 + Math.abs(px - mouseX) ** 2 + (d_ratio * 100) ** 2 < mouseDistance ** 2) {
        px = x + ts * speed * 0.5 * Math.sign(mouseX - x) * d_ratio;
    }

    if (py < -outerRadius) {
        py = canvas.height + outerRadius;
        px = randomIntBetween(0, canvas.width);
        distance = randomIntBetween(50, 100);
    }

  
    gradient = ctx.createRadialGradient(px, py, 0, px, py, outerRadius); 
    gradient.addColorStop(0, hexToRgba(color, 1 * d_ratio));
    gradient.addColorStop(0.05, hexToRgba(color, 1 * d_ratio));
    gradient.addColorStop(0.1, hexToRgba(color, 0.25 * d_ratio));
    gradient.addColorStop(1, hexToRgba(color, 0));

    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.arc(px, py, outerRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    return {px, py, d_ratio};
}

const speed = -0.1;

var flies = Array.from({length: numberOfFlies}, () => ({
    px: randomIntBetween(0, canvas.width),
    py: randomIntBetween(0, canvas.height),
    d_ratio: Math.random()
}));

var previousTimestamp;

function firefly(ts) {
    if (!previousTimestamp) {
        previousTimestamp = ts
        return
    }

    var dt = ts - previousTimestamp;
    previousTimestamp = ts;
    
    flies = flies.map(fly => drawFly(fly.px, fly.py, fly.d_ratio, dt));
}