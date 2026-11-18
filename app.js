
function showToast(message) {
    const toast = document.createElement("div");

    toast.className = "toast";
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

document.querySelectorAll(".book-btn").forEach(button => {

    button.addEventListener("click", function(event) {

        event.preventDefault();

        document.querySelector("#booking").scrollIntoView({
            behavior: "smooth"
        });

        showToast("Please complete your ticket booking!");
    });

});


// Activity 7: Live Booking Summary

const match = document.getElementById("match");
const stand = document.getElementById("stand");
const quantity = document.getElementById("quantity");

const summary = document.getElementById("bookingSummary");

// Match-wise ticket prices
const ticketPrices = {
    "RCB vs CSK": {
        General: 1000,
        Premium: 2500,
        VIP: 5000
    },
    "MI vs KKR": {
        General: 1200,
        Premium: 3000,
        VIP: 6000
    }
};

function updateSummary(showNotification = true) {

    const selectedMatch = match.value;
    const selectedStand = stand.value;
    const ticketCount = Number(quantity.value);

    const price = ticketPrices[selectedMatch][selectedStand];

    const total = price * ticketCount;

    summary.innerHTML = `
        <h3>Booking Summary</h3>
        <p>Selected Match: ${selectedMatch}</p>
        <p>Stand: ${selectedStand}</p>
        <p>Ticket Price: ₹${price}</p>
        <p>Quantity: ${ticketCount}</p>
        <h3>Total Amount: ₹${total}</h3>
    `;

    if (showNotification) {
        showToast("Booking Summary Updated!");
    }
}

match.addEventListener("change", updateSummary);
stand.addEventListener("change", updateSummary);
quantity.addEventListener("input", updateSummary);

// Display initial summary
updateSummary(false);

// Activity 8: Team Filter
const teamFilter = document.getElementById("teamFilter");
const matchCards = document.querySelectorAll(".match-card");

if (teamFilter) {
    teamFilter.addEventListener("change", function () {
        const selectedTeam = teamFilter.value;

        matchCards.forEach(card => {
            const teams = card.dataset.team.split(" ");

            if (selectedTeam === "all" || teams.includes(selectedTeam)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
}

// Grid View
const gridView = document.getElementById("gridView");
const listView = document.getElementById("listView");
const matchGrid = document.getElementById("matchGrid");

if (gridView && matchGrid) {
    gridView.addEventListener("click", function () {
        matchGrid.classList.remove("list-view");
    });
}

// List View
if (listView && matchGrid) {
    listView.addEventListener("click", function () {
        matchGrid.classList.add("list-view");
    });
}
// Mobile Hamburger Menu
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
    menuToggle.onclick = function () {
        mainNav.classList.toggle("active");
    };
}
// Ticket Booking Functionality

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const quantity = Number(document.getElementById("quantity").value);

        const match = bookingForm.querySelector(
    'select[name="match"]'
)?.value || "Unknown Match";

const stand = bookingForm.querySelector(
    'select[name="stand"]'
)?.value || "General";

const prices = {
    General: 1000,
    Premium: 2500,
    VIP: 5000
};

const total = (prices[stand] || 1000) * quantity;

const booking = {
    id: "IPL" + Date.now(),
    name: name,
    email: email,
    phone: phone,
    match: match,
    stand: stand,
    quantity: quantity,
    total: total
};

const bookings = JSON.parse(
    localStorage.getItem("iplBookings") || "[]"
);

bookings.push(booking);

localStorage.setItem(
    "iplBookings",
    JSON.stringify(bookings)
);
displayBookings();

        alert("Booking Successful! Thank you, " + name);

        bookingForm.reset();
    });
}
// Display saved bookings

function displayBookings() {
    const tableBody = document.getElementById("bookingsTableBody");
    const message = document.getElementById("noBookingsMessage");

    if (!tableBody) return;

    const bookings = JSON.parse(
        localStorage.getItem("iplBookings") || "[]"
    );

    tableBody.innerHTML = "";

    if (message) {
        message.style.display = bookings.length === 0 ? "block" : "none";
    }

    bookings.forEach(function(booking) {
        const row = tableBody.insertRow();

        [
            booking.id,
            booking.name,
            booking.match,
            booking.stand,
            booking.quantity,
            "₹" + booking.total
        ].forEach(function(value) {
            const cell = row.insertCell();
            cell.textContent = value ?? "";
        });
    });
}

displayBookings();