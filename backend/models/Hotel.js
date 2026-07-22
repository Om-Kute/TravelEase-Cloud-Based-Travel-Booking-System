import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(

    {

        hotelName: {

            type: String,

            required: true,

            trim: true

        },

        city: {

            type: String,

            required: true,

            trim: true

        },

        address: {

            type: String,

            required: true

        },

        description: {

            type: String,

            required: true

        },

        pricePerNight: {

            type: Number,

            required: true,

            min: 0

        },

        rating: {

            type: Number,

            default: 4.5,

            min: 0,

            max: 5

        },

        totalRooms: {

            type: Number,

            required: true

        },

        availableRooms: {

            type: Number,

            required: true

        },

        amenities: [

            {

                type: String

            }

        ],

        images: [

            {

                type: String

            }

        ],

        thumbnail: {

            type: String,

            default: ""

        },

        location: {

            latitude: {

                type: Number

            },

            longitude: {

                type: Number

            }

        },

        status: {

            type: String,

            enum: ["Available", "Unavailable"],

            default: "Available"

        }

    },

    {

        timestamps: true

    }

);

export default mongoose.model("Hotel", hotelSchema);