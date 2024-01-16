// userControllers.js


const database = require("../../database");


const getUsers = (req, res) => {
  let query = "SELECT * FROM users";
  const queryParams = [];

  // Vérifier si les paramètres language ou city sont présents
  if (req.query.language || req.query.city) {
    query += " WHERE";

    if (req.query.language) {
      query += " language = ?";
      queryParams.push(req.query.language);
    }

    if (req.query.city
    ) {
      // Ajouter un 'AND' si 'language' est aussi présent
      if (req.query.language) {
        query += " AND";
      }
      query += " city = ?";
      queryParams.push(req.query.city);
    }
  }

  // Exécuter la requête avec les paramètres filtrés
  database
    .query(query, queryParams)
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500); // Utiliser 500 pour une erreur serveur
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
      res.sendStatus(422);
    });
};


const postUsers = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language ) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.status(201).send({ id: result.insertId });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(422);
    });
};

const updateUsers = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?",
      [firstname, lastname, email, city, language, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(422);
    });
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("delete from users where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(422);
    });
};

module.exports = {
  getUsers,
  getUserById,
  postUsers,
  updateUsers,
  deleteUser,
};
