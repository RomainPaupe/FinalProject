"use strict";
exports.__esModule = true;
exports.getReviewDataSet = exports.getMovieDataSet = void 0;
const XLSX = require('xlsx');
const path = require('path');
function loadExcelFile(filePath) {
    try {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    }
    catch (error) {
        console.error('Error reading the Excel file:', error);
        return null;
    }
}
function integerDateToString(serial) {
    const date = new Date((serial - 25569) * 86400000);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
function getMovieDataSet() {
    var movies = [];
<<<<<<< Updated upstream
    const excelData = loadExcelFile("bdd/Dataset_movies.xlsx");
    for (const movie of excelData) {
=======
    var excelData = loadExcelFile("./bdd/Dataset_movies.xlsx");
    for (var _i = 0, excelData_1 = excelData; _i < excelData_1.length; _i++) {
        var movie = excelData_1[_i];
>>>>>>> Stashed changes
        movie["Release Date"] = integerDateToString(movie["Release Date"]);
        movies.push(movie);
    }
    return movies;
}
exports.getMovieDataSet = getMovieDataSet;
function getReviewDataSet() {
    var reviews = [];
<<<<<<< Updated upstream
    const excelData = loadExcelFile("bdd/Dataset_review.xlsx");
    for (const review of excelData) {
=======
    var excelData = loadExcelFile("./bdd/Dataset_review.xlsx");
    for (var _i = 0, excelData_2 = excelData; _i < excelData_2.length; _i++) {
        var review = excelData_2[_i];
>>>>>>> Stashed changes
        review['Date'] = integerDateToString(review['Date']);
        reviews.push(review);
    }
    return reviews;
}
exports.getReviewDataSet = getReviewDataSet;
//# sourceMappingURL=xlsx_import.js.map