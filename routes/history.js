const router = require("express").Router();
const History = require("../models/History");


//get


router.get("/:username", (req,res)=>{
    const username = req.params.username;
    History.findOne({username : username}).then((foundOne)=>{
        let total_cost = 0;
        res.render("history" ,{ listItems : foundOne.list, times : foundOne.datetime , userdetails : foundOne} );
    }).catch(err=>{
        res.send(err);
    });
});


module.exports = router;