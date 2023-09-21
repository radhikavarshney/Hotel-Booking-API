const express = require("express");
const router = express.Router();
const { authAdmin } = require("../middleware/authentication");
const {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRooms,
  roomAvailability,
} = require("../controller/rooms");

router
  .post("/:hotelID", authAdmin, createRoom)
  .put("/:id", authAdmin, updateRoom)
  .delete("/:id/:hotelID", authAdmin, deleteRoom)
  .get("/:id", getRoom)
  .get("/", getAllRooms)
  .put("/availability/:id", roomAvailability);

module.exports = router;
