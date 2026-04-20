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

function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};