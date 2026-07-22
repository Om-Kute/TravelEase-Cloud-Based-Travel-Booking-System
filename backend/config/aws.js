import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

AWS.config.update({

    accessKeyId: process.env.AWS_ACCESS_KEY_ID,

    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,

    region: process.env.AWS_REGION

});

const s3 = new AWS.S3({

    apiVersion: "2006-03-01"

});

export const uploadToS3 = async (file, key) => {

    const params = {

        Bucket: process.env.S3_BUCKET_NAME,

        Key: key,

        Body: file.buffer,

        ContentType: file.mimetype,

        ACL: "private"

    };

    return await s3.upload(params).promise();

};

export const deleteFromS3 = async (key) => {

    const params = {

        Bucket: process.env.S3_BUCKET_NAME,

        Key: key

    };

    return await s3.deleteObject(params).promise();

};

export const getSignedUrl = (key, expires = 300) => {

    return s3.getSignedUrl("getObject", {

        Bucket: process.env.S3_BUCKET_NAME,

        Key: key,

        Expires: expires

    });

};

export default s3;