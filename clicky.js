const el = document.createElement("target-element");
document.body.appendChild(el);

el.style.zIndex = 9999;
const styleEl = el.shadowRoot.querySelector('style');

const field = document.querySelector(".board");
const { left: fieldLeft, top: fieldTop, height: fieldHeight, width: fieldWidth } = field.getBoundingClientRect();

const { width: lEl } = el.getBoundingClientRect();
const border = 60
const leftBound = fieldLeft + border;
const rightBound = fieldLeft + fieldWidth - lEl - border;
const topBound = fieldTop + border;
const bottomBound = fieldTop + fieldHeight - lEl - border;

// disable animation 
const sheet = styleEl.sheet; // CSSStyleSheet
for (const rule of sheet.cssRules) {
    if (rule.selectorText === '.circle::after') {
        rule.style.animation = 'none';
    }

    if (rule.selectorText === '.circle') {
        rule.style.animation = 'none';
    }
}

function setPosition() {
    el.style.left = `${randomIntBetween(leftBound, rightBound)}px`;
    el.style.top = `${randomIntBetween(topBound, bottomBound)}px`;
}

setPosition();

el.addEventListener("click", () => {
    setPosition();
});

