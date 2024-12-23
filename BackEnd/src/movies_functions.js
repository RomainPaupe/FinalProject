"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewsOfMovie = exports.getTopTenMovies = exports.attributRateToMovies = void 0;
function calculateMean(numbers) {
    var sum = numbers.reduce(function (acc, num) { return acc + num; }, 0);
    var mean = sum / numbers.length;
    return mean;
}
function attributRateToMovies(movies, reviews) {
    var reviews_list = new Array(movies.length).fill([]).map(function () { return []; });
    for (var _i = 0, reviews_1 = reviews; _i < reviews_1.length; _i++) {
        var review = reviews_1[_i];
        var movieIndex = parseInt(review["Movie ID"]);
        reviews_list[movieIndex].push(review["Rate"]);
    }
    for (var i = 0; i < reviews_list.length; i++) {
        if (reviews_list[i].length > 0) {
            movies[i]["Rate"] = calculateMean(reviews_list[i]);
        }
        else {
            movies[i]["Rate"] = null;
        }
    }
    return movies;
}
exports.attributRateToMovies = attributRateToMovies;
function getTopTenMovies(movies) {
    var topTenMovies = [];
    var topTenMoviesIndex = [];
    var moviesRates = [];
    for (var _i = 0, movies_1 = movies; _i < movies_1.length; _i++) {
        var movie = movies_1[_i];
        moviesRates.push(movie["Rate"]);
    }
    for (var i = 0; i < 10; i++) {
        var maxRate = Math.max.apply(Math, moviesRates);
        var indexMovie = moviesRates.indexOf(maxRate);
        moviesRates[indexMovie] = 0;
        topTenMoviesIndex.push(indexMovie);
    }
    for (var _a = 0, topTenMoviesIndex_1 = topTenMoviesIndex; _a < topTenMoviesIndex_1.length; _a++) {
        var index = topTenMoviesIndex_1[_a];
        topTenMovies.push(movies[index]);
    }
    return topTenMovies;
}
exports.getTopTenMovies = getTopTenMovies;
function getReviewsOfMovie(reviews, movieID) {
    var reviewsMovie = [];
    for (var _i = 0, reviews_2 = reviews; _i < reviews_2.length; _i++) {
        var rev = reviews_2[_i];
        if (rev["Movie ID"] == movieID) {
            reviewsMovie.push(rev);
        }
    }
    return reviewsMovie;
}
exports.getReviewsOfMovie = getReviewsOfMovie;
