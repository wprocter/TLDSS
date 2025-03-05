(function() {
    const navbarHtml = `
        <nav>
            <a href="index.html" class="btn btn-primary">Home</a>
            <a href="scenario.html" class="btn btn-primary">Scenario</a>
            <a href="tasks.html" class="btn btn-primary">Tasks</a>
            <a href="network.html" class="btn btn-primary">Network Overview</a>
            <a href="hd.html" class="btn btn-primary">Helpdesk</a>
        </nav>
    `;
    document.addEventListener("DOMContentLoaded", function() {
        const header = document.querySelector("header");
        // Remove any existing nav element.
        const existingNav = header.querySelector("nav");
        if(existingNav) {
            header.removeChild(existingNav);
        }
        // Inject the new navbar HTML.
        header.insertAdjacentHTML("beforeend", navbarHtml);
    });
})();
