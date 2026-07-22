/* ==========================================
   EMAIL VALIDATOR
========================================== */

export const isValidEmail = (email) => {

    const emailRegex =

        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);

};

/* ==========================================
   MOBILE VALIDATOR
========================================== */

export const isValidMobile = (mobile) => {

    const mobileRegex = /^[6-9]\d{9}$/;

    return mobileRegex.test(mobile);

};

/* ==========================================
   PASSWORD VALIDATOR
========================================== */

export const isStrongPassword = (password) => {

    const passwordRegex =

        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&^()_\-+=])[A-Za-z\d@$!%*?#&^()_\-+=]{8,}$/;

    return passwordRegex.test(password);

};

/* ==========================================
   OBJECT ID VALIDATOR
========================================== */

export const isValidObjectId = (id) => {

    return /^[0-9a-fA-F]{24}$/.test(id);

};

/* ==========================================
   DATE VALIDATOR
========================================== */

export const isValidDate = (date) => {

    return !isNaN(new Date(date).getTime());

};

/* ==========================================
   CHECK-IN / CHECK-OUT VALIDATOR
========================================== */

export const isValidBookingDates = (

    checkIn,

    checkOut

) => {

    const checkInDate = new Date(checkIn);

    const checkOutDate = new Date(checkOut);

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return (

        checkInDate >= today &&

        checkOutDate > checkInDate

    );

};

/* ==========================================
   FILE TYPE VALIDATOR
========================================== */

export const isValidImage = (mimeType) => {

    const allowedTypes = [

        "image/jpeg",

        "image/jpg",

        "image/png",

        "image/webp"

    ];

    return allowedTypes.includes(mimeType);

};

/* ==========================================
   FILE SIZE VALIDATOR
========================================== */

export const isValidFileSize = (

    size,

    maxSize = 5 * 1024 * 1024

) => {

    return size <= maxSize;

};

export default {

    isValidEmail,

    isValidMobile,

    isStrongPassword,

    isValidObjectId,

    isValidDate,

    isValidBookingDates,

    isValidImage,

    isValidFileSize

};