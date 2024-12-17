"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attributRateToMovies = void 0;
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
