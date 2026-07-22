/* ==========================================================
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

        const response = await api.get(API.HOTELS);

        hotels = response.hotels || response;

        displayHotels(hotels);

    } catch (error) {

        console.error(error);

        document.getElementById("hotelContainer").innerHTML =
            "<h2>Unable to load hotels.</h2>";

    }

}

/* ==========================================================
   Display Hotels
========================================================== */

function displayHotels(data) {

    const container = document.getElementById("hotelContainer");

    if (!container) return;

    container.innerHTML = "";

    if (data.length === 0) {

        container.innerHTML =
            "<h2>No Hotels Found</h2>";

        return;

    }

    data.forEach(hotel => {

        container.innerHTML += `

        <div class="hotel-card">

            <img src="${hotel.image}" alt="${hotel.name}">

            <div class="hotel-content">

                <h3>${hotel.name}</h3>

                <p><i class="fa-solid fa-location-dot"></i> ${hotel.city}</p>

                <p>⭐ ${hotel.rating}</p>

                <h4>${CONFIG.CURRENCY_SYMBOL}${hotel.price} / Night</h4>

                <button
                    class="btn"
                    onclick="viewHotel('${hotel.id}')">

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

    const keyword =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    const filteredHotels = hotels.filter(hotel =>

        hotel.name.toLowerCase().includes(keyword) ||

        hotel.city.toLowerCase().includes(keyword)

    );

    displayHotels(filteredHotels);

}

/* ==========================================================
   Filter By City
========================================================== */

function filterCity(city) {

    if (city === "All") {

        displayHotels(hotels);

        return;

    }

    const filtered = hotels.filter(hotel =>

        hotel.city === city

    );

    displayHotels(filtered);

}

/* ==========================================================
   Sort By Price
========================================================== */

function sortPrice(order) {

    let sorted = [...hotels];

    if (order === "low") {

        sorted.sort((a, b) => a.price - b.price);

    } else {

        sorted.sort((a, b) => b.price - a.price);

    }

    displayHotels(sorted);

}

/* ==========================================================
   View Hotel
========================================================== */

function viewHotel(id) {

    localStorage.setItem("hotelId", id);

    window.location.href = "hotel-details.html";

}

console.log("Hotels Module Loaded");