const mongoose = require("mongoose");




const todoListSchema = new mongoose.Schema({
    task : String,
    status : Boolean,
}
);

const todoSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    todoList: [todoListSchema]
});


module.exports = mongoose.model("Todo", todoSchema);