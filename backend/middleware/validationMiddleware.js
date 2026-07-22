const validateRegister = (req, res, next) => {

    const {

        fullName,

        email,

        password,

        mobile

    } = req.body;

    if (

        !fullName ||

        !email ||

        !password ||

        !mobile

    ) {

        return res.status(400).json({

            success: false,

            message: "All fields are required."

        });

    }

    const emailRegex =

        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

        return res.status(400).json({

            success: false,

            message: "Invalid email address."

        });

    }

    if (password.length < 8) {

        return res.status(400).json({

            success: false,

            message: "Password must be at least 8 characters."

        });

    }

    const mobileRegex = /^[0-9]{10}$/;

    if (!mobileRegex.test(mobile)) {

        return res.status(400).json({

            success: false,

            message: "Invalid mobile number."

        });

    }

    next();

};

const validateLogin = (req, res, next) => {

    const {

        email,

        password

    } = req.body;

    if (!email || !password) {

        return res.status(400).json({

            success: false,

            message: "Email and Password are required."

        });

    }

    next();

};

const validateBooking = (req, res, next) => {

    const {

        guestName,

        guestEmail,

        guestMobile,

        checkInDate,

        checkOutDate

    } = req.body;

    if (

        !guestName ||

        !guestEmail ||

        !guestMobile ||

        !checkInDate ||

        !checkOutDate

    ) {

        return res.status(400).json({

            success: false,

            message: "Please fill all booking details."

        });

    }

    next();

};

export {

    validateRegister,

    validateLogin,

    validateBooking

};