const router = require("express").Router();
const Lend = require("../models/Lend");


//get

router.get("/:username", (req,res)=>{
    const username = req.params.username;
    Lend.findOne({username : username}).then((foundOne)=>{
        res.render("lend" , { lendList : foundOne.lendList , userdetails : foundOne});
    }).catch(err=>{
        res.send(err);
    });
});

//post
router.post("/:username", (req,res)=>{
    const username = req.params.username;
    const person_name = req.body.person_name;
    const amount = req.body.amount;
    Lend.findOne({username : username}).then((foundOne)=>{
        const tempdate = new Date().getTime();
        const tempData = {
            person : person_name,
            pay : amount,
            status : false,
            datetime : tempdate

        }
        foundOne.lendList.push(tempData);
        foundOne.save();
        res.redirect("/lend/"+username);
    }).catch(err=>{
        res.send(err);
    });
});

router.post("/update/:username", (req, res) => {
    const username = req.params.username;
    const person_name = req.body.person;
  
    Lend.findOne({ username: username })
      .then((foundOne) => {
        // Find the element in the array based on the person name
        const element = foundOne.lendList.find((item) => item._id.toString() === person_name);
  
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
        res.redirect("/lend/" + username);
      })
      .catch((err) => {
        res.send(err);
      });
  });
  


module.exports = router;