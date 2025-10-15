class enemy extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <div class="circle2">
            </div>
        `;
    }
}

customElements.define("enemy-component", enemy);


