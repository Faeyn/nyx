function randomIntBetween(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const start = document.getElementById("start");
const counter = document.getElementById("count");

let gameId = null
let count = 0;
let targets = new Array();
const targetThreshold = 10;

function removeTargets() {
    targets.forEach((target) => {
        target.remove();
    });
}

start.addEventListener("click", () => {
    count = 0;
    counter.textContent = count;

    if (!gameId) {
        startGame();
    } else {
        removeTargets();
        startGame();
    }
})

const field = document.querySelector(".board");
let { left: fieldLeft, top: fieldTop, height: fieldHeight, width: fieldWidth } = field.getBoundingClientRect();

window.addEventListener("resize", () => {
    ({ left: fieldLeft, top: fieldTop, height: fieldHeight, width: fieldWidth } = field.getBoundingClientRect());
})

function startGame() {
    gameId = 1;

    start.textContent = "Restart"
    addTarget();

    function addTarget() {
        const el = document.createElement("target-element");
        el.style.zIndex = 9999;
        document.body.appendChild(el);
        targets.push(el)
        const circ = el.shadowRoot.querySelector('.circle');

        const { width: length } = el.getBoundingClientRect();
        const border = 60
        const leftBound = fieldLeft + border;
        const rightBound = fieldLeft + fieldWidth - length - border;
        const topBound = fieldTop + border;
        const bottomBound = fieldTop + fieldHeight - length - border;


        el.style.left = `${randomIntBetween(leftBound, rightBound)}px`;
        el.style.top = `${randomIntBetween(topBound, bottomBound)}px`;

        circ.addEventListener("animationend", () => {
            start.textContent = "Start"
            removeTargets();
            gameId = null;
        });

        el.addEventListener("click", () => {
            count++;
            counter.textContent = count;
            el.remove();
            addTarget();
            if (count % targetThreshold === 0) addTarget();
        });
    }
}
