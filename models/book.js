const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    name: String,
    categ: { type: mongoose.Schema.Types.ObjectId, ref: 'Categ' },
    isUsed: Boolean,
    desc: String,
    auther: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    price: Number,
    amount: Number
});
module.exports = mongoose.model('Book', bookSchema);