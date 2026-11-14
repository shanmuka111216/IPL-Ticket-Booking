
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
