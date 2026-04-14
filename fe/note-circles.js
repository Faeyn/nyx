const NOTES = [
  { name: 'D',  freq: 293.66 },
  { name: 'D#', freq: 311.13 },
  { name: 'E',  freq: 329.63 },
  { name: 'F',  freq: 349.23 },
  { name: 'F#', freq: 369.99 },
  { name: 'G',  freq: 392.00 },
  { name: 'G#', freq: 415.30 },
  { name: 'A',  freq: 440.00 },
  { name: 'A#', freq: 466.16 },
  { name: 'B',  freq: 493.88 },
  { name: 'C',  freq: 523.25 },
  { name: 'C#', freq: 554.37 },
];

const RADIUS = 190;
let _audioCtx = null;

async function playNote(freq) {
  if (!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (_audioCtx.state === 'suspended') await _audioCtx.resume();

  const ctx = _audioCtx;
  const now = ctx.currentTime;
  const duration = 0.4;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.value = freq;

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(0.25, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + duration + 0.02);
}

const container = document.createElement('div');
container.style.cssText = `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  pointer-events: none;
  z-index: 5;
`;

NOTES.forEach(({ name, freq }, i) => {
  const angle = -Math.PI / 2 + (i / NOTES.length) * 2 * Math.PI;
  const x = Math.cos(angle) * RADIUS;
  const y = Math.sin(angle) * RADIUS;

  const circle = document.createElement('div');
  circle.textContent = name;
  circle.style.cssText = `
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    left: ${x - 30}px;
    top: ${y - 30}px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    pointer-events: auto;
    border: 2px solid var(--clr-neon-teal);
    color: var(--clr-neon-teal);
    font-family: inherit;
    font-size: 14px;
    font-weight: bold;
    background: rgba(0, 0, 0, 0.4);
    box-shadow: 0 0 8px var(--clr-neon-teal), inset 0 0 8px rgba(0, 0, 0, 0.5);
    user-select: none;
  `;

  circle.addEventListener('click', () => {
    playNote(freq);
    circle.style.animation = 'pop 100ms linear';
    circle.addEventListener('animationend', () => { circle.style.animation = ''; }, { once: true });
  });

  container.appendChild(circle);
});

document.querySelector('.content').appendChild(container);
