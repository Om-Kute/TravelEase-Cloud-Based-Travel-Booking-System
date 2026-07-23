/* ==========================================================
   TravelEase Payment Module
========================================================== */

let booking = null;

document.addEventListener("DOMContentLoaded", () => {
    loadPaymentSummary();

    document
        .getElementById("paymentForm")
        .addEventListener("submit", processPayment);
});

/* ==========================================================
   Load Payment Summary
========================================================== */

function loadPaymentSummary() {

    booking = JSON.parse(
        localStorage.getItem(CONFIG.LOCAL_STORAGE.BOOKINGS)
    );

    if (!booking) {
        alert("No booking found.");
        window.location.href = "booking.html";
        return;
    }

    document.getElementById("paymentSummary").innerHTML = `
        <h3>${booking.hotelName}</h3>

        <p><strong>Location:</strong> ${booking.city}</p>

        <p><strong>Check In:</strong> ${booking.checkInDate}</p>

        <p><strong>Check Out:</strong> ${booking.checkOutDate}</p>

        <p><strong>Guests:</strong> ${booking.totalGuests}</p>

        <p><strong>Price:</strong> ₹${booking.price}</p>

        <p><strong>Rating:</strong> ⭐ ${booking.rating}</p>
    `;
}

/* ==========================================================
   Payment
========================================================== */

async function processPayment(e) {

    e.preventDefault();

    const cardName = document.getElementById("cardName").value.trim();
    const cardNumber = document.getElementById("cardNumber").value.trim();
    const expiry = document.getElementById("expiry").value;
    const cvv = document.getElementById("cvv").value.trim();

    if (!cardName || !cardNumber || !expiry || !cvv) {
        alert("Please fill all payment details.");
        return;
    }

    const bookingData = {

        hotel: booking.hotelId,

        guestName: booking.guestName,

        guestEmail: booking.guestEmail,

        guestMobile: booking.guestMobile,

        checkInDate: booking.checkInDate,

        checkOutDate: booking.checkOutDate,

        totalGuests: booking.totalGuests,

        roomType: booking.roomType
    };

    try {

        const response = await api.post(
            API.BOOKINGS.CREATE,
            bookingData
        );

        alert("Payment Successful!\nBooking Confirmed.");

        localStorage.setItem(
            "lastBooking",
            JSON.stringify(response.booking)
        );

        localStorage.removeItem(CONFIG.LOCAL_STORAGE.BOOKINGS);

        window.location.href = "history.html";

    } catch (error) {

        console.error(error);

        alert(error.message || "Payment Failed");
    }
}

/* ==========================================================
   Card Number Format
========================================================== */

const cardInput = document.getElementById("cardNumber");

if (cardInput) {

    cardInput.addEventListener("input", function () {

        let value = this.value.replace(/\D/g, "");

        value = value.match(/.{1,4}/g);

        this.value = value ? value.join(" ") : "";

    });

}

/* ==========================================================
   CVV Validation
========================================================== */

const cvvInput = document.getElementById("cvv");

if (cvvInput) {

    cvvInput.addEventListener("input", function () {

        this.value = this.value.replace(/\D/g, "");

        if (this.value.length > 3) {
            this.value = this.value.slice(0, 3);
        }

    });

}

console.log("Payment Module Loaded");
