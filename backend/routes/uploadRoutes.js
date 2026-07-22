import express from "express";

import {

    uploadImage,

    uploadImages,

    getImageUrl,

    removeImage

} from "../controllers/uploadController.js";

import authMiddleware, {

    adminMiddleware

} from "../middleware/authMiddleware.js";

import {

    uploadSingle,

    uploadMultiple

} from "../middleware/uploadMiddleware.js";

const router = express.Router();

/* ==========================================
   UPLOAD SINGLE IMAGE
========================================== */

router.post(

    "/single",

    authMiddleware,

    adminMiddleware,

    uploadSingle,

    uploadImage

);

/* ==========================================
   UPLOAD MULTIPLE IMAGES
========================================== */

router.post(

    "/multiple",

    authMiddleware,

    adminMiddleware,

    uploadMultiple,

    uploadImages

);

/* ==========================================
   GET SIGNED IMAGE URL
========================================== */

router.get(

    "/image/:key",

    authMiddleware,

    getImageUrl

);

/* ==========================================
   DELETE IMAGE
========================================== */

router.delete(

    "/image/:key",

    authMiddleware,

    adminMiddleware,

    removeImage

);

export default router;