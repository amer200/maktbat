const order = require("../models/order");
const Book = require("../models/book")
exports.addPending = async (req, res) => {
    try {
        const books = req.body.books; // [{book: bookId, amount }]
        const userId = req.user.user.id;
        const phone = req.body.phone;
        const address = req.body.address;
        let shipPrice = 0;
        let totalprice = shipPrice;
        for (const item of books) {
            const book = await Book.findById(item.bookId);
            if (!book) {
                return res.status(404).json({
                    msg: "book not found"
                })
            }
            if (book.amount < item.amount) {
                return res.status(400).json({
                    msg: `not enough stock for ${book.name} the avalibe = ${book.amount}`
                })
            }
            totalprice = totalprice + book.price;
        }
        const newOreder = new order({
            books: books,
            user: userId,
            shipprice: shipPrice,
            totalprice: totalprice,
            address: address,
            phone: phone
        })
        await newOreder.save()
        return res.status(200).json({
            msg: "ok",
            data: newOreder
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}