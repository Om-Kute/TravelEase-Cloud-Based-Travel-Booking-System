/* =====================================================
   TravelEase Frontend Configuration
===================================================== */

const CONFIG = {

    APP_NAME: "TravelEase",

    APP_VERSION: "1.0.0",

    API_BASE_URL: "http://localhost:5000/api",

    IMAGE_BASE_URL: "http://localhost:5000/uploads",

    DEFAULT_CURRENCY: "INR",

    DEFAULT_LANGUAGE: "en",

    PAGINATION_LIMIT: 10,

    HOTEL_PAGE_SIZE: 9,

    MAX_FILE_SIZE: 5 * 1024 * 1024,

    ALLOWED_IMAGE_TYPES: [

        "image/jpeg",

        "image/jpg",

        "image/png",

        "image/webp"

    ],

    BOOKING_STATUS: {

        PENDING: "Pending",

        CONFIRMED: "Confirmed",

        COMPLETED: "Completed",

        CANCELLED: "Cancelled"

    },

    PAYMENT_STATUS: {

        PENDING: "Pending",

        SUCCESS: "Success",

        FAILED: "Failed"

    },

    LOCAL_STORAGE: {

        TOKEN: "travel_token",

        USER: "travel_user",

        BOOKINGS: "travel_bookings"

    }

};

/* =====================================================
   API ENDPOINTS
===================================================== */

const API = {

    AUTH: {

        REGISTER: `${CONFIG.API_BASE_URL}/auth/register`,

        LOGIN: `${CONFIG.API_BASE_URL}/auth/login`,

        PROFILE: `${CONFIG.API_BASE_URL}/auth/profile`

    },

    USERS: {

        ALL: `${CONFIG.API_BASE_URL}/users`,

        UPDATE: `${CONFIG.API_BASE_URL}/users/update`

    },

    HOTELS: {

        ALL: `${CONFIG.API_BASE_URL}/hotels`,

        DETAILS: `${CONFIG.API_BASE_URL}/hotels`,

        SEARCH: `${CONFIG.API_BASE_URL}/hotels/search`

    },

    BOOKINGS: {

        CREATE: `${CONFIG.API_BASE_URL}/bookings`,

        HISTORY: `${CONFIG.API_BASE_URL}/bookings/history`,

        CANCEL: `${CONFIG.API_BASE_URL}/bookings/cancel`

    },

    PAYMENTS: {

        CREATE: `${CONFIG.API_BASE_URL}/payments`,

        VERIFY: `${CONFIG.API_BASE_URL}/payments/verify`

    },

    UPLOAD: {

        IMAGE: `${CONFIG.API_BASE_URL}/upload`

    }

};

/* =====================================================
   COMMON HEADERS
===================================================== */

function getHeaders() {

    const token = localStorage.getItem(CONFIG.LOCAL_STORAGE.TOKEN);

    return {

        "Content-Type": "application/json",

        Authorization: token ? `Bearer ${token}` : ""

    };

}

/* =====================================================
   EXPORTS
===================================================== */

window.CONFIG = CONFIG;
window.API = API;
window.getHeaders = getHeaders;