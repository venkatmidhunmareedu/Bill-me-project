const mongoose = require("mongoose");




const borrowListSchema = new mongoose.Schema({
    person: String,
    pay: Number,
    status : Boolean,
    datetime : Date
}
);

const borrowSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    borrowList: [borrowListSchema]
});


module.exports = mongoose.model("Borrow", borrowSchema);