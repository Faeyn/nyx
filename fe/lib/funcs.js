function randomIntBetween(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function isOverlapping(aEl, bEl) {
    if (!aEl || !bEl) return false;

    console.log(aEl, bEl)
    const a = aEl.getBoundingClientRect();
    const b = bEl.getBoundingClientRect();

    return !(
        a.right <= b.left ||
        a.left >= b.right ||
        a.bottom <= b.top ||
        a.top >= b.bottom
    );
}
