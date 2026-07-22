import bcrypt from "bcryptjs";
import User from "../models/User.js";

/* ==========================================
   GET ALL USERS
========================================== */

export const getAllUsers = async (req, res) => {

    try {

        const users = await User.find().select("-password");

        res.status(200).json({

            success: true,

            count: users.length,

            users

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ==========================================
   GET USER BY ID
========================================== */

export const getUserById = async (req, res) => {

    try {

        const user = await User.findById(req.params.id).select("-password");

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        res.status(200).json({

            success: true,

            user

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ==========================================
   UPDATE PROFILE
========================================== */

export const updateUser = async (req, res) => {

    try {

        const {

            fullName,

            mobile,

            profileImage

        } = req.body;

        const updatedUser = await User.findByIdAndUpdate(

            req.params.id,

            {

                fullName,

                mobile,

                profileImage

            },

            {

                new: true,

                runValidators: true

            }

        ).select("-password");

        if (!updatedUser) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        res.status(200).json({

            success: true,

            message: "Profile Updated Successfully",

            user: updatedUser

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ==========================================
   CHANGE PASSWORD
========================================== */

export const changePassword = async (req, res) => {

    try {

        const {

            currentPassword,

            newPassword

        } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        const isMatch = await bcrypt.compare(

            currentPassword,

            user.password

        );

        if (!isMatch) {

            return res.status(400).json({

                success: false,

                message: "Current password is incorrect"

            });

        }

        user.password = await bcrypt.hash(newPassword, 10);

        await user.save();

        res.status(200).json({

            success: true,

            message: "Password Changed Successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ==========================================
   DELETE USER
========================================== */

export const deleteUser = async (req, res) => {

    try {

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        res.status(200).json({

            success: true,

            message: "User Deleted Successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};