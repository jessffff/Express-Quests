const express = require("express");

const app = express();
app.use(express.json()); // add this line
const movieControllers = require("./controllers/movieControllers");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.post("/api/movies", movieControllers.postMovie);
app.put("/api/movies/:id", movieControllers.updateMovie);

// Ajout des routes pour les utilisateurs
const userControllers = require('./controllers/userControllers');

app.get('/api/users', userControllers.getUsers);
app.get('/api/users/:id', userControllers.getUserById);
app.post("/api/users", userControllers.postUsers);
app.put("/api/users/:id", userControllers.updateUsers);


module.exports = app;
