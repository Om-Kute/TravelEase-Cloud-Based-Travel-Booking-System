/* ==========================================================
   TravelEase Payment Module
========================================================== */

let booking = null;

/* ==========================================================
   Page Load
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadPaymentSummary();

});

/* ==========================================================
   Load Booking Summary
========================================================== */

function loadPaymentSummary() {

    const data = localStorage.getItem(STORAGE.BOOKING);

    if (!data) {

        window.location.href = "booking.html";

        return;

    }

    booking = JSON.parse(data);

    const summary = document.getElementById("paymentSummary");

    if (!summary) return;

    summary.innerHTML = `

        <h2>${booking.hotelName || booking.name}</h2>

        <p><strong>Location:</strong> ${booking.city}</p>

        <p><strong>Check-In:</strong> ${booking.checkIn}</p>

        <p><strong>Check-Out:</strong> ${booking.checkOut}</p>

        <p><strong>Guests:</strong> ${booking.guests}</p>

        <p><strong>Amount:</strong> ${CONFIG.CURRENCY_SYMBOL}${booking.price}</p>

    `;

}

/* ==========================================================
   Payment Form
========================================================== */

const paymentForm = document.getElementById("paymentForm");

if (paymentForm) {

    paymentForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const cardName =
            document.getElementById("cardName").value.trim();

        const cardNumber =
            document.getElementById("cardNumber").value.trim();

        const expiry =
            document.getElementById("expiry").value.trim();

        const cvv =
            document.getElementById("cvv").value.trim();

        if (
            !cardName ||
            !cardNumber ||
            !expiry ||
            !cvv
        ) {

            alert("Please fill all payment details.");

            return;

        }

        const paymentData = {

            bookingId: booking.id,

            hotelId: booking.hotelId,

            amount: booking.price,

            paymentMethod: "Card",

            status: PAYMENT_STATUS.SUCCESS

        };

        try {

            const response = await api.post(

                API.PAYMENT,

                paymentData

            );

            alert(response.message || "Payment Successful");

            window.location.href = "history.html";

        } catch (error) {

            alert(error.message);

        }

    });

}

/* ==========================================================
   Card Number Formatter
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