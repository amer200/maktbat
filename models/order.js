const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    books: [
        {
            book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
            amount: Number
        }
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    shipprice: Number,
    totalprice: Number,
    status: {
        type: String,
        enum: ["pending", "shipped", "deliverd", "cancelled"],
        default: "pending",
    },
    address: String,
    phone: String
});
module.exports = mongoose.model('Oreder', orderSchema);