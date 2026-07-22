/* ==========================================================
   TravelEase Validation Utility
========================================================== */

/* ==========================================================
   Name Validation
========================================================== */

function validateName(name) {

    const pattern = /^[A-Za-z ]+$/;

    if (name.trim().length < VALIDATION.NAME_MIN_LENGTH) {

        return {
            status: false,
            message: "Name is too short."
        };

    }

    if (!pattern.test(name)) {

        return {
            status: false,
            message: "Only alphabets are allowed."
        };

    }

    return {
        status: true,
        message: "Valid Name"
    };

}

/* ==========================================================
   Email Validation
========================================================== */

function validateEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!pattern.test(email)) {

        return {
            status: false,
            message: "Invalid email address."
        };

    }

    return {
        status: true,
        message: "Valid Email"
    };

}

/* ==========================================================
   Mobile Validation
========================================================== */

function validateMobile(mobile) {

    const pattern = /^[6-9][0-9]{9}$/;

    if (!pattern.test(mobile)) {

        return {
            status: false,
            message: "Invalid mobile number."
        };

    }

    return {
        status: true,
        message: "Valid Mobile Number"
    };

}

/* ==========================================================
   Password Validation
========================================================== */

function validatePassword(password) {

    const pattern =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!pattern.test(password)) {

        return {
            status: false,
            message:
                "Password must contain uppercase, lowercase, number and special character."
        };

    }

    return {
        status: true,
        message: "Strong Password"
    };

}

/* ==========================================================
   Confirm Password
========================================================== */

function confirmPassword(password, confirm) {

    if (password !== confirm) {

        return {
            status: false,
            message: "Passwords do not match."
        };

    }

    return {
        status: true,
        message: "Password Matched"
    };

}

/* ==========================================================
   Empty Field Validation
========================================================== */

function isEmpty(value) {

    return value.trim() === "";

}

/* ==========================================================
   Date Validation
========================================================== */

function validateDate(checkIn, checkOut) {

    const start = new Date(checkIn);

    const end = new Date(checkOut);

    if (start >= end) {

        return {

            status: false,

            message: "Check-out date must be after check-in."

        };

    }

    return {

        status: true,

        message: "Valid Dates"

    };

}

/* ==========================================================
   Guest Validation
========================================================== */

function validateGuests(guests) {

    if (guests <= 0) {

        return {

            status: false,

            message: "Select at least one guest."

        };

    }

    return {

        status: true,

        message: "Valid Guest Count"

    };

}

/* ==========================================================
   Display Error
========================================================== */

function showError(element, message) {

    element.innerText = message;

    element.style.color = "#dc3545";

}

/* ==========================================================
   Display Success
========================================================== */

function showSuccess(element, message) {

    element.innerText = message;

    element.style.color = "#198754";

}

console.log("Validation Utility Loaded");