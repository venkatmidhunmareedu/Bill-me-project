const router = require("express").Router();
const Lend = require("../models/Lend");
const Borrow = require("../models/Borrow");
const User = require("../models/User");
const History = require("../models/History");
const Temp = require("../models/Templist");
const Todo = require("../models/Todo");


//Register 

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    const temphistory = new History({
        username: req.body.username,
        listItems: {
            datetime : [],
            list : []
        }
    });
    const tempLend = new Lend({
        username: req.body.username,
        lendList: []
    });
    const tempBorrow = new Borrow({
        username: req.body.username,
        borrowList: []
    });
    const temp = new Temp({
        username : req.body.username,
        listItems : []
    });
    const tempTodo = new Todo({
        username : req.body.username,
        todoList : []
    });
    newUser.save().then(() => {
        temphistory.save();
        tempLend.save();
        tempBorrow.save();
        temp.save();
        tempTodo.save();
        res.redirect("/");
    }).catch(err => {
        if(err.code===11000){
            res.send("Username is already taken! Please user different username!");
        }
    });
});

//Login

router.post("/", (req, res) => {
    const username = req.body.username;
    User.findOne({ username: username}).then(foundUser => {
        if (foundUser.password === req.body.password) {
            res.redirect("/home/"+ username);
        }
        else {
            res.send("Password is wrong!");
        }
    }).catch(err => {
        res.send("Username Not Found!! Check the username and try again!");
    });
});


router.get("/", (req, res) => {
    res.render("login");
});

module.exports = router;