"use strict";
exports.__esModule = true;
exports.saveReviewsToExcel = exports.getReviewsOfMovie = exports.getTopTenMovies = exports.attributRateToMovies = void 0;
var XLSX = require("xlsx");
function calculateMean(numbers) {
    var sum = numbers.reduce(function (acc, num) { return acc + num; }, 0);
    var mean = sum / numbers.length;
    return Math.round(mean * 100) / 100;
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
    var moviesRates = [];
    movies.forEach(function (movie, index) {
        moviesRates.push({ rate: movie["Rate"], index: index });
    });
    moviesRates.sort(function (a, b) { return b.rate - a.rate; });
    var topTenMoviesIndex = moviesRates.slice(0, 10).map(function (movie) { return movie.index; });
    for (var _i = 0, topTenMoviesIndex_1 = topTenMoviesIndex; _i < topTenMoviesIndex_1.length; _i++) {
        var index = topTenMoviesIndex_1[_i];
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
function saveReviewsToExcel(reviews, filePath) {
    try {
        var worksheet = XLSX.utils.json_to_sheet(reviews);
        var workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Reviews');
        XLSX.writeFile(workbook, filePath);
    }
    catch (error) {
        console.error('Error saving reviews to Excel:', error);
        throw error;
    }
}
exports.saveReviewsToExcel = saveReviewsToExcel;
