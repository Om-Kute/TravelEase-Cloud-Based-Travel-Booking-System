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

    console.log("Hotel ID:", hotelId);

    if (!hotelId) {
        alert("Hotel not selected.");
        window.location.href = "hotels.html";
        return;
    }

    try {

        const url = `${API.HOTELS.DETAILS}/${hotelId}`;

        console.log("Request URL:", url);

        const response = await api.get(url);

        console.log("API Response:", response);

        if (!response.success || !response.hotel) {
            throw new Error("Hotel not found");
        }

        selectedHotel = response.hotel;

        renderHotel(selectedHotel);

    } catch (error) {

        console.error("Hotel Details Error:", error);

        document.getElementById("hotelDetails").innerHTML = `
            <div style="text-align:center;padding:40px;">
                <h2>Unable to load Hotel Details</h2>
                <p>${error.message}</p>
                <button class="btn" onclick="goBack()">Back to Hotels</button>
            </div>
        `;
    }
}

/* ==========================================================
   Render Hotel
========================================================== */

function renderHotel(hotel) {

    const container = document.getElementById("hotelDetails");

    const image =
        hotel.thumbnail ||
        (hotel.images && hotel.images.length > 0
            ? hotel.images[0]
            : "assets/images/no-image.png");

    container.innerHTML = `

    <div class="hotel-details-card">

        <div class="hotel-image">
            <img src="${image}" alt="${hotel.hotelName}">
        </div>

        <div class="hotel-info">

            <h2>${hotel.hotelName}</h2>

            <p><strong>City:</strong> ${hotel.city}</p>

            <p><strong>Address:</strong> ${hotel.address}</p>

            <p><strong>Rating:</strong> ⭐ ${hotel.rating}</p>

            <p>
                <strong>Price:</strong>
                ${CONFIG.CURRENCY_SYMBOL}${hotel.pricePerNight} / Night
            </p>

            <p>${hotel.description}</p>

            <h3>Amenities</h3>

            <ul>
                ${(hotel.amenities || [])
                    .map(item => `<li>${item}</li>`)
                    .join("")}
            </ul>

            <button class="btn" onclick="bookHotel()">
                Book Now
            </button>

            <button class="btn" onclick="goBack()">
                Back
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
        CONFIG.LOCAL_STORAGE.BOOKINGS,
        JSON.stringify(selectedHotel)
    );

    window.location.href = "booking.html";
}

/* ==========================================================
   Back
========================================================== */

function goBack() {
    window.location.href = "hotels.html";
}

console.log("Hotel Details Module Loaded");
