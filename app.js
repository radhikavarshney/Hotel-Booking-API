require("dotenv").config();
require("express-async-errors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

const express = require("express");
const app = express();

const notFoundMiddleware = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");
const authMiddleware = require("./middleware/authentication");
const connectDB = require("./db/connectDB");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const hotlesRoute = require("./routes/hotels");
const roomsRoute = require("./routes/rooms");
const user = require("./models/user");
app.use(
  rateLimit({
    windowMs: 20 * 60 * 1000,
    max: 100,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/hotels", hotlesRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/rooms", roomsRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on the port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
