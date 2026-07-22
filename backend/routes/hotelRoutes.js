import express from "express";

import {

    getAllHotels,

    getHotelById,

    createHotel,

    updateHotel,

    deleteHotel,

    searchHotels

} from "../controllers/hotelController.js";

import authMiddleware, {

    adminMiddleware

} from "../middleware/authMiddleware.js";

const router = express.Router();

/* ==========================================
   PUBLIC ROUTES
========================================== */

router.get(

    "/",

    getAllHotels

);

router.get(

    "/search",

    searchHotels

);

router.get(

    "/:id",

    getHotelById

);

/* ==========================================
   ADMIN ROUTES
========================================== */

router.post(

    "/",

    authMiddleware,

    adminMiddleware,

    createHotel

);

router.put(

    "/:id",

    authMiddleware,

    adminMiddleware,

    updateHotel

);

router.delete(

    "/:id",

    authMiddleware,

    adminMiddleware,

    deleteHotel

);

export default router;