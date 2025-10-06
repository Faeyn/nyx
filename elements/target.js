class target extends HTMLElement {
    constructor() {
        super();
        const host = this.attachShadow({ mode: 'open' });
        host.innerHTML = `
            <style>
            :host {
                display: block;
                position: fixed;
                width: 50px;
            }
            
            .circle {
                border-radius: 50%;
                background: radial-gradient(
                    circle at center,
                    var(--clr-neon-blue-l),
                    var(--clr-neon-blue-l) 10px,
                    var(--clr-neon-blue)
                  );

                box-shadow:
                    0px 0px 100px 0px var(--clr-neon-blue),
                    0px 0px 50px 0px var(--clr-neon-blue),
                    0px 0px 20px 0px var(--clr-neon-blue),
                    0px 0px 5px 0px var(--clr-neon-blue);

                width: 50px;
                height: 50px;
                animation: target-scale 5s linear;
            }

            .circle::after {
              content: "";
              position: absolute; inset: 0;
              border-radius: 50%;
              background: #ff0000;
              box-shadow:
                0px 0px 1000px 0px red,
                0px 0px 500px 0px red,
                0px 0px 250px 0px red,
                0px 0px 100px 0px red,
                0px 0px 50px 0px red,
                0px 0px 10px 0px red;
              opacity: 0;
              animation: target-flash 5s linear;
              pointer-events: none;
            }

            .innerCircle {
              border-radius: 50%;
              background: var(--clr-neon-teal);

              width: 10px; 
              height: 10px;
              position: relative;
            
              top: calc(50% - 5px);
              left: calc(50% - 5px);
            }

            @keyframes target-scale {
                0%   { transform: scale(1); }
                70%  { transform: scale(0.50); }
                100% { transform: scale(0.50); }
            }

            @keyframes target-flash {
              0%,70%   { opacity: 0; }
              72.5%    { opacity: 1; }
              74%      { opacity: 0; }
              75%      { opacity: 1; }
              76.5%    { opacity: 0; }
              77.5%    { opacity: 1; }
              79%      { opacity: 0; }
              80%      { opacity: 1; }
              81.5%    { opacity: 0; }
              85%      { opacity: 1; }
              86.5%    { opacity: 0; }
              87.5%    { opacity: 1; }
              89%      { opacity: 0; }
              90%      { opacity: 1; }
              91.5%    { opacity: 0; }
              92.5%    { opacity: 1; }
              94%      { opacity: 0; }
              95%      { opacity: 1; }
              96.5%    { opacity: 0; }
              97.5%,100% { opacity: 1; }
            }

            </style>
            <div id='btn' class="circle">
                <div class="innerCircle"></div>
            </div>
        `;

        this._circle = host.querySelector(".circle");
        this._ctx = null;
        this._onClick = this._onClick.bind(this);
    }

    connectedCallback() {
        this._circle.addEventListener('click', this._onClick);
    }

    disconnectedCallback() {
        this._circle.removeEventListener('click', this._onClick);
        this._ctx?.close();
    }

    async _onClick() {
        await this.beep({ freq: 1200, duration: 120, type: 'triangle' });
    }

    async beep({ freq = 880, duration = 120, type = 'sine', volume = 0.2 } = {}) {
        if (!this._ctx) this._ctx = new (window.AudioContext || window.webkitAudioContext)();
        if (this._ctx.state === 'suspended') await this._ctx.resume();

        const ctx = this._ctx;
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.value = freq;

        // Envelope: avoid clicks (fast attack, short release)
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(volume, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration / 1000);

        osc.connect(gain).connect(ctx.destination);
        osc.start(now);
        osc.stop(now + duration / 1000 + 0.02);
    }

}

customElements.define("target-element", target);


