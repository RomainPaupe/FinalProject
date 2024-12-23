"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewDataSet = exports.getMovieDataSet = void 0;
var XLSX = require('xlsx');
var path = require('path');
function loadExcelFile(filePath) {
    try {
        var workbook = XLSX.readFile(filePath);
        var sheetName = workbook.SheetNames[0];
        return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    }
    catch (error) {
        console.error('Error reading the Excel file:', error);
        return null;
    }
}
function integerDateToString(serial) {
    var date = new Date((serial - 25569) * 86400000);
    var day = String(date.getDate()).padStart(2, '0');
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var year = date.getFullYear();
    return "".concat(day, "/").concat(month, "/").concat(year);
}
function getMovieDataSet() {
    var movies = [];
    var excelData = loadExcelFile("bdd/Dataset_movies.xlsx");
    for (var _i = 0, excelData_1 = excelData; _i < excelData_1.length; _i++) {
        var movie = excelData_1[_i];
        movie["Release Date"] = integerDateToString(movie["Release Date"]);
        movies.push(movie);
    }
    return movies;
}
exports.getMovieDataSet = getMovieDataSet;
function getReviewDataSet() {
    var reviews = [];
    var excelData = loadExcelFile("bdd/Dataset_review.xlsx");
    for (var _i = 0, excelData_2 = excelData; _i < excelData_2.length; _i++) {
        var review = excelData_2[_i];
        review['Date'] = integerDateToString(review['Date']);
        reviews.push(review);
    }
    return reviews;
}
exports.getReviewDataSet = getReviewDataSet;
