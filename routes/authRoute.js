const express = require("express");
const routes = express.Router();
const controller = require("../controller/authController");

routes.post("/login", controller.loginUser);

routes.post("/register", controller.addUser);

module.exports = routes;
