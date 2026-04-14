const outerRadius = 40;
function fly(x, y, ts) {
    color = clr('--clr-neon-yellow');
    
    px = x;
    py = canvas.height + outerRadius - (outerRadius + y + ts * speed) % canvas.height + outerRadius;

    gradient = ctx.createRadialGradient(px, py, 0, px, py, outerRadius); 
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.05, color);
    gradient.addColorStop(0.1, color + '40');
    gradient.addColorStop(1, color + '00');

    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.arc(px, py, outerRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

const speed = 0.1;

function firefly(ts) {
    x = cx;
    y = canvas.height;

    fly(x, y, ts);
}

// function animate(ts) {

    // obs.forEach((ob) => {
    //     ob.pos.y -= ob.speed * dt;
    //     if (Math.pow(ob.pos.y - mouseY, 2) + Math.pow(ob.pos.x - mouseX, 2) < Math.pow(dist, 2)) {
    //         if (ob.pos.x < mouseX) {
    //             ob.pos.x -= K * (dist - (ob.pos.x - mouseX));
    //         } else {
    //             ob.pos.x += K * (dist - (ob.pos.x - mouseX));
    //         }
    //     }

    //     ob.object.style.transform = `translate(${ob.pos.x.toFixed(2)}px, ${ob.pos.y.toFixed(2)}px)`;

    //     if (ob.pos.y < -100) {
    //         createNew = true;
    //         ob.pos.y = fieldBottom;
    //         ob.pos.x = randomIntBetween(fieldRight, fieldLeft);
    //     }
    // })

//     requestAnimationFrame(animate);
// }

// requestAnimationFrame(animate);


