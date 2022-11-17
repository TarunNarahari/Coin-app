// Require express
const express = require("express");
// Initialize express
const app = express();
const PORT = 8080;
// parse JSON
app.use(express.json());
// parse URL encoded data


const users = [{
    id: 1,
    name: "Jane Doe",
    age: "22",
    },
    {
    id: 2,
    name: "John Doe",
    age: "31",
   }];

   app.get("/", (req, res) => {
    res.json({ message: "Welcome to coin-app application." });
  });

app.post('/create', (req, res) => {
    // Check if request body is empty
if (!Object.keys(req.body).length) {
    return res.status(400).json({
      message: "Request body cannoty be empty",
    });
 }
 // Use object destructuring to get name and age
 const { name, age } = req.body;
 if (!name || !age) {
    res.status(400).json({
      message: "Ensure you sent both name and age",
    });
 }
 const newUser = {
    id: users.length + 1,
    name,
    age,
 };
 try {
    users.push(newUser);
    res.status(201).json({
      message: "Successfully created a new user",
    });
 } catch (error) {
    res.status(500).json({
      message: "Failed to create user",
    });
 }
 });


 app.get('/users', (req, res) => {
    try {
        res.status(200).json({
            users
          });
      } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve all users",
          });
      }
 });


 app.get('/user/:userID', (req, res) => {
    const id = parseInt(req.params.userID);
    console.log(id);
    try {
        let user = users.find((user) => user.id === id);
        if (!user) {
            return res.status(404).json({
            message: "User not found",
        });
        }    
        res.status(200).json({
        user,
   });
 } catch (error) {
   res.status(500).json({
     message: "Failed to retrieve user",
   });
 }
 });


 app.put('/user/:userID', (req, res) => {
    try {
        const id = parseInt(req.params.userID);
        let user = users.find((user) => user.id === id);
        if (!user) {
          return res.status(404).json({
            message: "User not found",
          });
        }
        const userIDX = users.indexOf(user);
        users[userIDX].name = req.body.name || users[userIDX].name;
        users[userIDX].age = req.body.age || users[userIDX].age;
        res.status(200).json({
          message: "Successfully updated user",
          user,
        });
      } catch (error) {
        res.status(500).json({
          message: "Failed to retrieve user",
        });
      }
 });


 app.delete('/delete/:userID', (req, res) => {
    // Delete a user by ID
    try {
        const id = req.params.userID;
        let userIDX = users.findIndex((user) => user.id === id);
        if (!userIDX) {
          res.status(404).json({
            message: "User not found",
          });
        }
        users.splice(userIDX, 1);
        res.status(200).json({
          message: "Successfully deleted user",
          users,
        });
      } catch (error) {
        res.status(500).json({
          message: "Failed to delete user",
        });
      }
 });

 app.delete('/users', (req, res) => {
    try {
   users.splice(0, users.length);
   res.status(200).json({
     message: "Successfully deleted all users",
     users,
   });
 } catch (error) {
   res.status(500).json({
     message: "Failed to delete users",
     x,
   });
 }
 });



app.use(express.urlencoded({ extended: true }));
// create a server
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});