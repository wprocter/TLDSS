$(document).ready(function () {
    var tickets = [];

    // Function to generate ticket cards
    function generateTicketCards(tickets) {
        const container = $("#tickets-container");
        container.empty(); // Clear existing content
        tickets.forEach(ticket => {
            const statusClass = `status-${ticket.status.toLowerCase().replace(" ", "-")}`;
            const card = `
                <div class="col-md-4">
                    <div class="ticket-card" data-id="${ticket.id}">
                        <h5>${ticket.title}</h5>
                        <p>${ticket.description}</p>
                        <p><strong>Status:</strong> <span class="${statusClass}">${ticket.status}</span></p>
                    </div>
                </div>
            `;
            container.append(card);
        });

        // Add click event to ticket cards
        $(".ticket-card").on("click", function () {
            const ticketId = $(this).data("id");
            showTicketDetails(ticketId);
        });
    }

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
            $("#openTickets").append(`<li>${ticket.vdu} - ${ticket.title}</li>`);
        });

        $("#inProgressTickets").empty();
        inProgressTickets.forEach(ticket => {
            $("#inProgressTickets").append(`<li>${ticket.vdu} - ${ticket.title}</li>`);
        });

        $("#resolvedTickets").empty();
        resolvedTickets.forEach(ticket => {
            $("#resolvedTickets").append(`<li>${ticket.vdu} - ${ticket.title}</li>`);
        });
    }

    fetch('tickets.json')
        .then(response => response.json())
        .then(data => {
            tickets = data;
            generateTicketCards(tickets);
            updateSidebarMenu(tickets);
        })
        .catch(err => console.error(err));
});