const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError } = require("../errors");

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Invalid Error");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userID: payload.userID, isAdmin: payload.isAdmin };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Invalid Authentication");
  }
};

const authUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Invalid Error");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userID: payload.userID, isAdmin: payload.isAdmin };
    if (req.user.userID === req.params.id || req.user.isAdmin) {
      next();
    } else {
      throw new UnauthenticatedError("Invalid Authentication");
    }
  } catch (error) {
    throw new UnauthenticatedError("Invalid Authentication");
  }
};

const authAdmin = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Invalid Error");
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new UnauthenticatedError("Invalid Authentication");
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userID: payload.userID, isAdmin: payload.isAdmin };
    if (req.user.isAdmin) {
      next();
    } else {
      throw new UnauthenticatedError("Admin Permission required");
    }
  } catch (error) {
    throw new UnauthenticatedError("Invalid Authentication");
  }
};
module.exports = { auth, authUser, authAdmin };
