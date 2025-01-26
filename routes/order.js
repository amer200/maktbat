const express = require("express");
const routes = express.Router();
const orederControllers = require("../controllers/order");
const isAdmin = require("../middlewares/isAdmin");
const isUser = require("../middlewares/isUser");

routes.post("/add-new", isUser.isAuth, orederControllers.addPending);
module.exports = routes