const sql = require("./db.js");

const User = function(user) {
    this.name = user.name;
    this.balance = user.balance;
    this.id = user.id;
  };

  User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  };




  module.exports = User;