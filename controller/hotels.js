const express = require("express");
const Hotel = require("../models/hotels");
const { StatusCodes } = require("http-status-codes");
const Room = require("../models/rooms");
const createHotel = async (req, res) => {
  const savedHotel = await Hotel.create({ ...req.body });
  res.status(StatusCodes.OK).json(savedHotel);
};

const updateHotel = async (req, res) => {
  const newHotel = await Hotel.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  res.status(200).json(newHotel);
};

const deleteHotel = async (req, res) => {
  await Hotel.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "Hotel has been Deleted" });
};

const getHotel = async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);
  res.status(200).json(hotel);
};

const getHotels = async (req, res) => {
  const { min, max, ...others } = req.query;
  const hotels = await Hotel.find({
    ...others,
    cheapestPrice: { $gt: min || 1, $lt: max || 999 },
  }).limit(req.query.limit);
  res.status(200).json(hotels);
};

const getCountByCity = async (req, res) => {
  const cities = req.query.cities.split(",");
  const citiesList = await Promise.all(
    cities.map((city) => {
      return Hotel.countDocuments({ city: city });
    })
  );

  res.status(StatusCodes.OK).json({ citiesList });
};

const getCountByType = async (req, res) => {
  const hotelCount = await Hotel.countDocuments({ type: "hotel" });
  const villaCount = await Hotel.countDocuments({ type: "villa" });
  const resortCount = await Hotel.countDocuments({ type: "resort" });
  const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
  const cabinCount = await Hotel.countDocuments({ type: "cabin" });

  res.status(StatusCodes.OK).json([
    { type: "Hotel", count: hotelCount },
    { type: "Villa", count: villaCount },
    { type: "Resort", count: resortCount },
    { type: "Apartment", count: apartmentCount },
    { type: "Cabin", count: cabinCount },
  ]);
};

const getHotelRooms = async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);
  const list = await Promise.all(
    hotel.rooms.map((room) => {
      return Room.findById(room);
    })
  );
  res.status(StatusCodes.OK).json(list);
};

module.exports = {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
  getCountByCity,
  getCountByType,
  getHotelRooms,
};
