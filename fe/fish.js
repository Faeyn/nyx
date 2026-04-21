let previousTimestamp;
const circle = 2 * Math.PI;
const radius = 20;
const speed = 200;
const maxAngle = circle / 200;
const color = clr('--clr-neon-pink');

// TODO
// - Add more segments with different distance to increase resolution
// - Add tail fin
// - Add eye
// - Add swimming animation (e.g. tail fin wagging, body undulating)
// - Add fins 

function findUnitVector(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    if (length === 0) {
        return {dx: 0, dy: 0}; // Avoid division by zero
    }
    return {dx: dx / length, dy: dy / length, length: length};
}

function drawGuide(px, py, dx, dy, r) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(px + r * dx, py + r * dy);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.restore();
}

function calcFishHead(dt, px, py, theta, r) {
    var {dx, dy, length} = findUnitVector(px, py, mouseX, mouseY);

    const targetAngle = Math.atan2(dy, dx);
    let angleDiff = targetAngle - theta;
    // normalize to [-π, π] to avoid wrapping jumps
    angleDiff -= Math.round(angleDiff / (2 * Math.PI)) * 2 * Math.PI;

    if (Math.abs(angleDiff) > maxAngle) {
        theta += Math.sign(angleDiff) * maxAngle;
        dx = Math.cos(theta);
        dy = Math.sin(theta);
    } else {
        theta = targetAngle;
    }

    px = px + dt * speed * dx;
    py = py + dt * speed * dy;

    // drawGuide(px, py, dx, dy, r);
    return {px, py, theta, r}
}

function calcFishBody (px, py, pxt, pyt, r) {
    const {dx, dy, length} = findUnitVector(px, py, pxt, pyt);

    px = pxt - dx * r;
    py = pyt - dy * r;

    // drawGuide(px, py, dx, dy, r);

    return {px, py, theta: Math.atan2(dy, dx), r}
}

const fishBody = [32, 32, 32, 28, 24, 20, 16, 12, 8, 4];

var fishSegs = fishBody.map((r, i) => ({
    px: cx,
    py: cy + i * r,
    theta: 2 * Math.PI * 3 / 4,
    r: r
}));


function drawFish(fishSegs) {
    const n = fishSegs.length;
    const {px: hpx, py: hpy, theta: ht, r: hr} = fishSegs[0];

    ctx.save();
    ctx.beginPath();

    // nose point
    ctx.moveTo(hpx + hr * Math.cos(ht), hpy + hr * Math.sin(ht));

    // left side: head -> tail
    for (let i = 0; i < n; i++) {
        const {px, py, theta, r} = fishSegs[i];
        ctx.lineTo(px + r * Math.cos(theta + circle/4), py + r * Math.sin(theta + circle/4));
    }

    // right side: tail -> head
    for (let i = n - 1; i >= 0; i--) {
        const {px, py, theta, r} = fishSegs[i];
        ctx.lineTo(px + r * Math.cos(theta - circle/4), py + r * Math.sin(theta - circle/4));
    }

    ctx.closePath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.restore();
}


function fishAnimation(ts) {
    if (!previousTimestamp) {
        previousTimestamp = ts
        return
    }

    var dt = (ts - previousTimestamp) / 1000;
    previousTimestamp = ts;

    fishSegs[0] = calcFishHead(dt, fishSegs[0].px, fishSegs[0].py, fishSegs[0].theta, fishSegs[0].r);

    for (let i = 1; i < fishSegs.length; i ++) {
        fishSegs[i] = calcFishBody(fishSegs[i].px, fishSegs[i].py, fishSegs[i-1].px, fishSegs[i-1].py, fishSegs[i].r)
    }

    drawFish(fishSegs);
}