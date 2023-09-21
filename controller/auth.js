const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors/index");
const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { username: user.username, email: user.email }, token });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("please provide usernmae or password");
  }
  const user = await User.findOne({ username });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordValid = await user.checkPassword(password);
  if (!isPasswordValid) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ user: { username: user.username, email: user.email }, token });
};

module.exports = {
  register,
  login,
};
