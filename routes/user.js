const express = require("express");
const routes = express.Router();
const userControllers = require("../controllers/user");

routes.post("/sign-up", userControllers.signUp);
routes.post("/log-in", userControllers.logIn)
module.exports = routes