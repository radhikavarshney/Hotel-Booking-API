const mongoose = require("mongoose");
const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Provide Room name"],
    },
    price: {
      type: Number,
      required: [true, "Please enter the price for the room"],
    },
    desc: {
      type: String,
      default: "Best Room for this price",
    },
    maxPeople: {
      type: Number,
      default: 2,
    },
    roomNumbers: [{ number: Number, unavailabeDates: { types: [Date] } }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rooms", RoomSchema);
