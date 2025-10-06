class leftbarComponent extends HTMLElement {
    constructor() {
        super()
        this.y = 0;
        this.vy = 0;
        this.prevTs = 0;
        this.rafId = 0;

        this.K = 100;
        this.c = 15;

        this.tick = this.tick.bind(this);
        this.requestTick = this.requestTick.bind(this);
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="sidebar">
            <div class="floating-window">
                Navigation
                <ul style="list-style-type:none;">
                    <li><a href="index.html">Start</a></li>
                    <li><a href="distraction.html">Distraction</a></li>
                </ul>
            </div>
        </div>
        `;

        this.box = document.querySelector(".sidebar .floating-window");
        this.sidebar = document.querySelector(".sidebar");
        window.addEventListener('scroll', this.requestTick, { passive: true });

        this.y = 2000;
        requestAnimationFrame(this.requestTick);
    }

    disconnectedCallback() {
        window.removeEventListener('scroll', this.onScroll);
        if (this.rafId) cancelAnimationFrame(this.rafId);
    }

    requestTick() {
        if (!this.rafId) { this.rafId = requestAnimationFrame(this.tick); };
    }

    tick(ts) {
        this.rafId = 0;

        if (!this.prevTs) this.prevTs = ts;
        const dt = Math.min((ts - this.prevTs) / 1000, 0.05);
        this.prevTs = ts;

        const dy = window.scrollY - this.y;
        const ay = this.K * dy - this.c * this.vy;
        this.vy += dt * ay;
        this.y += dt * this.vy;

        this.box.style.transform = `translate(-50%, -50%) translateY(${this.y.toFixed(2)}px)`;

        if (Math.abs(dy) > 10 || Math.abs(this.vy) > 10) {
            this.rafId = requestAnimationFrame(this.tick);
        }

    }
}

customElements.define("leftbar-component", leftbarComponent);




