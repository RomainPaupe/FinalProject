"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const xlsx_import_1 = require("./xlsx_import");
const movies_functions_1 = require("./movies_functions");
const app = express();
let movies = (0, xlsx_import_1.getMovieDataSet)();
const reviews = (0, xlsx_import_1.getReviewDataSet)();
movies = (0, movies_functions_1.attributRateToMovies)(movies, reviews);
const topTenMovies = (0, movies_functions_1.getTopTenMovies)(movies);
console.log(topTenMovies);
app.use(express.json());
app.get('/api/movies', (req, res) => {
    res.send(movies);
});
app.get('/api/reviews', (req, res) => {
    res.send(reviews);
});
app.get('/api/statistics/:id', (req, res) => {
    const movieID = +req.params.id;
    const movie = movies.find(m => m.ID === movieID);
    const movieReviews = reviews.filter(review => review["Movie ID"] === movieID);
    if (!movie) {
        res.status(404).send(`Movie not found with ID: ${movieID}`);
        return;
    }
    if (movieReviews.length === 0) {
        res.status(404).send(`No reviews found for the movie with ID: ${movieID}`);
        return;
    }
    const starCounts = Array(6).fill(0);
    for (const review of movieReviews) {
        const rate = Math.round(review["Rate"]);
        if (rate >= 0 && rate <= 5) {
            starCounts[rate]++;
        }
    }
    res.send({ movieID, title: movie.Title, starCounts });
});
app.get('/api/topTenMovies', (req, res) => {
    res.send(topTenMovies);
});
app.get('/api/movie/:id', (req, res) => {
    const id = +req.params.id;
    const idx = movies.findIndex(x => x["ID"] == id);
    if (idx !== -1) {
        res.send(movies[idx]);
    }
    else {
        res.status(404).send('Todo entity not found for id:' + id);
    }
});
app.get('/api/reviewsMovie/:movieID', (req, res) => {
    const movieID = +req.params.movieID;
    const reviewsMovie = (0, movies_functions_1.getReviewsOfMovie)(reviews, movieID);
    res.send(reviewsMovie);
});
// @ts-ignore
app.post('/api/newReview', function (req, res) {
    if (!req.body) {
        return res.status(400).send('Missing prioritys');
    }
    const newReview = { "ID": reviews.length, "Movie ID": req.body.movieID, "First Name": req.body.firstName, "Last Name": req.body.lastName,
        "Date": req.body.date, "Rate": req.body.rate, "Comment": req.body.comment };
    reviews.push(newReview);
    res.send(reviews);
});
app.listen(8080, () => {
    console.log('Get Movies : http://localhost:8080/api/movies' +
        '\nGet Reviews : http://localhost:8080/api/reviews' +
        '\nGet topTenMovies : http://localhost:8080/api/topTenMovies' +
        '\nGet topTenMovies : http://localhost:8080/api/movie/4' +
        '\nPost new Review : http://localhost:8080/api/newReview' +
        '\nGET reviews of a movie : http://localhost:8080/api/reviewsMovie/3');
});
//# sourceMappingURL=index.js.map