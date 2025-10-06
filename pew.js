const r = 20;
const length = r + 5;
const speed = 1000;
const xl1 = 0;
const yl1 = 0;

let xr1 = window.innerWidth;
const yr1 = 0;

const turretl = document.getElementById("turretl");
const turretr = document.getElementById("turretr");

let mouseY, mouseX;
const tri = length / Math.sqrt(2);
let xl2 = tri;
let yl2 = tri;

let xr2 = xr1 - tri;
let yr2 = tri;

let prevTs;

turretl.innerHTML = `<line x1="${xl1}" y1="${yl1}" x2="${xl2.toFixed(0)}" y2="${yl2.toFixed(0)}" stroke="var(--clr-neon-yellow)" stroke-width="5"/>`;
turretr.innerHTML = `<line x1="${xr1}" y1="${yr1}" x2="${xr2.toFixed(0)}" y2="${yr2.toFixed(0)}" stroke="var(--clr-neon-yellow)" stroke-width="5"/>`;

window.addEventListener("resize", () => {
    xr1 = window.innerWidth;
    xr2 = xr1 - tri;
    turretr.innerHTML = `<line x1="${xr1}" y1="${yr1}" x2="${xr2.toFixed(0)}" y2="${yr2.toFixed(0)}" stroke="var(--clr-neon-yellow)" stroke-width="5"/>`;
    baser.innerHTML = `<path fill="var(--clr-neon-yellow)" d="
                M ${xr1} 0 
                L ${xr1} ${r}
                a ${r} ${r} 0 0 1 -${r} -${r} 
                Z" 
                />`;
});

window.addEventListener("mousemove", (event) => {
    mouseY = event.clientY;
    mouseX = event.clientX;

    const dxl = mouseX - xl1;
    const dyl = mouseY - yl1;
    const ratiol = Math.sqrt(Math.pow(dxl, 2) + Math.pow(dyl, 2)) / length;
    const xl2 = dxl / ratiol;
    const yl2 = dyl / ratiol;
    turretl.innerHTML = `<line x1="${xl1}" y1="${yl1}" x2="${xl2.toFixed(2)}" y2="${yl2.toFixed(2)}" stroke="var(--clr-neon-yellow)" stroke-width="5"/>`;

    const dxr = mouseX - xr1;
    const dyr = mouseY - yr1;
    const ratior = Math.sqrt(Math.pow(dxr, 2) + Math.pow(dyr, 2)) / length;
    const xr2 = xr1 + dxr / ratior;
    const yr2 = dyr / ratior;
    turretr.innerHTML = `<line x1="${xr1}" y1="${yr1}" x2="${xr2.toFixed(0)}" y2="${yr2.toFixed(0)}" stroke="var(--clr-neon-yellow)" stroke-width="5"/>`;
})

const basel = document.getElementById("basel");
const baser = document.getElementById("baser");

basel.innerHTML = `<path fill="var(--clr-neon-yellow)" d="
            M 0 0 
            L 0 ${r}
            a ${r} ${r} 0 0 0 ${r} -${r} 
            Z" 
            />`;

baser.innerHTML = `<path fill="var(--clr-neon-yellow)" d="
            M ${xr1} 0 
            L ${xr1} ${r}
            a ${r} ${r} 0 0 1 -${r} -${r} 
            Z" 
            />`;

let bullets = new Array();

window.addEventListener("click", (event) => {
    const bulletl = document.createElement('bullet-element');
    document.body.appendChild(bulletl);
    bulletl.style.top = yl1;
    bulletl.style.left = xl1;

    mouseY = event.clientY;
    mouseX = event.clientX;

    const dxl = mouseX - xl1;
    const dyl = mouseY - yl1;

    const hypl = Math.sqrt(Math.pow(dxl, 2) + Math.pow(dyl, 2));
    const bull = { object: bulletl, dir: { x: dxl / hypl, y: dyl / hypl }, pos: { x: xl1, y: yl1 } }

    const bulletr = document.createElement('bullet-element');
    document.body.appendChild(bulletr);
    bulletr.style.top = 0;
    bulletr.style.left = 0;
    const xr = xr1 - 15;
    bulletr.style.transform = `translate(${xr.toFixed(2)}px, ${yr1.toFixed(2)}px)`;

    const dxr = mouseX - xr1;
    const dyr = mouseY - yr1;

    const hypr = Math.sqrt(Math.pow(dxr, 2) + Math.pow(dyr, 2));
    const bulr = { object: bulletr, dir: { x: dxr / hypr, y: dyr / hypr }, pos: { x: xr, y: yr1 } }

    bullets.push(bull)
    bullets.push(bulr)

    requestAnimationFrame(tick)
});

function tick(ts) {
    if (!prevTs) prevTs = ts;
    const dt = Math.min((ts - prevTs) / 1000, 0.05);
    prevTs = ts;

    const wX = window.innerWidth;
    const wY = window.innerHeight;

    bullets.forEach((bullet) => {
        if (bullet.pos.x > wX || bullet.pos.y > wY || bullet.pos.x < 0) {
            bullet.object.remove()
        };

        bullet.pos.y += bullet.dir.y * speed * dt;
        bullet.pos.x += bullet.dir.x * speed * dt;

        bullet.object.style.transform = `translate(${bullet.pos.x.toFixed(2)}px, ${bullet.pos.y.toFixed(2)}px)`;

        if (isOverlapping(bullet.object, el.shadowRoot.querySelector(".circle"))) {
            setPosition();
        }
    })

    bullets = bullets.filter((bullet) => {
        return bullet.pos.x < wX + 100 && bullet.pos.y < wY + 100 && bullet.pos.x > 0 - 100;
    })

    if (bullets.length > 0) requestAnimationFrame(tick);
}

el.style.pointerEvents = "none";

