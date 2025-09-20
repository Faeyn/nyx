class headerComponent extends HTMLElement {
    timerId;

    connectedCallback() {
        this.innerHTML = `
        <header class="header">
            <a href="index.html" class="link">
                <p class="blue">
                    Start
                </p>
            </a>
            <p id="clock" class="blue">--:--:--</p>
        </header>
        `;

        const clockEl = this.querySelector("#clock");

        const tick = () => {
            clockEl.textContent = new Date().toLocaleString('nl-NL', {
                hour: '2-digit', minute: '2-digit', hour12: false
            });
        };

        tick();
        this.timerId = setInterval(tick, 60000);
    }

    disconnectedCallback() {
        if (this.timerId) clearInterval(this.timerId);
    }
}

customElements.define("header-component", headerComponent);
