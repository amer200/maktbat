const express = require("express");
const routes = express.Router();
const categControllers = require("../controllers/categ");
const isAdmin = require("../middlewares/isAdmin");
routes.post("/add-new", isAdmin.isAuth, categControllers.addCateg);
routes.get("/get-all", categControllers.getAllCategs);
routes.delete("/delete", isAdmin.isAuth, categControllers.removeCateg);
routes.put("/edit", isAdmin.isAuth, categControllers.editCateg);
module.exports = routes