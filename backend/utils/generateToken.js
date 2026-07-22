import jwt from "jsonwebtoken";

/* ==========================================
   GENERATE ACCESS TOKEN
========================================== */

export const generateAccessToken = (

    user

) => {

    return jwt.sign(

        {

            id: user._id,

            email: user.email,

            role: user.role

        },

        process.env.JWT_SECRET,

        {

            expiresIn: process.env.JWT_EXPIRE || "7d"

        }

    );

};

/* ==========================================
   GENERATE REFRESH TOKEN
========================================== */

export const generateRefreshToken = (

    user

) => {

    return jwt.sign(

        {

            id: user._id

        },

        process.env.JWT_SECRET,

        {

            expiresIn: "30d"

        }

    );

};

/* ==========================================
   VERIFY TOKEN
========================================== */

export const verifyToken = (

    token

) => {

    return jwt.verify(

        token,

        process.env.JWT_SECRET

    );

};

/* ==========================================
   DECODE TOKEN
========================================== */

export const decodeToken = (

    token

) => {

    return jwt.decode(token);

};

export default {

    generateAccessToken,

    generateRefreshToken,

    verifyToken,

    decodeToken

};