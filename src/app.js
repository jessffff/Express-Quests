const express = require("express");

const app = express();
app.use(express.json()); // Pour parser les requêtes JSON

const movieControllers = require("./controllers/movieControllers");
const validateMovie = require("./middlewares/validateMovie");

// Routes pour les films
app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.post("/api/movies", validateMovie, movieControllers.postMovie);
app.put("/api/movies/:id", movieControllers.updateMovie);

const userControllers = require('./controllers/userControllers');
const validateUser = require("./middlewares/validateUser");

// Routes pour les utilisateurs
app.get('/api/users', userControllers.getUsers);
app.get('/api/users/:id', userControllers.getUserById);
app.post("/api/users", validateUser, userControllers.postUsers);
app.put("/api/users/:id", userControllers.updateUsers);

module.exports = app;
