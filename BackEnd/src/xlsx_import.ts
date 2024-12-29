const XLSX = require('xlsx')
const path = require('path');

function loadExcelFile(filePath: string) {
    try {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    } catch (error) {
        console.error('Error reading the Excel file:', error);
        return null;
    }
}

function integerDateToString(serial: number): string {
    const date = new Date((serial - 25569) * 86400000);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export function getMovieDataSet() {
    var movies = []
    const excelData = loadExcelFile("./bdd/Dataset_movies.xlsx");
    for (const movie of excelData) {
        movie["Release Date"] = integerDateToString(movie["Release Date"])
        movies.push(movie)
    }
    return movies
}


export function getReviewDataSet() {
    var reviews = []
    const excelData = loadExcelFile("./bdd/Dataset_review.xlsx");
    for (const review of excelData) {
        review['Date'] = integerDateToString(review['Date'])
        reviews.push(review)
    }
    return reviews
}


