const mongoose = require("mongoose");




const lendListSchema = new mongoose.Schema({
    person: String,
    pay: Number,
    status : Boolean,
    datetime : Date
}
);

const lendSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    lendList: [lendListSchema]
});


module.exports = mongoose.model("Lend", lendSchema);