const express = require("express");
const routes = express.Router();
// Require the controller modules

const userController = require("../controllers/user.controller");

routes.post("/login", userController.login);
routes.post("/register", userController.register);
routes.post("/refresh", userController.refreshToken);

module.exports = routes;
