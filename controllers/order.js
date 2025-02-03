const order = require("../models/order");
const Book = require("../models/book");
const User = require("../models/user");
exports.addPending = async (req, res) => {
    try {
        const { books, phone, address } = req.body;
        const userId = req.user.user.id;

        if (!books || !Array.isArray(books) || books.length === 0) {
            return res.status(400).json({ msg: "Books array is required and cannot be empty" });
        }
        if (!phone || !address) {
            return res.status(400).json({ msg: "Phone and address are required" });
        }

        let shippingCost = 0;
        let totalPrice = shippingCost;

        const bookIds = books.map(item => item.bookid);
        const foundBooks = await Book.find({ _id: { $in: bookIds } });

        const bookMap = new Map(foundBooks.map(book => [book._id.toString(), book]));

        for (const item of books) {
            const book = bookMap.get(item.bookid);
            if (!book) {
                return res.status(404).json({ msg: `Book with ID ${item.bookid} not found` });
            }
            if (book.amount < item.amount) {
                return res.status(400).json({ msg: `Not enough stock for ${book.name}.Available: ${book.amount}` });
            }
            totalPrice += book.price * item.amount;
        }

        const newOrder = new order({
            books,
            user: userId,
            shipprice: shippingCost,
            totalprice: totalPrice,
            address,
            phone
        });

        await newOrder.save();

        return res.status(200).json({ msg: "ok", data: newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
exports.changeOrderToShipped = async (req, res) => {
    try {
        const userId = req.user.user.id;
        const orderId = req.body.orderId;
        const o = await order.findOne({ _id: orderId, user: userId });

        if (!o) {
            return res.status(404).json({ msg: "Order not found" });
        }
        if (o.paymentmethod === "online" && !o.ispaid) {
            return res.status(400).json({ msg: "Order not paid yet" });
        }

        for (const b of o.books) {
            const book = await Book.findById(b.bookid);
            if (!book) {
                return res.status(400).json({ msg: `Book with ID ${b.bookid} not found ` });
            }
            if (book.amount < b.amount) {
                return res.status(400).json({ msg: `Not enough stock for ${book.name}.Available = ${book.amount} ` });
            }
            book.amount -= b.amount;
            await book.save();
        }

        o.status = "shipped";
        await o.save();

        return res.status(200).json({ msg: "ok", data: o });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
exports.changeOrderToDelevered = async (req, res) => {
    try {
        const orderId = req.body.orderId;
        const userId = req.user.user.id;
        const o = await order.findById(orderId);
        const u = await User.findById(userId);
        if (!o) {
            return res.status(404).json({
                msg: "order not found!"
            })
        }
        if (o.user.toString() !== userId) {
            return res.status(400).json({
                msg: "order not found!"
            })
        }
        if (o.status !== "shipped") {
            return res.status(400).json({
                msg: "order status must be shipped"
            })
        }
        o.status = "deliverd";
        await o.save()
        return res.status(200).json({
            msg: "ok",
            data: o
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}
