import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(

    {

        booking: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Booking",

            required: true

        },

        user: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },

        amount: {

            type: Number,

            required: true,

            min: 0

        },

        currency: {

            type: String,

            default: "INR"

        },

        paymentMethod: {

            type: String,

            enum: [

                "Credit Card",

                "Debit Card",

                "UPI",

                "Net Banking",

                "Wallet"

            ],

            required: true

        },

        transactionId: {

            type: String,

            required: true,

            unique: true

        },

        paymentGateway: {

            type: String,

            default: "Razorpay"

        },

        paymentStatus: {

            type: String,

            enum: [

                "Pending",

                "Success",

                "Failed",

                "Refunded"

            ],

            default: "Pending"

        },

        paidAt: {

            type: Date,

            default: Date.now

        },

        receiptUrl: {

            type: String,

            default: ""

        }

    },

    {

        timestamps: true

    }

);

export default mongoose.model("Payment", paymentSchema);