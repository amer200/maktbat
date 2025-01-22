const express = require("express");
const routes = express.Router();
const userControllers = require("../controllers/user");
const isAdmin = require("../middlewares/isAdmin");

routes.post("/sign-up", userControllers.signUp);
routes.post("/log-in", userControllers.logIn);
routes.get("/get-all", isAdmin.isAuth, userControllers.getAllUser)
module.exports = routes