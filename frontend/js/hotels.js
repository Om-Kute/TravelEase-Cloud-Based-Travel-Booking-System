k/* ==========================================================
   TravelEase Hotels Module
========================================================== */

let hotels = [];

/* ==========================================================
   Page Load
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    loadHotels();
});

/* ==========================================================
   Load Hotels
========================================================== */

async function loadHotels() {

    try {

        console.log("===== DEBUG =====");
        console.log("API.HOTELS.ALL =", API.HOTELS.ALL);
        console.log("Type =", typeof API.HOTELS.ALL);

        const response = await api.get(API.HOTELS.ALL);

        console.log("Response =", response);

        hotels = response.hotels || [];

        displayHotels(hotels);

    } catch (error) {

        console.error("Hotel Load Error:", error);

        document.getElementById("hotelContainer").innerHTML =
            `<h2>Unable to load hotels.</h2>
             <p style="color:red">${error.message}</p>`;
    }

}

/* ==========================================================
   Display Hotels
========================================================== */

function displayHotels(data) {

    const container = document.getElementById("hotelContainer");

    container.innerHTML = "";

    if (!data || data.length === 0) {

        container.innerHTML = "<h2>No Hotels Available</h2>";
        return;
    }

    data.forEach(hotel => {

        const image =
            hotel.thumbnail ||
            (hotel.images && hotel.images.length > 0
                ? hotel.images[0]
                : "assets/images/no-image.png");

        container.innerHTML += `
            <div class="hotel-card">

                <img src="${image}" alt="${hotel.hotelName}">

                <div class="hotel-content">

                    <h3>${hotel.hotelName}</h3>

                    <p>
                        <i class="fa-solid fa-location-dot"></i>
                        ${hotel.city}
                    </p>

                    <p>⭐ ${hotel.rating}</p>

                    <h4>
                        ${CONFIG.CURRENCY_SYMBOL}${hotel.pricePerNight} / Night
                    </h4>

                    <button
                        class="btn"
                        onclick="viewHotel('${hotel._id}')">
                        View Details
                    </button>

                </div>

            </div>
        `;
    });
}

/* ==========================================================
   Search Hotels
========================================================== */

function searchHotels() {

    const keyword = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const filtered = hotels.filter(hotel =>
        hotel.hotelName.toLowerCase().includes(keyword) ||
        hotel.city.toLowerCase().includes(keyword)
    );

    displayHotels(filtered);
}

/* ==========================================================
   View Hotel
========================================================== */

function viewHotel(id) {

    localStorage.setItem("hotelId", id);
    window.location.href = "hotel-details.html";

}

console.log("Hotels Module Loaded");
