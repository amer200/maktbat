const express = require("express");
const routes = express.Router();
const adminControllers = require("../controllers/admin");

routes.post("/log-in", adminControllers.logIn);
module.exports = routes