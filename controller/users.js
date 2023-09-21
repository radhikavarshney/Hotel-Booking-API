const express = require("express");
const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");

const updateUser = async (req, res) => {
  const newUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  res.status(200).json(newUser);
};

const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "User has been Deleted" });
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json(user);
};

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};
module.exports = {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
};
