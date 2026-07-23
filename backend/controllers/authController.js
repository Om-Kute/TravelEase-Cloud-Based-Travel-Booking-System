import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../config/jwt.js";

/* ==========================================
   REGISTER
========================================== */

export const register = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            mobile
        } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName: name,
            email,
            password: hashedPassword,
            mobile
        });

        const token = generateToken({
            id: user._id,
            role: user.role
        });

        res.status(201).json({
            success: true,
            message: "Registration Successful",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                mobile: user.mobile,
                role: user.role
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
   LOGIN
========================================== */

export const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        user.lastLogin = new Date();
        await user.save();

        const token = generateToken({
            id: user._id,
            role: user.role
        });

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                mobile: user.mobile,
                role: user.role
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
   PROFILE
========================================== */

export const getProfile = async (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user
    });

};

/* ==========================================
   LOGOUT
========================================== */

export const logout = async (req, res) => {

    res.status(200).json({
        success: true,
        message: "Logout Successful"
    });

};
