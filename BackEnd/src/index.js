"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var xlsx_import_1 = require("./xlsx_import");
var movies_functions_1 = require("./movies_functions");
var app = express();
var movies = (0, xlsx_import_1.getMovieDataSet)();
var reviews = (0, xlsx_import_1.getReviewDataSet)();
movies = (0, movies_functions_1.attributRateToMovies)(movies, reviews);
app.use(express.json());
app.get('/api/movies', function (req, res) {
    res.send(movies);
});
app.get('/api/reviews', function (req, res) {
    res.send(reviews);
});
app.listen(8080, function () {
    console.log('Get Movies : http://localhost:8080/api/movies' +
        '\nGet Reviews : http://localhost:8080/api/reviews');
});
