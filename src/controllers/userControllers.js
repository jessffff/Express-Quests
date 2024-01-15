// userControllers.js


const database = require("../../database");

const getUsers = (req, res) => {
    database
      .query("select * from users")
      .then(([user]) => {
        res.json(user); // use res.json instead of console.log
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
  
const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("select * from users where id = ?", [id])
      .then(([user]) => {
        if (user[0] != null) {
          res.json(user[0]);
        } else {
          res.sendStatus(404);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };





module.exports = {
  getUsers,
  getUserById
};