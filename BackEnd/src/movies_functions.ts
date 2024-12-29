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

export function getTopTenMovies(movies: any[]){
    let topTenMovies : any[] = []
    let topTenMoviesIndex : any[] = []
    let moviesRates : number[] = []

    for(const movie of movies){
        moviesRates.push(movie["Rate"])
    }

    for(let i = 0; i < 10; i++){
        const maxRate : number = Math.max(...moviesRates)
        const indexMovie : number = moviesRates.indexOf(maxRate)
        moviesRates[indexMovie] = 0
        topTenMoviesIndex.push(indexMovie)
    }

    for (const index of topTenMoviesIndex) {
        topTenMovies.push(movies[index])
    }

    return topTenMovies
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