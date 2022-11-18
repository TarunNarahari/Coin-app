// Require express
const express = require("express");
// Initialize express
const app = express();
const PORT = process.env.PORT || 8080;
const User = require("./app/model.js");
// parse JSON
app.use(express.json());
// parse URL encoded data
app.use(express.urlencoded({ extended: true }));

app.get("/users", (req, res) => {
  //res.json({ message: "Welcome to coin-app application." });
  const id = req.query.id;

  User.getAll(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
});

app.post("/new", (req, res) => {
  // Check if request body is empty
  if (!Object.keys(req.body).length) {
    return res.status(400).json({
      message: "Request body cannoty be empty",
    });
  };

  const user = new User({
    name: req.body.name,
    balance: 100
  });

  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
    });

});

app.put("/transfer", (req, res) => {
  // Check if request body is empty
  if (!Object.keys(req.body).length) {
    return res.status(400).json({
      message: "Request body cannoty be empty",
    });
  };

  const {fromId,toId,transferAmount} = req.body;

  console.log("fromId = " + fromId);
  console.log("toId = " + toId);
  console.log("transferAmount = " + transferAmount);


  User.getAll(fromId, (err, fromUser) => {
      if (err) throw err;

      if (parseInt(fromUser[0].balance) < parseInt(transferAmount)) {
        return res.status(400).json({
          message: "Not enough coins to transfer",  
        });
      };

      const newbalance_fromUser = parseInt(fromUser[0].balance) - parseInt(transferAmount);

      User.getAll(toId, (err, toUser) => {
          if (err) throw err;

          const newbalance_toUser = parseInt(toUser[0].balance) + parseInt(transferAmount);

          User.update(fromId, newbalance_fromUser, (err, data) => {
            if (err) throw err;
          });

          User.update(toId, newbalance_toUser, (err, data) => {
            if (err) throw err;
          });

          res.status(200).json({
            message: "Successful transfer",
             fromId, toId, transferAmount
          });
       })
  });

});

//Negative numbers





// create a server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});














