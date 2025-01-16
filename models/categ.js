const mongoose = require("mongoose");

const categSchema = new mongoose.Schema({
    name: String
});
module.exports = mongoose.model('Categ', categSchema);