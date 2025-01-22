const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config({ path: ".env" });
const { dbConnection } = require("./db/mongoose");
const bodyParser = require('body-parser');
const app = express();

///////////////////////////////////////////
app.use(morgan("combined"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//////////////////////////////////////////

// routes
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const categRoutes = require("./routes/categ");
const bookRoutes = require("./routes/book");
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/categ", categRoutes);
app.use("/book", bookRoutes);

//db onnection
dbConnection();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});