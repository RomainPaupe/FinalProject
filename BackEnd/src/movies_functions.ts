function calculateMean(numbers: number[]): number {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const mean = sum / numbers.length;
    return mean;
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