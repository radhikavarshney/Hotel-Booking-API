const Room = require("../models/rooms");
const Hotel = require("../models/hotels");
const BadRequestError = require("../errors/badRequest");
const { StatusCodes } = require("http-status-codes");
const createRoom = async (req, res, next) => {
  const hotelID = req.params.hotelID;
  const newRoom = await Room.create({ ...req.body });
  try {
    await Hotel.findByIdAndUpdate(hotelID, { $push: { rooms: newRoom._id } });
    res.status(StatusCodes.OK).json(newRoom);
  } catch (error) {
    throw new BadRequestError("Hotel Not found");
  }
};

const updateRoom = async (req, res) => {
  const newRoom = await Room.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  res.status(StatusCodes.CREATED).json(newRoom);
};

const roomAvailability = async (req, res) => {
  await Room.updateOne(
    { "roomNumbers._id": req.params.id },
    {
      $push: {
        "roomNumbers.$.unavailableDates": req.body.dates,
      },
    }
  );
  res.status(StatusCodes.OK).json({ msg: "Room status has been Updated" });
};

const deleteRoom = async (req, res) => {
  const hotelID = req.params.hotelID;
  try {
    await Hotel.findByIdAndUpdate(hotelID, { $pull: { rooms: req.params.id } });
    res.status(StatusCodes.OK).json({ msg: "Room has been deleted" });
  } catch (error) {
    throw new BadRequestError("Hotel or Room not Found");
  }
};
const getRoom = async (req, res) => {
  const room = await Room.findById(req.params.id);
  res.status(StatusCodes.OK).json(room);
};

const getAllRooms = async (req, res) => {
  const rooms = await Room.find();
  res.status(StatusCodes.OK).json(rooms);
};

module.exports = {
  createRoom,
  updateRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
  roomAvailability,
};
