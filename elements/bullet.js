class bullet extends HTMLElement {
    constructor() {
        super();
        const host = this.attachShadow({ mode: 'open' });
        host.innerHTML = `
            <style>
            :host {
                display: block;
                position: fixed;

                top: -100;
            }
            
            .circle {
                border: 5px solid var(--clr-neon-yellow-l);
                box-shadow:
                    0px 0px 100px 0px var(--clr-neon-yellow),
                    0px 0px 50px 0px var(--clr-neon-yellow),
                    0px 0px 20px 0px var(--clr-neon-yellow),
                    0px 0px 5px 0px var(--clr-neon-yellow);

                background-color: white;

                border-radius: 50%;
                height: 5px;
                width: 5px;
            }
            </style>
            <div class="circle"></div>
        `;
    }
}

customElements.define("bullet-element", bullet);

