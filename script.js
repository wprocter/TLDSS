$(document).ready(function () {
    var tickets = [];

    // Function to show ticket details
    function showTicketDetails(ticketId) {
        const ticket = tickets.find(t => t.id === ticketId);
        const detailsContainer = $("#ticketDetails");
        if (ticket) {
            const details = `
                <h4>${ticket.title}</h4>
                <p>${ticket.description}</p>
                <p><strong>Status:</strong> <span class="status-${ticket.status.toLowerCase().replace(" ", "-")}">${ticket.status}</span></p>
                <h5 class="mt-3">Updates</h5>
                ${ticket.updates.length > 0 ? ticket.updates.map(update => `
                    <div class="update">
                        <p class="author">${update.author}</p>
                        <p>${update.message}</p>
                        <small>${update.timestamp}</small>
                    </div>
                `).join("") : "<p>No updates yet.</p>"}
            `;
            detailsContainer.empty();
            detailsContainer.html(details).show();
        }
    }

    // Function to update the sidebar menu
    function updateSidebarMenu(tickets) {
        const openTickets = tickets.filter(t => t.status === "Open");
        const inProgressTickets = tickets.filter(t => t.status === "In Progress");
        const resolvedTickets = tickets.filter(t => t.status === "Resolved");

        $("#openBadge").text(openTickets.length);
        $("#inProgressBadge").text(inProgressTickets.length);
        $("#resolvedBadge").text(resolvedTickets.length);

        $("#openTickets").empty();
        openTickets.forEach(ticket => {
            $("#openTickets").append(`<li data-id="${ticket.id}">${ticket.vdu} - ${ticket.title}</li>`);
        });

        $("#inProgressTickets").empty();
        inProgressTickets.forEach(ticket => {
            $("#inProgressTickets").append(`<li data-id="${ticket.id}">${ticket.vdu} - ${ticket.title}</li>`);
        });

        $("#resolvedTickets").empty();
        resolvedTickets.forEach(ticket => {
            $("#resolvedTickets").append(`<li data-id="${ticket.id}">${ticket.vdu} - ${ticket.title}</li>`);
        });
    }

    // Make the lists clickable to show details
    $("#openTickets").on("click", "li", function() {
        showTicketDetails(parseInt($(this).data("id")));
    });
    $("#inProgressTickets").on("click", "li", function() {
        showTicketDetails(parseInt($(this).data("id")));
    });
    $("#resolvedTickets").on("click", "li", function() {
        showTicketDetails(parseInt($(this).data("id")));
    });

    fetch('tickets.json')
        .then(response => response.json())
        .then(data => {
            tickets = data;
            updateSidebarMenu(tickets);
        })
        .catch(err => console.error(err));
});