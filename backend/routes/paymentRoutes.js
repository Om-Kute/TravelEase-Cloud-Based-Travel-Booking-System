import express from "express";

import {

    processPayment,

    getPaymentById,

    getMyPayments,

    getAllPayments,

    refundPayment

} from "../controllers/paymentController.js";

import authMiddleware, {

    adminMiddleware

} from "../middleware/authMiddleware.js";

const router = express.Router();

/* ==========================================
   USER ROUTES
========================================== */

router.post(

    "/",

    authMiddleware,

    processPayment

);

router.get(

    "/my-payments",

    authMiddleware,

    getMyPayments

);

router.get(

    "/:id",

    authMiddleware,

    getPaymentById

);

/* ==========================================
   ADMIN ROUTES
========================================== */

router.get(

    "/",

    authMiddleware,

    adminMiddleware,

    getAllPayments

);

router.put(

    "/refund/:id",

    authMiddleware,

    adminMiddleware,

    refundPayment

);

export default router;