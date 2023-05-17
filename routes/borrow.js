const router = require("express").Router();
const Borrow = require("../models/Borrow");


//get

router.get("/:username", (req,res)=>{
    const username = req.params.username;
    Borrow.findOne({username : username}).then((foundOne)=>{
        res.render("borrow" , { borrowList : foundOne.borrowList , userdetails : foundOne});
    }).catch(err=>{
        res.send(err);
    });
});

//post
router.post("/:username", (req,res)=>{
    const username = req.params.username;
    const person_name = req.body.person_name;
    const amount = req.body.amount;
    Borrow.findOne({username : username}).then((foundOne)=>{
        const tempdate = new Date().getTime();
        const tempData = {
            person : person_name,
            pay : amount,
            status : false,
            datetime : tempdate

        }
        foundOne.borrowList.push(tempData);
        foundOne.save();
        res.redirect("/borrow/"+username);
    }).catch(err=>{
        res.send(err);
    });
});

router.post("/update/:username", (req, res) => {
    const username = req.params.username;
    const person_name = req.body.person;
  
    Borrow.findOne({ username: username })
      .then((foundOne) => {
        // Find the element in the array based on the person name
        const element = foundOne.borrowList.find((item) => item._id.toString() === person_name.toString());
  
        // Update the status to true if the element is found
        if (element) {
          if(element.status===true){
            element.status = false;
          }
          else{
            element.status = true;
            element.datetime = new Date().getTime();
          }
        }
        
  
        // Save the document
        return foundOne.save();
      })
      .then(() => {
        res.redirect("/borrow/" + username);
      })
      .catch((err) => {
        res.send(err);
      });
  });
  


module.exports = router;