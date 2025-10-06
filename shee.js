const maxSpeed = 500;
const minSpeed = 10;

const field = document.querySelector(".content");

let { left: fieldLeft, right: fieldRight, top: fieldTop, bottom: fieldBottom } = field.getBoundingClientRect();
fieldBottom += 200;

window.addEventListener("resize", () => {
    ({ left: fieldLeft, right: fieldRight, top: fieldTop, bottom: fieldBottom } = field.getBoundingClientRect());
    fieldBottom += 200;
})

let prevTs, rafId;

function randomIntBetween(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

let y = fieldBottom, x = randomIntBetween(fieldRight, fieldLeft);


let obs = new Array();

const numberElements = 75;

for (let i = 0; i < numberElements; i++) {
    const ob = document.createElement("bullet-element");
    document.body.appendChild(ob);

    speed = randomIntBetween(maxSpeed, minSpeed)
    ob.style.opacity = speed / maxSpeed;

    obs.push({ object: ob, pos: { x: randomIntBetween(fieldRight, fieldLeft), y: fieldBottom }, speed: speed });
}

let mouseY = 0;
let mouseX = 0;
const dist = 500;
const K = 1 / 1000;

window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

function tick(ts) {
    if (!prevTs) prevTs = ts;
    const dt = Math.min((ts - prevTs) / 1000, 0.05);
    prevTs = ts;

    let createNew = false;
    obs.forEach((ob) => {
        ob.pos.y -= ob.speed * dt;
        if (Math.pow(ob.pos.y - mouseY, 2) + Math.pow(ob.pos.x - mouseX, 2) < Math.pow(dist, 2)) {
            if (ob.pos.x < mouseX) {
                ob.pos.x -= K * (dist - (ob.pos.x - mouseX));
            } else {
                ob.pos.x += K * (dist - (ob.pos.x - mouseX));
            }
        }

        ob.object.style.transform = `translate(${ob.pos.x.toFixed(2)}px, ${ob.pos.y.toFixed(2)}px)`;

        if (ob.pos.y < -100) {
            createNew = true;
            ob.pos.y = fieldBottom;
            ob.pos.x = randomIntBetween(fieldRight, fieldLeft);
        }
    })

    requestAnimationFrame(tick);
}

requestAnimationFrame(tick);


