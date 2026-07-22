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

        const token = localStorage.getItem(STORAGE.TOKEN);

        return {
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : ""
        };

    }

    /* ======================================================
       GET Request
    ====================================================== */

    async get(endpoint) {

        try {

            const response = await fetch(endpoint, {
                method: "GET",
                headers: this.getHeaders()
            });

            return await this.handleResponse(response);

        } catch (error) {

            console.error(error);

            throw error;

        }

    }

    /* ======================================================
       POST Request
    ====================================================== */

    async post(endpoint, data) {

        try {

            const response = await fetch(endpoint, {

                method: "POST",

                headers: this.getHeaders(),

                body: JSON.stringify(data)

            });

            return await this.handleResponse(response);

        } catch (error) {

            console.error(error);

            throw error;

        }

    }

    /* ======================================================
       PUT Request
    ====================================================== */

    async put(endpoint, data) {

        try {

            const response = await fetch(endpoint, {

                method: "PUT",

                headers: this.getHeaders(),

                body: JSON.stringify(data)

            });

            return await this.handleResponse(response);

        } catch (error) {

            console.error(error);

            throw error;

        }

    }

    /* ======================================================
       DELETE Request
    ====================================================== */

    async delete(endpoint) {

        try {

            const response = await fetch(endpoint, {

                method: "DELETE",

                headers: this.getHeaders()

            });

            return await this.handleResponse(response);

        } catch (error) {

            console.error(error);

            throw error;

        }

    }

    /* ======================================================
       Upload File
    ====================================================== */

    async upload(endpoint, formData) {

        try {

            const token = localStorage.getItem(STORAGE.TOKEN);

            const response = await fetch(endpoint, {

                method: "POST",

                headers: {

                    Authorization: token
                        ? `Bearer ${token}`
                        : ""

                },

                body: formData

            });

            return await this.handleResponse(response);

        } catch (error) {

            console.error(error);

            throw error;

        }

    }

    /* ======================================================
       Handle Response
    ====================================================== */

    async handleResponse(response) {

        const data = await response.json();

        if (!response.ok) {

            throw new Error(
                data.message || "API Request Failed"
            );

        }

        return data;

    }

}

/* ==========================================================
   Export API Instance
========================================================== */

const api = new ApiService();

console.log("API Service Loaded");