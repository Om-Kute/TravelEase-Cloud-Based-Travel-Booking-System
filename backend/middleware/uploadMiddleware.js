import multer from "multer";

const storage = multer.memoryStorage();

const imageFilter = (req, file, cb) => {

    const allowedTypes = [

        "image/jpeg",

        "image/jpg",

        "image/png",

        "image/webp"

    ];

    if (allowedTypes.includes(file.mimetype)) {

        cb(null, true);

    } else {

        cb(

            new Error(

                "Only JPG, JPEG, PNG and WEBP images are allowed."

            ),

            false

        );

    }

};

const upload = multer({

    storage,

    fileFilter: imageFilter,

    limits: {

        fileSize: 5 * 1024 * 1024

    }

});

export const uploadSingle = upload.single("image");

export const uploadMultiple = upload.array("images", 10);

export default upload;