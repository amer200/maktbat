const Book = require("../models/book");

exports.addBook = async (req, res) => {
    try {
        const name = req.body.name;
        const categ = req.body.categ;
        const isUsed = req.body.isUsed;
        const desc = req.body.desc;
        const auther = req.body.auther;
        const userId = req.user.user.id;
        const price = req.body.price;
        const amount = req.body.amount;

        const myBook = new Book({
            name: name,
            categ: categ,
            isUsed: isUsed,
            desc: desc,
            auther: auther,
            user: userId,
            price: price,
            amount: amount
        })
        await myBook.save();
        return res.status(200).json({
            msg: "ok",
            data: myBook
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}
exports.getById = async (req, res) => {
    try {
        const bId = req.params.id;
        const book = await Book.findById(bId).populate("categ").populate({ path: "user", select: "-password" })
        res.status(200).json({
            msg: "ok",
            data: book
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}
exports.getByCateg = async (req, res) => {
    try {
        const cId = req.params.cId;
        const books = await Book.find({ categ: cId }).populate({ path: "user", select: "-password" });
        res.status(200).json({
            msg: "ok",
            data: books
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}
exports.getAll = async (req, res) => {
    try {
        const books = await Book.find().populate("categ").populate({ path: "user", select: "-password" })
        res.status(200).json({
            msg: "ok",
            data: books
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}
exports.deleteBook = async (req, res) => {
    try {
        const bId = req.params.bId;
        const userId = req.user.user.id;
        const book = await Book.findOneAndDelete({ _id: bId, user: userId });
        if (!book) {
            return res.status(404).json({
                msg: "not found !"
            })
        }
        res.status(200).json({
            msg: "ok"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}
exports.edit = async (req, res) => {
    try {
        const bId = req.body.bId;
        const name = req.body.name;
        const categ = req.body.categ;
        const isUsed = req.body.isUsed;
        const desc = req.body.desc;
        const auther = req.body.auther;
        const userId = req.user.user.id;
        const price = req.body.price;
        const amount = req.body.amount;
        const book = await Book.findOne({ _id: bId, user: userId });
        if (!book) {
            return res.status(404).json({
                msg: "not found !"
            })
        }
        book.name = name;
        book.categ = categ;
        book.isUsed = isUsed;
        book.desc = desc;
        book.auther = auther;
        book.user = userId;
        book.price = price;
        book.amount = amount;
        await book.save();
        res.status(200).json({
            msg: "ok",
            data: book
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}