import Hotel from "../models/Hotel.js";

/* ==========================================
   GET ALL HOTELS
========================================== */

export const getAllHotels = async (req, res) => {

    try {

        const hotels = await Hotel.find().sort({

            createdAt: -1

        });

        res.status(200).json({

            success: true,

            count: hotels.length,

            hotels

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ==========================================
   GET HOTEL BY ID
========================================== */

export const getHotelById = async (req, res) => {

    try {

        const hotel = await Hotel.findById(req.params.id);

        if (!hotel) {

            return res.status(404).json({

                success: false,

                message: "Hotel not found"

            });

        }

        res.status(200).json({

            success: true,

            hotel

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ==========================================
   CREATE HOTEL
========================================== */

export const createHotel = async (req, res) => {

    try {

        const hotel = await Hotel.create(req.body);

        res.status(201).json({

            success: true,

            message: "Hotel Created Successfully",

            hotel

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ==========================================
   UPDATE HOTEL
========================================== */

export const updateHotel = async (req, res) => {

    try {

        const hotel = await Hotel.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true,

                runValidators: true

            }

        );

        if (!hotel) {

            return res.status(404).json({

                success: false,

                message: "Hotel not found"

            });

        }

        res.status(200).json({

            success: true,

            message: "Hotel Updated Successfully",

            hotel

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ==========================================
   DELETE HOTEL
========================================== */

export const deleteHotel = async (req, res) => {

    try {

        const hotel = await Hotel.findByIdAndDelete(req.params.id);

        if (!hotel) {

            return res.status(404).json({

                success: false,

                message: "Hotel not found"

            });

        }

        res.status(200).json({

            success: true,

            message: "Hotel Deleted Successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ==========================================
   SEARCH HOTELS
========================================== */

export const searchHotels = async (req, res) => {

    try {

        const keyword = req.query.keyword || "";

        const hotels = await Hotel.find({

            $or: [

                {

                    hotelName: {

                        $regex: keyword,

                        $options: "i"

                    }

                },

                {

                    city: {

                        $regex: keyword,

                        $options: "i"

                    }

                }

            ]

        });

        res.status(200).json({

            success: true,

            count: hotels.length,

            hotels

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};