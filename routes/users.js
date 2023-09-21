const express = require("express");
const router = express.Router();
const {
  auth,authUser,authAdmin
} = require("../middleware/authentication");
const {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
} = require("../controller/users");

router
  .put("/:id", authUser, updateUser)
  .delete("/:id", authUser, deleteUser)
  .get("/:id", authUser, getUser)
  .get("/",authAdmin, getAllUsers);

module.exports = router;
