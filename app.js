
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
