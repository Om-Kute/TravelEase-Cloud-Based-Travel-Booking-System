/* ==========================================================
   TravelEase Booking History Module
========================================================== */

let bookingHistory = [];

/* ==========================================================
   Page Load
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadBookingHistory();

});

/* ==========================================================
   Load Booking History
========================================================== */

async function loadBookingHistory() {

    try {

        const response = await api.get(API.HISTORY);

        bookingHistory = response.bookings || response;

        renderHistory(bookingHistory);

    } catch (error) {

        console.error(error);

        const container = document.getElementById("historyContainer");

        if (container) {

            container.innerHTML =
                "<h2>Unable to load booking history.</h2>";

        }

    }

}

/* ==========================================================
   Render Booking History
========================================================== */

function renderHistory(bookings) {

    const container = document.getElementById("historyContainer");

    if (!container) return;

    container.innerHTML = "";

    if (bookings.length === 0) {

        container.innerHTML = "<h2>No Booking History Found.</h2>";

        return;

    }

    bookings.forEach(item => {

        container.innerHTML += `

        <div class="booking-card">

            <h3>${item.hotelName}</h3>

            <p><strong>Booking ID:</strong> ${item.bookingId}</p>

            <p><strong>Location:</strong> ${item.city}</p>

            <p><strong>Check-In:</strong> ${item.checkIn}</p>

            <p><strong>Check-Out:</strong> ${item.checkOut}</p>

            <p><strong>Guests:</strong> ${item.guests}</p>

            <p><strong>Total:</strong> ${CONFIG.CURRENCY_SYMBOL}${item.amount}</p>

            <p><strong>Status:</strong> ${item.status}</p>

            <button
                class="btn"
                onclick="viewBooking('${item.bookingId}')">

                View

            </button>

            <button
                class="btn"
                onclick="cancelBooking('${item.bookingId}')">

                Cancel

            </button>

        </div>

        `;

    });

}

/* ==========================================================
   View Booking
========================================================== */

function viewBooking(bookingId) {

    localStorage.setItem("bookingId", bookingId);

    alert("Booking ID : " + bookingId);

}

/* ==========================================================
   Cancel Booking
========================================================== */

async function cancelBooking(bookingId) {

    const confirmCancel = confirm(
        "Do you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    try {

        const response = await api.post(

            API.CANCEL_BOOKING,

            {
                bookingId: bookingId
            }

        );

        alert(response.message || "Booking Cancelled");

        loadBookingHistory();

    } catch (error) {

        alert(error.message);

    }

}

/* ==========================================================
   Search Booking
========================================================== */

function searchBooking() {

    const keyword = document
        .getElementById("searchBooking")
        .value
        .toLowerCase();

    const filtered = bookingHistory.filter(item =>

        item.hotelName.toLowerCase().includes(keyword) ||

        item.city.toLowerCase().includes(keyword) ||

        item.bookingId.toLowerCase().includes(keyword)

    );

    renderHistory(filtered);

}

console.log("Booking History Module Loaded");