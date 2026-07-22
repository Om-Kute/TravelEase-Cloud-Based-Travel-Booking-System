import express from "express";

import {

    register,

    login,

    logout,

    getProfile

} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import {

    validateRegister,

    validateLogin

} from "../middleware/validationMiddleware.js";

const router = express.Router();

/* ==========================================
   PUBLIC ROUTES
========================================== */

router.post(

    "/register",

    validateRegister,

    register

);

router.post(

    "/login",

    validateLogin,

    login

);

/* ==========================================
   PROTECTED ROUTES
========================================== */

router.get(

    "/profile",

    authMiddleware,

    getProfile

);

router.post(

    "/logout",

    authMiddleware,

    logout

);

export default router;