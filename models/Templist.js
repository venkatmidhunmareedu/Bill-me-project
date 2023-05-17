const mongoose = require("mongoose");


const listSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
});




const tempSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    listItems : [listSchema],
});

module.exports = mongoose.model("Templist", tempSchema);