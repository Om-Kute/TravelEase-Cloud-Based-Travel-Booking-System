import { v4 as uuidv4 } from "uuid";
import Payment from "../models/Payment.js";
import Booking from "../models/Booking.js";

/* ==========================================
   PROCESS PAYMENT
========================================== */

export const processPayment = async (req, res) => {

    try {

        const {

            bookingId,

            paymentMethod

        } = req.body;

        const booking = await Booking.findById(bookingId);

        if (!booking) {

            return res.status(404).json({

                success: false,

                message: "Booking not found"

            });

        }

        const payment = await Payment.create({

            booking: booking._id,

            user: booking.user,

            amount: booking.totalAmount,

            currency: "INR",

            paymentMethod,

            transactionId: uuidv4(),

            paymentGateway: "Razorpay",

            paymentStatus: "Success"

        });

        booking.paymentStatus = "Paid";

        booking.bookingStatus = "Confirmed";

        await booking.save();

        res.status(201).json({

            success: true,

            message: "Payment Successful",

            payment

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ==========================================
   GET PAYMENT BY ID
========================================== */

export const getPaymentById = async (req, res) => {

    try {

        const payment = await Payment.findById(req.params.id)

        .populate("booking")

        .populate("user", "-password");

        if (!payment) {

            return res.status(404).json({

                success: false,

                message: "Payment not found"

            });

        }

        res.status(200).json({

            success: true,

            payment

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ==========================================
   GET MY PAYMENTS
========================================== */

export const getMyPayments = async (req, res) => {

    try {

        const payments = await Payment.find({

            user: req.user._id

        })

        .populate("booking")

        .sort({

            createdAt: -1

        });

        res.status(200).json({

            success: true,

            count: payments.length,

            payments

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ==========================================
   GET ALL PAYMENTS (ADMIN)
========================================== */

export const getAllPayments = async (req, res) => {

    try {

        const payments = await Payment.find()

        .populate("user", "-password")

        .populate("booking")

        .sort({

            createdAt: -1

        });

        res.status(200).json({

            success: true,

            count: payments.length,

            payments

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ==========================================
   REFUND PAYMENT
========================================== */

export const refundPayment = async (req, res) => {

    try {

        const payment = await Payment.findById(req.params.id);

        if (!payment) {

            return res.status(404).json({

                success: false,

                message: "Payment not found"

            });

        }

        payment.paymentStatus = "Refunded";

        await payment.save();

        await Booking.findByIdAndUpdate(

            payment.booking,

            {

                paymentStatus: "Refunded",

                bookingStatus: "Cancelled"

            }

        );

        res.status(200).json({

            success: true,

            message: "Payment Refunded Successfully",

            payment

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};