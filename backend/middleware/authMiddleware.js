import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {

    try {

        let token = null;

        if (

            req.headers.authorization &&

            req.headers.authorization.startsWith("Bearer ")

        ) {

            token = req.headers.authorization.split(" ")[1];

        }

        if (!token) {

            return res.status(401).json({

                success: false,

                message: "Access Denied. Token Missing."

            });

        }

        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET

        );

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {

            return res.status(401).json({

                success: false,

                message: "User Not Found"

            });

        }

        if (!user.isActive) {

            return res.status(403).json({

                success: false,

                message: "User Account is Disabled"

            });

        }

        req.user = user;

        next();

    } catch (error) {

        return res.status(401).json({

            success: false,

            message: "Invalid or Expired Token"

        });

    }

};

export const adminMiddleware = (req, res, next) => {

    if (req.user.role !== "admin") {

        return res.status(403).json({

            success: false,

            message: "Admin Access Required"

        });

    }

    next();

};

export default authMiddleware;
