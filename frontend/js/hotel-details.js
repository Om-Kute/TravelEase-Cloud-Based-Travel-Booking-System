/* ==========================================================
   TravelEase Hotel Details Module
========================================================== */

let selectedHotel = null;

/* ==========================================================
   Page Load
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadHotelDetails();

});

/* ==========================================================
   Load Hotel Details
========================================================== */

async function loadHotelDetails() {

    const hotelId = localStorage.getItem("hotelId");

    if (!hotelId) {

        window.location.href = "hotels.html";

        return;

    }

    try {

        const response = await api.get(`${API.HOTEL_DETAILS}/${hotelId}`);

        selectedHotel = response.hotel || response;

        renderHotel(selectedHotel);

    } catch (error) {

        console.error(error);

        const container = document.getElementById("hotelDetails");

        if (container) {

            container.innerHTML = "<h2>Unable to load hotel details.</h2>";

        }

    }

}

/* ==========================================================
   Render Hotel Details
========================================================== */

function renderHotel(hotel) {

    const container = document.getElementById("hotelDetails");

    if (!container) return;

    container.innerHTML = `

        <div class="hotel-details-card">

            <div class="hotel-image">

                <img src="${hotel.image}" alt="${hotel.name}">

            </div>

            <div class="hotel-info">

                <h2>${hotel.name}</h2>

                <p><strong>Location:</strong> ${hotel.city}</p>

                <p><strong>Rating:</strong> ⭐ ${hotel.rating}</p>

                <p><strong>Price:</strong> ${CONFIG.CURRENCY_SYMBOL}${hotel.price} / Night</p>

                <p><strong>Description:</strong></p>

                <p>${hotel.description}</p>

                <h3>Amenities</h3>

                <ul>

                    ${(hotel.amenities || []).map(item => `<li>${item}</li>`).join("")}

                </ul>

                <button class="btn" onclick="bookHotel()">

                    Book Now

                </button>

            </div>

        </div>

    `;

}

/* ==========================================================
   Book Hotel
========================================================== */

function bookHotel() {

    if (!selectedHotel) return;

    localStorage.setItem(

        STORAGE.BOOKING,

        JSON.stringify(selectedHotel)

    );

    window.location.href = "booking.html";

}

/* ==========================================================
   Go Back
========================================================== */

function goBack() {

    window.location.href = "hotels.html";

}

console.log("Hotel Details Module Loaded");