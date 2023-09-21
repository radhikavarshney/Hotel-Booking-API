const express = require("express");
const router = express.Router();
const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
  getCountByCity,
  getCountByType,
  getHotelRooms,
} = require("../controller/hotels");

const { auth, authAdmin, authUser } = require("../middleware/authentication");

router
  .post("/", authAdmin, createHotel)
  .put("/:id", authAdmin, updateHotel)
  .delete("/:id", authAdmin, deleteHotel)
  .get("/find/:id", getHotel)
  .get("/", getHotels)
  .get("/countByCity", getCountByCity)
  .get("/countByType", getCountByType)
  .get("/room/:id", getHotelRooms);

module.exports = router;
