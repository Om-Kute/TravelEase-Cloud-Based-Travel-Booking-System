import express from "express";

import {

    getAllUsers,

    getUserById,

    updateUser,

    changePassword,

    deleteUser

} from "../controllers/userController.js";

import authMiddleware, {

    adminMiddleware

} from "../middleware/authMiddleware.js";

const router = express.Router();

/* ==========================================
   USER ROUTES
========================================== */

router.get(

    "/",

    authMiddleware,

    adminMiddleware,

    getAllUsers

);

router.get(

    "/:id",

    authMiddleware,

    getUserById

);

router.put(

    "/:id",

    authMiddleware,

    updateUser

);

router.put(

    "/change-password/:id",

    authMiddleware,

    changePassword

);

router.delete(

    "/:id",

    authMiddleware,

    adminMiddleware,

    deleteUser

);

export default router;