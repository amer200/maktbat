const Categ = require("../models/categ")

exports.addCateg = async (req, res) => {
    try {
        const name = req.body.name;
        const isNameCateg = await Categ.findOne({ name });
        if (isNameCateg) {
            return res.status(409).json({
                msg: "this name is userd !"
            })
        }
        const newCateg = new Categ({
            name: name
        })
        await newCateg.save();
        return res.status(200).json({
            msg: "ok",
            data: newCateg
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}
exports.getAllCategs = async (req, res) => {
    try {
        const categs = await Categ.find();
        res.status(200).json({
            msg: "ok",
            data: categs
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}
exports.editCateg = async (req, res) => {
    try {
        const name = req.body.name;
        const id = req.body.id;
        const isNameUsed = await Categ.findOne({ name });
        if (isNameUsed) {
            return res.status(409).json({
                msg: "this name is userd !"
            })
        }
        const categ = await Categ.findById(id);
        if (!categ) {
            return res.status(404).json({
                msg: "not found"
            })
        }
        categ.name = name;
        await categ.save()
        res.status(200).json({
            msg: "ok",
            data: categ
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}
exports.removeCateg = async (req, res) => {
    try {
        const cId = req.body.id;
        await Categ.findByIdAndDelete(cId);
        return res.status(200).json({
            msg: "ok"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}