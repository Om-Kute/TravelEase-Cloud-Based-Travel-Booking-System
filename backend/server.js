import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

import errorMiddleware from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

/* ================================
   Database Connection
================================ */

connectDB();

/* ================================
   Middlewares
================================ */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use("/uploads", express.static("uploads"));

/* ================================
   Routes
================================ */

app.get("/", (req, res) => {

    res.status(200).json({

        success: true,

        application: "TravelEase Backend API",

        version: "1.0.0",

        status: "Running"

    });

});

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/hotels", hotelRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/uploads", uploadRoutes);

/* ================================
   404 Handler
================================ */

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "Route Not Found"

    });

});

/* ================================
   Global Error Handler
================================ */

app.use(errorMiddleware);

/* ================================
   Server
================================ */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`====================================`);

    console.log(` TravelEase Server Started`);

    console.log(` http://localhost:${PORT}`);

    console.log(`====================================`);

});