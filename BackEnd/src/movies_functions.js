"use strict";
exports.__esModule = true;
exports.getReviewsOfMovie = exports.getTopTenMovies = exports.attributRateToMovies = void 0;
function calculateMean(numbers) {
<<<<<<< Updated upstream
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const mean = sum / numbers.length;
    return mean;
=======
    var sum = numbers.reduce(function (acc, num) { return acc + num; }, 0);
    var mean = sum / numbers.length;
    return Math.round(mean * 100) / 100;
>>>>>>> Stashed changes
}
function attributRateToMovies(movies, reviews) {
    let reviews_list = new Array(movies.length).fill([]).map(() => []);
    for (const review of reviews) {
        const movieIndex = parseInt(review["Movie ID"]);
        reviews_list[movieIndex].push(review["Rate"]);
    }
    for (let i = 0; i < reviews_list.length; i++) {
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
    let topTenMovies = [];
    let topTenMoviesIndex = [];
    let moviesRates = [];
    for (const movie of movies) {
        moviesRates.push(movie["Rate"]);
    }
    for (let i = 0; i < 10; i++) {
        const maxRate = Math.max(...moviesRates);
        const indexMovie = moviesRates.indexOf(maxRate);
        moviesRates[indexMovie] = 0;
        topTenMoviesIndex.push(indexMovie);
    }
    for (const index of topTenMoviesIndex) {
        topTenMovies.push(movies[index]);
    }
    return topTenMovies;
}
exports.getTopTenMovies = getTopTenMovies;
function getReviewsOfMovie(reviews, movieID) {
    let reviewsMovie = [];
    for (const rev of reviews) {
        if (rev["Movie ID"] == movieID) {
            reviewsMovie.push(rev);
        }
    }
    return reviewsMovie;
}
exports.getReviewsOfMovie = getReviewsOfMovie;
//# sourceMappingURL=movies_functions.js.map