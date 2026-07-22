import mongoose from "mongoose";

const userSchema = new mongoose.Schema(

    {

        fullName: {

            type: String,

            required: true,

            trim: true

        },

        email: {

            type: String,

            required: true,

            unique: true,

            lowercase: true,

            trim: true

        },

        password: {

            type: String,

            required: true

        },

        mobile: {

            type: String,

            required: true,

            trim: true

        },

        profileImage: {

            type: String,

            default: ""

        },

        role: {

            type: String,

            enum: ["user", "admin"],

            default: "user"

        },

        isVerified: {

            type: Boolean,

            default: false

        },

        isActive: {

            type: Boolean,

            default: true

        },

        lastLogin: {

            type: Date,

            default: null

        }

    },

    {

        timestamps: true

    }

);

export default mongoose.model("User", userSchema);