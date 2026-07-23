/* =====================================================
   TravelEase Frontend Configuration
===================================================== */

const CONFIG = {

    APP_NAME: "TravelEase",

    APP_VERSION: "2.0.0",

    API_BASE_URL: "/api",

    IMAGE_BASE_URL: "/uploads",

    CURRENCY_SYMBOL: "₹",

    DEFAULT_LANGUAGE: "en",

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

    HOTELS: {

        ALL: `${CONFIG.API_BASE_URL}/hotels`,
        DETAILS: `${CONFIG.API_BASE_URL}/hotels`

    },

    BOOKINGS: {

        CREATE: `${CONFIG.API_BASE_URL}/bookings`,
        HISTORY: `${CONFIG.API_BASE_URL}/bookings/my-bookings`,
        CANCEL: `${CONFIG.API_BASE_URL}/bookings/cancel`

    },

    PAYMENTS: {

        CREATE: `${CONFIG.API_BASE_URL}/payments`,
        VERIFY: `${CONFIG.API_BASE_URL}/payments/verify`

    }

};

window.CONFIG = CONFIG;
window.API = API;
