import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(

    {

        user: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },

        hotel: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Hotel",

            required: true

        },

        guestName: {

            type: String,

            required: true,

            trim: true

        },

        guestEmail: {

            type: String,

            required: true,

            lowercase: true,

            trim: true

        },

        guestMobile: {

            type: String,

            required: true,

            trim: true

        },

        checkInDate: {

            type: Date,

            required: true

        },

        checkOutDate: {

            type: Date,

            required: true

        },

        totalGuests: {

            type: Number,

            required: true,

            default: 1

        },

        totalNights: {

            type: Number,

            required: true

        },

        roomType: {

            type: String,

            default: "Standard"

        },

        totalAmount: {

            type: Number,

            required: true

        },

        bookingStatus: {

            type: String,

            enum: [

                "Pending",

                "Confirmed",

                "Cancelled",

                "Completed"

            ],

            default: "Pending"

        },

        paymentStatus: {

            type: String,

            enum: [

                "Pending",

                "Paid",

                "Refunded"

            ],

            default: "Pending"

        }

    },

    {

        timestamps: true

    }

);

export default mongoose.model("Booking", bookingSchema);