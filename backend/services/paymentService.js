import { v4 as uuidv4 } from "uuid";
import Payment from "../models/Payment.js";
import Booking from "../models/Booking.js";

/* ==========================================
   CREATE PAYMENT
========================================== */

export const createPayment = async (

    bookingId,

    paymentMethod = "Credit Card"

) => {

    const booking = await Booking.findById(bookingId);

    if (!booking) {

        throw new Error("Booking not found");

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

    return payment;

};

/* ==========================================
   GET PAYMENT
========================================== */

export const getPayment = async (paymentId) => {

    return await Payment.findById(paymentId)

        .populate("booking")

        .populate("user", "-password");

};

/* ==========================================
   GET USER PAYMENTS
========================================== */

export const getUserPayments = async (userId) => {

    return await Payment.find({

        user: userId

    })

    .populate("booking")

    .sort({

        createdAt: -1

    });

};

/* ==========================================
   REFUND PAYMENT
========================================== */

export const refundPaymentService = async (paymentId) => {

    const payment = await Payment.findById(paymentId);

    if (!payment) {

        throw new Error("Payment not found");

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

    return payment;

};

/* ==========================================
   GET ALL PAYMENTS
========================================== */

export const getAllPayments = async () => {

    return await Payment.find()

        .populate("user", "-password")

        .populate("booking")

        .sort({

            createdAt: -1

        });

};

export default {

    createPayment,

    getPayment,

    getUserPayments,

    refundPaymentService,

    getAllPayments

};