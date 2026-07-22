/* ==========================================================
   TravelEase Authentication
========================================================== */

const Auth = {

    /* ======================================================
       Login
    ====================================================== */

    async login(email, password) {

        try {

            const response = await api.post(API.LOGIN, {

                email,
                password

            });

            localStorage.setItem(
                STORAGE.TOKEN,
                response.token
            );

            localStorage.setItem(
                STORAGE.USER,
                JSON.stringify(response.user)
            );

            alert("Login Successful");

            window.location.href = "index.html";

        } catch (error) {

            alert(error.message);

        }

    },

    /* ======================================================
       Signup
    ====================================================== */

    async signup(userData) {

        try {

            const response = await api.post(
                API.SIGNUP,
                userData
            );

            alert(response.message);

            window.location.href = "login.html";

        } catch (error) {

            alert(error.message);

        }

    },

    /* ======================================================
       Logout
    ====================================================== */

    logout() {

        localStorage.removeItem(STORAGE.TOKEN);

        localStorage.removeItem(STORAGE.USER);

        alert("Logged Out Successfully");

        window.location.href = "login.html";

    },

    /* ======================================================
       Check Login
    ====================================================== */

    isLoggedIn() {

        return localStorage.getItem(STORAGE.TOKEN) !== null;

    },

    /* ======================================================
       Get Current User
    ====================================================== */

    getUser() {

        return JSON.parse(
            localStorage.getItem(STORAGE.USER)
        );

    }

};

/* ==========================================================
   Login Form
========================================================== */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        const emailValidation =
            validateEmail(email);

        if (!emailValidation.status) {

            alert(emailValidation.message);

            return;

        }

        await Auth.login(email, password);

    });

}

/* ==========================================================
   Signup Form
========================================================== */

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const mobile =
            document.getElementById("mobile").value.trim();

        const password =
            document.getElementById("password").value;

        const confirm =
            document.getElementById("confirmPassword").value;

        if (!validateName(name).status) {

            alert(validateName(name).message);

            return;

        }

        if (!validateEmail(email).status) {

            alert(validateEmail(email).message);

            return;

        }

        if (!validateMobile(mobile).status) {

            alert(validateMobile(mobile).message);

            return;

        }

        if (!validatePassword(password).status) {

            alert(validatePassword(password).message);

            return;

        }

        if (!confirmPassword(password, confirm).status) {

            alert(confirmPassword(password, confirm).message);

            return;

        }

        await Auth.signup({

            name,
            email,
            mobile,
            password

        });

    });

}

console.log("Authentication Module Loaded");