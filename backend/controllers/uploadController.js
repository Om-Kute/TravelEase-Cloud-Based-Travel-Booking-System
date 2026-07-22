import path from "path";
import { uploadToS3, deleteFromS3, getSignedUrl } from "../config/aws.js";

/* ==========================================
   UPLOAD SINGLE IMAGE
========================================== */

export const uploadImage = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "No file uploaded"

            });

        }

        const fileName =

            `uploads/${Date.now()}-${req.file.originalname.replace(/\s+/g, "-")}`;

        const result = await uploadToS3(

            req.file,

            fileName

        );

        res.status(201).json({

            success: true,

            message: "Image Uploaded Successfully",

            file: {

                key: result.Key,

                bucket: result.Bucket,

                location: result.Location

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ==========================================
   UPLOAD MULTIPLE IMAGES
========================================== */

export const uploadImages = async (req, res) => {

    try {

        if (!req.files || req.files.length === 0) {

            return res.status(400).json({

                success: false,

                message: "No files uploaded"

            });

        }

        const uploadedFiles = [];

        for (const file of req.files) {

            const fileName =

                `uploads/${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;

            const result = await uploadToS3(

                file,

                fileName

            );

            uploadedFiles.push({

                key: result.Key,

                bucket: result.Bucket,

                location: result.Location

            });

        }

        res.status(201).json({

            success: true,

            message: "Images Uploaded Successfully",

            files: uploadedFiles

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ==========================================
   GET SIGNED URL
========================================== */

export const getImageUrl = async (req, res) => {

    try {

        const { key } = req.params;

        const url = getSignedUrl(key);

        res.status(200).json({

            success: true,

            url

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ==========================================
   DELETE IMAGE
========================================== */

export const removeImage = async (req, res) => {

    try {

        const { key } = req.params;

        await deleteFromS3(key);

        res.status(200).json({

            success: true,

            message: "Image Deleted Successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};