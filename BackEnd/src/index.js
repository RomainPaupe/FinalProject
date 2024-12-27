"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var xlsx_import_1 = require("./xlsx_import");
var movies_functions_1 = require("./movies_functions");
var app = express();
var movies = (0, xlsx_import_1.getMovieDataSet)();
var reviews = (0, xlsx_import_1.getReviewDataSet)();
movies = (0, movies_functions_1.attributRateToMovies)(movies, reviews);
var topTenMovies = (0, movies_functions_1.getTopTenMovies)(movies);
console.log(topTenMovies);
app.use(express.json());
app.get('/api/movies', function (req, res) {
    res.send(movies);
});
app.get('/api/reviews', function (req, res) {
    res.send(reviews);
});
app.get('/api/topTenMovies', function (req, res) {
    res.send(topTenMovies);
});
app.get('/api/movie/:id', function (req, res) {
    var id = +req.params.id;
    var idx = movies.findIndex(function (x) { return x["ID"] == id; });
    if (idx !== -1) {
        res.send(movies[idx]);
    }
    else {
        res.status(404).send('Todo entity not found for id:' + id);
    }
});
app.get('/api/reviewsMovie/:movieID', function (req, res) {
    var movieID = +req.params.movieID;
    var reviewsMovie = (0, movies_functions_1.getReviewsOfMovie)(reviews, movieID);
    res.send(reviewsMovie);
});
app.post('/api/newReview', function (req, res) {
    if (!req.body) {
        return res.status(400).send('Missing prioritys');
    }
    var newReview = { "ID": reviews.length, "Movie ID": req.body.movieID, "First Name": req.body.firstName, "Last Name": req.body.lastName,
        "Date": req.body.date, "Rate": req.body.rate, "Comment": req.body.comment };
    reviews.push(newReview);
    res.send(reviews);
});
app.listen(8080, function () {
    console.log('Get Movies : http://localhost:8080/api/movies' +
        '\nGet Reviews : http://localhost:8080/api/reviews' +
        '\nGet topTenMovies : http://localhost:8080/api/topTenMovies' +
        '\nGet topTenMovies : http://localhost:8080/api/movie/4' +
        '\nPost new Review : http://localhost:8080/api/newReview' +
        '\nGET reviews of a movie : http://localhost:8080/api/reviewsMovie/3');
});
