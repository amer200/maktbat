const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    books: [
        {
            bookid: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
            amount: Number
        }
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    shipprice: Number,
    totalprice: Number,
    paymentmethod: {
        type: String,
        enum: ["cod", "online"]
    },
    ispaid: { type: Boolean, default: 0 },
    status: {
        type: String,
        enum: ["pending", "shipped", "deliverd", "cancelled"],
        default: "pending",
    },
    address: String,
    phone: String
});
module.exports = mongoose.model('Oreder', orderSchema);