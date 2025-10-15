class rightBar extends HTMLElement {
    constructor() {
        super()
        this.innerHTML = `
        <div class="sidebar">
            <div style="height:50px"></div>
            <a href="clicky.html" class="btn" style="width:170px"> Click-idi-clack </a>
            <a href="timed-clicky.html" class="btn" style="width:170px"> Click-idi-timed</a>
            <a href="shee.html" class="btn" style="width:170px"> Sheeee~~ </a>
            <a href="bouncy.html" class="btn" style="width:170px"> Weewaah </a>
            <a href="pew.html" class="btn" style="width:170px"> pew pew pew </a>
        </div>
        `;

        this.querySelectorAll("a").forEach(link => {
            if (link.pathname === window.location.pathname) {
                link.classList.add("active");
            }
        });
    }
}

customElements.define("rightbar-component", rightBar);

