import nodemailer from "nodemailer";

/* ==========================================
   TRANSPORTER
========================================== */

const transporter = nodemailer.createTransport({

    host: process.env.EMAIL_HOST,

    port: process.env.EMAIL_PORT,

    secure: false,

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    }

});

/* ==========================================
   SEND EMAIL
========================================== */

export const sendEmail = async (

    to,

    subject,

    html

) => {

    const mailOptions = {

        from: `"TravelEase" <${process.env.EMAIL_USER}>`,

        to,

        subject,

        html

    };

    return await transporter.sendMail(mailOptions);

};

/* ==========================================
   BOOKING CONFIRMATION EMAIL
========================================== */

export const sendBookingConfirmation = async (

    userEmail,

    userName,

    booking

) => {

    const html = `

        <h2>Hello ${userName},</h2>

        <p>Your booking has been <strong>confirmed</strong>.</p>

        <table border="1" cellpadding="8" cellspacing="0">

            <tr>

                <td><strong>Booking ID</strong></td>

                <td>${booking._id}</td>

            </tr>

            <tr>

                <td><strong>Hotel</strong></td>

                <td>${booking.hotel}</td>

            </tr>

            <tr>

                <td><strong>Check In</strong></td>

                <td>${booking.checkInDate}</td>

            </tr>

            <tr>

                <td><strong>Check Out</strong></td>

                <td>${booking.checkOutDate}</td>

            </tr>

            <tr>

                <td><strong>Total Amount</strong></td>

                <td>₹${booking.totalAmount}</td>

            </tr>

        </table>

        <br>

        <p>

            Thank you for choosing <b>TravelEase</b>.

        </p>

    `;

    return await sendEmail(

        userEmail,

        "TravelEase Booking Confirmation",

        html

    );

};

/* ==========================================
   PAYMENT RECEIPT EMAIL
========================================== */

export const sendPaymentReceipt = async (

    userEmail,

    userName,

    payment

) => {

    const html = `

        <h2>Hello ${userName},</h2>

        <p>

            Your payment was successful.

        </p>

        <table border="1" cellpadding="8">

            <tr>

                <td><strong>Transaction ID</strong></td>

                <td>${payment.transactionId}</td>

            </tr>

            <tr>

                <td><strong>Amount</strong></td>

                <td>₹${payment.amount}</td>

            </tr>

            <tr>

                <td><strong>Status</strong></td>

                <td>${payment.paymentStatus}</td>

            </tr>

        </table>

        <br>

        <p>

            Thank you for booking with TravelEase.

        </p>

    `;

    return await sendEmail(

        userEmail,

        "TravelEase Payment Receipt",

        html

    );

};

export default transporter;