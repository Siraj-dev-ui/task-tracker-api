const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectdb = require("./config/db");

// routes

const authRoute = require("./routes/authRoute");
const taskRoute = require("./routes/taskRoutes");

const PORT = process.env.PORT;

connectdb();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoute);

// user
app.use("/task", taskRoute);

const server = app.listen(PORT, () =>
  console.log(`Server Started at Port ${PORT}`)
);
