import * as XLSX from 'xlsx';

function calculateMean(numbers: number[]): number {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const mean = sum / numbers.length;
    return Math.round(mean*100)/100;
}

export function attributRateToMovies(movies: any[], reviews: any[]) {
    let reviews_list : any[] = new Array(movies.length).fill([]).map(() => []);
    for (const review of reviews){
        const movieIndex =parseInt(review["Movie ID"])
        reviews_list[movieIndex].push(review["Rate"])
    }

    for (let i = 0; i <  reviews_list.length; i++) {
        if (reviews_list[i].length > 0){
            movies[i]["Rate"] = calculateMean(reviews_list[i])
        }
        else {
            movies[i]["Rate"] = null
        }

    }
    return movies
}

export function getTopTenMovies(movies: any[]): any[] {
    let topTenMovies: any[] = [];
    let moviesRates: { rate: number, index: number }[] = [];

    movies.forEach((movie, index) => {
        moviesRates.push({ rate: movie["Rate"], index });
    });

    moviesRates.sort((a, b) => b.rate - a.rate);

    const topTenMoviesIndex = moviesRates.slice(0, 10).map(movie => movie.index);

    for (const index of topTenMoviesIndex) {
        topTenMovies.push(movies[index]);
    }

    return topTenMovies;
}

export function getReviewsOfMovie(reviews: any[], movieID : number){
    let reviewsMovie = []
    for (const rev of reviews){
        if (rev["Movie ID"] == movieID) {
            reviewsMovie.push(rev)
        }
    }
    return reviewsMovie
}

export function saveReviewsToExcel(reviews: any[], filePath: string): void {
    try {
        const worksheet = XLSX.utils.json_to_sheet(reviews);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Reviews');
        XLSX.writeFile(workbook, filePath);
    } catch (error) {
        console.error('Error saving reviews to Excel:', error);
        throw error;
    }
}
