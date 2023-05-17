const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const authRoute = require("./routes/auth");
const historyRoute = require("./routes/history");
const homeRoute = require("./routes/home");
const lendRoute = require("./routes/lend");
const borrowRoute = require("./routes/borrow");
const todoRoute = require('./routes/todo');

const app = express();

app.use(express.static("public"));

app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/BillmeDB").then(()=>
{
    console.log("connected sucessfully!");
}).catch(err=>{
    console.log(err);
});


app.use('/home' ,homeRoute);
app.use('/',authRoute);
app.use('/history',historyRoute);
app.use('/lend',lendRoute);
app.use('/borrow',borrowRoute);
app.use('/todo', todoRoute);


app.listen(3000 , ()=> {
    console.log("Server started at port 3000 successfully!");
});

