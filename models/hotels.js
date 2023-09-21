const mongoose = require("mongoose");

const { Schema } = mongoose;

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide Hotel name"],
  },
  type: {
    type: String,
    required: [true, "Please provide Type"],
  },
  city: {
    type: String,
    required: [true, "Please provide City"],
  },
  address: {
    type: String,
    required: [true, "Please provide address"],
  },
  distance: {
    type: String,
    required: [true, "Please provide Distance"],
  },
  photos: {
    type: [String],
  },
  title: {
    type: String,
    required: [true, "Please provide title"],
  },
  desc: {
    type: String,
    required: [true, "Please provide Description"],
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  rooms: {
    type: [String],
  },
  cheapestPrice: {
    type: Number,
    required: [true, "Provide Cheapest Price"],
  },
  featured: {
    type: Boolean,
    deafault: false,
  },
});

module.exports = mongoose.model("Hotel", hotelSchema);
