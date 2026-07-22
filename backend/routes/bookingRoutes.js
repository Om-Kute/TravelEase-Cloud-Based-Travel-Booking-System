import express from "express";

import {

    createBooking,

    getMyBookings,

    getBookingById,

    cancelBooking,

    getAllBookings

} from "../controllers/bookingController.js";

import authMiddleware, {

    adminMiddleware

} from "../middleware/authMiddleware.js";

import {

    validateBooking

} from "../middleware/validationMiddleware.js";

const router = express.Router();

/* ==========================================
   USER ROUTES
========================================== */

router.post(

    "/",

    authMiddleware,

    validateBooking,

    createBooking

);

router.get(

    "/my-bookings",

    authMiddleware,

    getMyBookings

);

router.get(

    "/:id",

    authMiddleware,

    getBookingById

);

router.put(

    "/cancel/:id",

    authMiddleware,

    cancelBooking

);

/* ==========================================
   ADMIN ROUTES
========================================== */

router.get(

    "/",

    authMiddleware,

    adminMiddleware,

    getAllBookings

);

export default router;