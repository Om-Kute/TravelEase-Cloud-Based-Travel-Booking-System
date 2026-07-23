/* ==========================================================
   TravelEase API Service
========================================================== */

class ApiService {

    constructor() {
        this.baseURL = CONFIG.API_BASE_URL;
    }

    /* ======================================================
       Common Headers
    ====================================================== */

    getHeaders() {

        const token = localStorage.getItem(CONFIG.LOCAL_STORAGE.TOKEN);

        return {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` })
        };

    }

    /* ======================================================
       GET Request
    ====================================================== */

    async get(endpoint) {

        const response = await fetch(endpoint, {
            method: "GET",
            headers: this.getHeaders()
        });

        return this.handleResponse(response);

    }

    /* ======================================================
       POST Request
    ====================================================== */

    async post(endpoint, data) {

        console.log("========== API REQUEST ==========");
        console.log("Endpoint :", endpoint);
        console.log("Request :", data);

        const response = await fetch(endpoint, {

            method: "POST",

            headers: this.getHeaders(),

            body: JSON.stringify(data)

        });

        return this.handleResponse(response);

    }

    /* ======================================================
       PUT Request
    ====================================================== */

    async put(endpoint, data) {

        const response = await fetch(endpoint, {

            method: "PUT",

            headers: this.getHeaders(),

            body: JSON.stringify(data)

        });

        return this.handleResponse(response);

    }

    /* ======================================================
       DELETE Request
    ====================================================== */

    async delete(endpoint) {

        const response = await fetch(endpoint, {

            method: "DELETE",

            headers: this.getHeaders()

        });

        return this.handleResponse(response);

    }

    /* ======================================================
       Upload
    ====================================================== */

    async upload(endpoint, formData) {

        const token = localStorage.getItem(CONFIG.LOCAL_STORAGE.TOKEN);

        const response = await fetch(endpoint, {

            method: "POST",

            headers: token
                ? {
                    Authorization: `Bearer ${token}`
                  }
                : {},

            body: formData

        });

        return this.handleResponse(response);

    }

    /* ======================================================
       Response Handler
    ====================================================== */

    async handleResponse(response) {

        const contentType = response.headers.get("content-type");

        let data;

        if (contentType && contentType.includes("application/json")) {

            data = await response.json();

        } else {

            const text = await response.text();

            throw new Error(text);

        }

        console.log("========== API RESPONSE ==========");
        console.log(data);

        if (!response.ok) {

            throw new Error(data.message || "API Request Failed");

        }

        return data;

    }

}

/* ==========================================================
   Export API Instance
========================================================== */

const api = new ApiService();

console.log("API Service Loaded");
