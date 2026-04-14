const ORBIT_RADIUS  = 450;
const PERIOD        = 5000;          // ms — 0.2 Hz
const TRAIL_ANGLE   = Math.PI * 0.8; // radians of trail arc
const TRAIL_STEPS   = 60;
const RING_R        = 9;             // radius of each orbiting ring
const RING_LW       = 2;

const orbiters = [
  { phase: 0,       color: clr('--clr-neon-teal'),  glow: clr('--clr-neon-teal-l')  },
  { phase: Math.PI, color: clr('--clr-neon-blue'),  glow: clr('--clr-neon-blue-l')  },
];

function ring(x, y, r, lw, color, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth   = lw;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function orbiter(ts) {
  // Subtle orbit guide ring
  ctx.save();
  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth   = 1;
  ctx.beginPath();
  ctx.arc(cx, cy, ORBIT_RADIUS, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  for (const orb of orbiters) {
    const angle = (2 * Math.PI * ts / PERIOD) + orb.phase;

    // Trail — short arc segments with increasing opacity to fake a gradient line
    const trailEnd = angle - RING_R / ORBIT_RADIUS;
    const segAngle = TRAIL_ANGLE / TRAIL_STEPS;
    for (let i = 0; i < TRAIL_STEPS; i++) {
      const t      = i / (TRAIL_STEPS - 1);           // 0 = tail, 1 = head
      const aStart = trailEnd - TRAIL_ANGLE + i * segAngle;
      const aEnd   = aStart + segAngle * 1.05;        // tiny overlap to avoid gaps
      const alpha  = t * t * 0.85;                    // quadratic fade 0 → 0.85
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = orb.color;
      ctx.lineWidth   = 1.5;
      ctx.lineCap     = 'round';
      ctx.beginPath();
      ctx.arc(cx, cy, ORBIT_RADIUS, aStart, aEnd);
      ctx.stroke();
      ctx.restore();
    }

    // Head ring with full neon glow
    const hx = cx + ORBIT_RADIUS * Math.cos(angle);
    const hy = cy + ORBIT_RADIUS * Math.sin(angle);

    // Wide outer glow pass
    ctx.save();
    ctx.shadowBlur  = 40;
    ctx.shadowColor = orb.glow;
    ring(hx, hy, RING_R, RING_LW, orb.color, 1);
    ctx.restore();

    // Tight inner glow pass
    ctx.save();
    ctx.shadowBlur  = 12;
    ctx.shadowColor = orb.color;
    ring(hx, hy, RING_R, RING_LW, orb.color, 1);
    ctx.restore();

    // Crisp ring on top
    ring(hx, hy, RING_R, RING_LW, orb.color, 1);
    // Faint inner highlight
    ring(hx, hy, RING_R * 0.5, 1, 'rgba(255,255,255,0.35)', 0.55);
  }
}