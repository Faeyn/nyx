let previousTimestamp;
const radius = 20;
const speed = 100;
const color = clr('--clr-neon-pink');


function findUnitVector(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    if (length === 0) {
        return {dx: 0, dy: 0}; // Avoid division by zero
    }
    return {dx: dx / length, dy: dy / length, length: length};
}

function drawBody(px, py, dx, dy) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(px, py, radius, 0, Math.PI * 2);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(px + radius * dx, py + radius * dy);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.restore();
}

function drawFishHead(px, py, dt) {
    const {dx, dy, length} = findUnitVector(px, py, mouseX, mouseY);

    px = px + dt * speed * dx;
    py = py + dt * speed * dy;

    drawBody(px, py, dx, dy);
    return {px, py}
}

function drawFishBody (px, py, pxt, pyt) {
    const {dx, dy, length} = findUnitVector(px, py, pxt, pyt);

    px = pxt - dx * radius;
    py = pyt - dy * radius;

    drawBody(px, py, dx, dy);

    return {px, py}
}


fishSegs = Array.from({length: 5}, (_, i) => ({
    px: cx,
    py: cy + i * radius
}));

function fishAnimation(ts) {
    if (!previousTimestamp) {
        previousTimestamp = ts
        return
    }

    var dt = (ts - previousTimestamp) / 1000;
    previousTimestamp = ts;

    fishHead = fishSegs[0]
    const {px, py} = drawFishHead(fishHead.px, fishHead.py, dt)
    fishSegs[0] = {px, py}

    for (let i = 1; i < fishSegs.length; i ++) {
        const {px, py} = drawFishBody(fishSegs[i].px, fishSegs[i].py, fishSegs[i-1].px, fishSegs[i-1].py)
        fishSegs[i] = {px, py}
    }
}