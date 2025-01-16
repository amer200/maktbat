const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    name: String,
    categ: String,
    isUsed: Boolean,
    desc: String,
    auther: String,
    user: String,
    price: Number,
    amount: Number
});
module.exports = mongoose.model('Book', bookSchema);