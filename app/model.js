const sql = require("../app/db.js");

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

  User.getAll = (id, result) => {
    let query = "SELECT * FROM users";
  
    if (id) {
      query += ` WHERE id = ${id}`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("users: ", res);
      result(null, res);
    });
  };

User.update = (id,user,result)=>{
  sql.query(
    "UPDATE users SET balance = ? WHERE id = ?",
    [user.balance, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorial: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
}

module.exports = User;