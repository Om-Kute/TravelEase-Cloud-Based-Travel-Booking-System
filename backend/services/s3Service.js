import {
    uploadToS3,
    deleteFromS3,
    getSignedUrl
} from "../config/aws.js";

/* ==========================================
   UPLOAD FILE
========================================== */

export const uploadFile = async (file, folder = "uploads") => {

    const fileName = `${folder}/${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;

    const result = await uploadToS3(file, fileName);

    return {

        key: result.Key,

        bucket: result.Bucket,

        location: result.Location,

        etag: result.ETag

    };

};

/* ==========================================
   UPLOAD MULTIPLE FILES
========================================== */

export const uploadFiles = async (files, folder = "uploads") => {

    const uploadedFiles = [];

    for (const file of files) {

        const uploaded = await uploadFile(file, folder);

        uploadedFiles.push(uploaded);

    }

    return uploadedFiles;

};

/* ==========================================
   DELETE FILE
========================================== */

export const deleteFile = async (key) => {

    return await deleteFromS3(key);

};

/* ==========================================
   GET SIGNED URL
========================================== */

export const getFileUrl = (key, expires = 300) => {

    return getSignedUrl(key, expires);

};

export default {

    uploadFile,

    uploadFiles,

    deleteFile,

    getFileUrl

};