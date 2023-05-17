const router = require("express").Router();
const Todo = require("../models/Todo");


//get

router.get("/:username", (req, res) => {
    const username = req.params.username;
    Todo.findOne({ username: username }).then((foundOne) => {
        res.render("todo", { todoList: foundOne.todoList, userdetails: foundOne });
    }).catch(err => {
        res.send(err);
    });
});

//post


router.post("/:username", (req, res) => {
    const username = req.params.username;
    const task = req.body.task;
    Todo.findOne({ username: username }).then((foundOne) => {
        if(task!="" && task!=" "){
            const tempData = {
                task: task,
                status: false,
            }
            foundOne.todoList.push(tempData);
        }
        foundOne.save();
        res.redirect("/todo/" + username);
    }).catch(err => {
        res.send(err);
    });
});

router.post("/update/:username", (req, res) => {
    const task = req.body.status;
    const username = req.params.username;
    Todo.findOne({ username: username })
        .then((foundOne) => {
            // Find the element in the array based on the person name
            const element = foundOne.todoList.find((item) => item._id.toString() == task);
            // Update the status to true if the element is found
            if (element) {
                if (element.status === true) {
                    element.status = false;
                }
                else {
                    element.status = true;
                }
            }
            // Save the document
            return foundOne.save();
        })
        .then(() => {
            res.redirect("/todo/" + username);
        })
        .catch((err) => {
            res.send(err);
        });
});


router.post("/del/:username", (req, res) => {
    const username = req.params.username;
    const task = req.body.del;
    Todo.findOne({ username: username }).then((foundOne) => {
        const element = foundOne.todoList.findIndex((item) => item._id.toString() == task);
        if (element != -1) {
            foundOne.todoList.splice(element, 1);
        }
        foundOne.save();
        res.redirect("/todo/" + username);
    }).catch(err => {
        res.send(err);
    });
});



module.exports = router;