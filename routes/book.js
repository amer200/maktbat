const express = require("express");
const routes = express.Router();
const bookControllers = require("../controllers/book");
const isUser = require("../middlewares/isUser");

routes.post("/add-new", isUser.isAuth, bookControllers.addBook);
routes.get("/get-by-id/:id", bookControllers.getById);
routes.get("/get-all", bookControllers.getAll);
routes.get("/get-by-categ/:cId", bookControllers.getByCateg);
routes.put("/edit", isUser.isAuth, bookControllers.edit);
routes.delete("/delete/:bId", isUser.isAuth, bookControllers.deleteBook);
module.exports = routes