import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";

/* ==========================================
   CALCULATE TOTAL NIGHTS
========================================== */

export const calculateTotalNights = (

    checkInDate,

    checkOutDate

) => {

    const checkIn = new Date(checkInDate);

    const checkOut = new Date(checkOutDate);

    return Math.ceil(

        (checkOut - checkIn) /

        (1000 * 60 * 60 * 24)

    );

};

/* ==========================================
   CALCULATE TOTAL AMOUNT
========================================== */

export const calculateTotalAmount = (

    nights,

    pricePerNight

) => {

    return nights * pricePerNight;

};

/* ==========================================
   CHECK ROOM AVAILABILITY
========================================== */

export const checkRoomAvailability = async (

    hotelId

) => {

    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {

        throw new Error("Hotel not found");

    }

    if (hotel.availableRooms <= 0) {

        throw new Error("Rooms are not available");

    }

    return hotel;

};

/* ==========================================
   CREATE BOOKING
========================================== */

export const createBookingService = async (

    bookingData,

    userId

) => {

    const hotel = await checkRoomAvailability(

        bookingData.hotel

    );

    const nights = calculateTotalNights(

        bookingData.checkInDate,

        bookingData.checkOutDate

    );

    const totalAmount = calculateTotalAmount(

        nights,

        hotel.pricePerNight

    );

    const booking = await Booking.create({

        ...bookingData,

        user: userId,

        totalNights: nights,

        totalAmount

    });

    hotel.availableRooms -= 1;

    await hotel.save();

    return booking;

};

/* ==========================================
   CANCEL BOOKING
========================================== */

export const cancelBookingService = async (

    bookingId

) => {

    const booking = await Booking.findById(bookingId);

    if (!booking) {

        throw new Error("Booking not found");

    }

    booking.bookingStatus = "Cancelled";

    await booking.save();

    const hotel = await Hotel.findById(

        booking.hotel

    );

    if (hotel) {

        hotel.availableRooms += 1;

        await hotel.save();

    }

    return booking;

};

/* ==========================================
   GET USER BOOKINGS
========================================== */

export const getUserBookings = async (

    userId

) => {

    return await Booking.find({

        user: userId

    })

    .populate("hotel")

    .sort({

        createdAt: -1

    });

};

/* ==========================================
   GET ALL BOOKINGS
========================================== */

export const getAllBookings = async () => {

    return await Booking.find()

    .populate("user", "-password")

    .populate("hotel")

    .sort({

        createdAt: -1

    });

};

export default {

    calculateTotalNights,

    calculateTotalAmount,

    checkRoomAvailability,

    createBookingService,

    cancelBookingService,

    getUserBookings,

    getAllBookings

};