/* ==========================================================
   TravelEase Booking Module
========================================================== */

let bookingData = null;

/* ==========================================================
   Page Load
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadBookingSummary();

});

/* ==========================================================
   Load Booking Summary
========================================================== */

function loadBookingSummary() {

    const data = localStorage.getItem(STORAGE.BOOKING);

    if (!data) {

        window.location.href = "hotels.html";

        return;

    }

    bookingData = JSON.parse(data);

    const summary = document.getElementById("bookingSummary");

    if (!summary) return;

    summary.innerHTML = `

        <h2>${bookingData.name}</h2>

        <p><strong>Location:</strong> ${bookingData.city}</p>

        <p><strong>Price:</strong> ${CONFIG.CURRENCY_SYMBOL}${bookingData.price} / Night</p>

        <p><strong>Rating:</strong> ⭐ ${bookingData.rating}</p>

    `;

}

/* ==========================================================
   Booking Form
========================================================== */

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

    bookingForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const checkIn =
            document.getElementById("checkIn").value;

        const checkOut =
            document.getElementById("checkOut").value;

        const guests =
            document.getElementById("guests").value;

        if (!validateDate(checkIn, checkOut).status) {

            alert(validateDate(checkIn, checkOut).message);

            return;

        }

        if (!validateGuests(guests).status) {

            alert(validateGuests(guests).message);

            return;

        }

        const booking = {

            hotelId: bookingData.id,

            hotelName: bookingData.name,

            city: bookingData.city,

            checkIn,

            checkOut,

            guests,

            price: bookingData.price

        };

        try {

            const response = await api.post(

                API.BOOKING,

                booking

            );

            localStorage.setItem(

                STORAGE.BOOKING,

                JSON.stringify(response.booking || booking)

            );

            alert("Booking Successful");

            window.location.href = "payment.html";

        } catch (error) {

            alert(error.message);

        }

    });

}

/* ==========================================================
   Calculate Nights
========================================================== */

function calculateNights(checkIn, checkOut) {

    const start = new Date(checkIn);

    const end = new Date(checkOut);

    const difference = end - start;

    return Math.ceil(difference / (1000 * 60 * 60 * 24));

}

/* ==========================================================
   Calculate Total Amount
========================================================== */

function calculateTotal(price, nights) {

    return price * nights;

}

console.log("Booking Module Loaded");