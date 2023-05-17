let router = require("express").Router();
let Templist = require("../models/Templist");
let History = require("../models/History");
//get


router.get("/:username", (req, res) => {
    let username = req.params.username;
    Templist.findOne({ username: username }).then((foundOne) => {
        let total_cost = 0;
        for(var i=0;i<foundOne.listItems.length;i++){
            total_cost = total_cost + (foundOne.listItems[i].price * foundOne.listItems[i].quantity);
        }
        res.render("home.ejs", { userdetails: foundOne, items: foundOne.listItems, cost: total_cost });
    }).catch(err => {
        res.send("Hello");
    });
});


//post
router.post("/:username", (req, res) => {
    let username = req.params.username;
    let name = req.body.pro_name;
    let price = req.body.pro_price;
    let quantity = req.body.pro_quantity;
    Templist.findOne({ username: username }).then((foundOne) => {
        let tempDict = {
            name: name,
            price: price,
            quantity: quantity
        };
        let items = foundOne.listItems;
        if(tempDict.name!="" && tempDict.name!=" "){
            foundOne.listItems.push(tempDict);
        }
        foundOne.save().then(() => {
            res.redirect("/home/" + username);
        }).catch(err => {
            res.send(err);
        });
    }).catch(err => {
        res.send(err);
    });
});

router.post("/:username/del", (req, res) => {
    let username = req.params.username;
    let name = req.body.del;
    Templist.findOne({ username: username }).then((foundOne) => {
        let items = foundOne.listItems;
        let index = items.findIndex((item) => item.name == name);
        foundOne.listItems.splice(index, 1);
        foundOne.save().then(() => {
            res.redirect("/home/" + username);
        }).catch(err => {
            res.send(err);
        });
    }).catch(err => {
        res.send(err);
    });
});

router.post("/:username/save", (req, res) => {
    let username = req.params.username;
    Templist.findOne({ username: username })
      .then((foundOne) => {
        let items = foundOne.listItems;
        History.findOne({ username: username })
          .then((findOne) => {
            if (items.length > 0) { // Check if items is not an empty array
              findOne.list.push(foundOne.listItems);
              const date = new Date();
              const tempdatetime = date;
              findOne.datetime.push(tempdatetime);
              return findOne.save();
            }
          })
          .then(() => {
            foundOne.listItems = [];
            return foundOne.save();
          })
          .then(() => {
            res.redirect("/home/" + username);
          })
          .catch((err) => {
            res.send(err);
          });
      })
      .catch((err) => {
        res.send(err);
      });
  });
  
  




module.exports = router;