const mongoose = require("mongoose");


const listSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
});


const historySchema = new mongoose.Schema({
    username: {
        type: String
    },
    datetime: [Date],
    list: [[listSchema]]
}
);

module.exports = mongoose.model("History", historySchema);