import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";

/* ==========================================
   CREATE BOOKING
========================================== */

export const createBooking = async (req, res) => {

    try {

        const {

            hotel,

            guestName,

            guestEmail,

            guestMobile,

            checkInDate,

            checkOutDate,

            totalGuests,

            roomType

        } = req.body;

        const hotelData = await Hotel.findById(hotel);

        if (!hotelData) {

            return res.status(404).json({

                success: false,

                message: "Hotel not found"

            });

        }

        if (hotelData.availableRooms <= 0) {

            return res.status(400).json({

                success: false,

                message: "No rooms available"

            });

        }

        const checkIn = new Date(checkInDate);

        const checkOut = new Date(checkOutDate);

        const totalNights = Math.ceil(

            (checkOut - checkIn) / (1000 * 60 * 60 * 24)

        );

        const totalAmount =

            totalNights * hotelData.pricePerNight;

        const booking = await Booking.create({

            user: req.user._id,

            hotel,

            guestName,

            guestEmail,

            guestMobile,

            checkInDate,

            checkOutDate,

            totalGuests,

            roomType,

            totalNights,

            totalAmount

        });

        hotelData.availableRooms -= 1;

        await hotelData.save();

        res.status(201).json({

            success: true,

            message: "Booking Created Successfully",

            booking

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ==========================================
   GET MY BOOKINGS
========================================== */

export const getMyBookings = async (req, res) => {

    try {

        const bookings = await Booking.find({

            user: req.user._id

        })

        .populate("hotel")

        .sort({

            createdAt: -1

        });

        res.status(200).json({

            success: true,

            count: bookings.length,

            bookings

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ==========================================
   GET BOOKING BY ID
========================================== */

export const getBookingById = async (req, res) => {

    try {

        const booking = await Booking.findById(

            req.params.id

        )

        .populate("hotel")

        .populate("user", "-password");

        if (!booking) {

            return res.status(404).json({

                success: false,

                message: "Booking not found"

            });

        }

        res.status(200).json({

            success: true,

            booking

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ==========================================
   CANCEL BOOKING
========================================== */

export const cancelBooking = async (req, res) => {

    try {

        const booking = await Booking.findById(req.params.id);

        if (!booking) {

            return res.status(404).json({

                success: false,

                message: "Booking not found"

            });

        }

        booking.bookingStatus = "Cancelled";

        await booking.save();

        const hotel = await Hotel.findById(booking.hotel);

        if (hotel) {

            hotel.availableRooms += 1;

            await hotel.save();

        }

        res.status(200).json({

            success: true,

            message: "Booking Cancelled Successfully",

            booking

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ==========================================
   GET ALL BOOKINGS (ADMIN)
========================================== */

export const getAllBookings = async (req, res) => {

    try {

        const bookings = await Booking.find()

        .populate("user", "-password")

        .populate("hotel")

        .sort({

            createdAt: -1

        });

        res.status(200).json({

            success: true,

            count: bookings.length,

            bookings

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};