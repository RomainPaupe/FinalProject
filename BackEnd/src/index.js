"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
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
    console.log('Query Parameters Received:', req.query);
    var _a = req.query, title = _a.title, genre = _a.genre, director = _a.director, actor = _a.actor, rating = _a.rating;
    var filteredMovies = __spreadArray([], movies, true);
    if (title) {
        filteredMovies = filteredMovies.filter(function (movie) {
            return movie.Title.toLowerCase().includes(title.toLowerCase());
        });
    }
    if (genre) {
        filteredMovies = filteredMovies.filter(function (movie) {
            return movie.Genre.toLowerCase().includes(genre.toLowerCase());
        });
    }
    if (director) {
        filteredMovies = filteredMovies.filter(function (movie) {
            return movie.Director.toLowerCase().includes(director.toLowerCase());
        });
    }
    if (actor) {
        filteredMovies = filteredMovies.filter(function (movie) {
            return movie.Actors.toLowerCase().includes(actor.toLowerCase());
        });
    }
    if (rating) {
        var lowerBound_1 = parseFloat(rating);
        var parsedRating = parseFloat(rating);
        var upperBound_1 = lowerBound_1 + 0.5;
        filteredMovies = filteredMovies.filter(function (movie) {
            return movie.Rate && movie.Rate >= lowerBound_1 && movie.Rate < upperBound_1;
        });
    }
    if (filteredMovies.length === 0) {
        console.log('No movies matched the given filters.'); // Log pour débogage
        res.status(404).send({ message: 'No movies matched the given filters.' });
        return;
    }
    console.log('Filtered Movies:', filteredMovies); // Log des résultats après filtrage
    res.send(filteredMovies);
});
app.get('/api/reviews', function (req, res) {
    res.send(reviews);
});
app.get('/api/statistics/:id', function (req, res) {
    var movieID = +req.params.id;
    var movie = movies.find(function (m) { return m.ID === movieID; });
    var movieReviews = reviews.filter(function (review) { return review["Movie ID"] === movieID; });
    if (!movie) {
        res.status(404).send("Movie not found with ID: ".concat(movieID));
        return;
    }
    if (movieReviews.length === 0) {
        res.status(404).send("No reviews found for the movie with ID: ".concat(movieID));
        return;
    }
    var starCounts = Array(6).fill(0);
    for (var _i = 0, movieReviews_1 = movieReviews; _i < movieReviews_1.length; _i++) {
        var review = movieReviews_1[_i];
        var rate = Math.round(review["Rate"]);
        if (rate >= 0 && rate <= 5) {
            starCounts[rate]++;
        }
    }
    res.send({ movieID: movieID, title: movie.Title, starCounts: starCounts });
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
    console.log('Request body received:', req.body);
    var _a = req.body, movieID = _a.movieID, rate = _a.rate, comment = _a.comment, firstName = _a.firstName, lastName = _a.lastName;
    if (!movieID || !rate || !firstName || !lastName) {
        res.status(400).send('Movie ID, rate, first name and last name are required.');
        return;
    }
    var newReview = {
        ID: reviews.length,
        "Movie ID": parseInt(movieID, 10),
        "First Name": firstName,
        "Last Name": lastName,
        Date: new Date().toISOString(),
        Rate: parseInt(rate, 10),
        Comment: comment || ''
    };
    reviews.push(newReview);
    (0, movies_functions_1.saveReviewsToExcel)(reviews, './bdd/Dataset_review.xlsx');
    movies = (0, movies_functions_1.attributRateToMovies)(movies, reviews);
    res.status(201).send(newReview);
});
app.listen(8080, function () {
    console.log('Get Movies : http://localhost:8080/api/movies' +
        '\nGet Reviews : http://localhost:8080/api/reviews' +
        '\nGet topTenMovies : http://localhost:8080/api/topTenMovies' +
        '\nGet topTenMovies : http://localhost:8080/api/movie/4' +
        '\nPost new Review : http://localhost:8080/api/newReview' +
        '\nGET reviews of a movie : http://localhost:8080/api/reviewsMovie/3');
});
