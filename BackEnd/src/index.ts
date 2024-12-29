import * as express from 'express'
import { Request, Response} from 'express';
import {getMovieDataSet, getReviewDataSet} from "./xlsx_import";
import {attributRateToMovies, getReviewsOfMovie, getTopTenMovies, saveReviewsToExcel} from "./movies_functions"
const app = express();
let movies = getMovieDataSet()
const reviews = getReviewDataSet()
movies = attributRateToMovies(movies, reviews)
const topTenMovies = getTopTenMovies(movies)
console.log(topTenMovies)

app.use(express.json())

app.get('/api/movies', (req: Request, res: Response) => {
    console.log('Query Parameters Received:', req.query);

    const { title, genre, director, actor, rating } = req.query;

    let filteredMovies = [...movies];

    if (title) {
        filteredMovies = filteredMovies.filter(movie =>
            movie.Title.toLowerCase().includes((title as string).toLowerCase())
        );
    }

    if (genre) {
        filteredMovies = filteredMovies.filter(movie =>
            movie.Genre.toLowerCase().includes((genre as string).toLowerCase())
        );
    }

    if (director) {
        filteredMovies = filteredMovies.filter(movie =>
            movie.Director.toLowerCase().includes((director as string).toLowerCase())
        );
    }

    if (actor) {
        filteredMovies = filteredMovies.filter(movie =>
            movie.Actors.toLowerCase().includes((actor as string).toLowerCase())
        );
    }

    if (rating) {
        const lowerBound = parseFloat(rating as string);
        const parsedRating = parseFloat(rating as string);
        const upperBound = lowerBound + 0.5;
        filteredMovies = filteredMovies.filter(movie =>
            movie.Rate && movie.Rate >= lowerBound && movie.Rate < upperBound
        );

    }
    if (filteredMovies.length === 0) {
        console.log('No movies matched the given filters.');
        res.status(404).send({ message: 'No movies matched the given filters.' });
        return;
    }

    console.log('Filtered Movies:', filteredMovies);
    res.send(filteredMovies);
});

app.get('/api/reviews', (req: Request, res: Response) => {
    res.send(reviews)
})

app.get('/api/statistics/:id', (req: Request, res: Response) => {
    const movieID = +req.params.id;
    const movie = movies.find(m => m.ID === movieID);
    const movieReviews = reviews.filter(review => review["Movie ID"] === movieID);

    if (!movie) {
        res.status(404).send(`Movie not found with ID: ${movieID}`);
        return;
    }

    if (movieReviews.length === 0) {
        res.status(404).send(`No reviews found for the movie with ID: ${movieID}`);
        return;
    }

    const starCounts = Array(6).fill(0);
    for (const review of movieReviews) {
        const rate = Math.round(review["Rate"]);
        if (rate >= 0 && rate <= 5) {
            starCounts[rate]++;
        }
    }

    res.send({ movieID, title: movie.Title, starCounts });
});

app.get('/api/topTenMovies', (req: Request, res : Response) => {
    res.send(topTenMovies)
})

app.get('/api/movie/:id', (req: Request, res : Response) => {
    const id = +req.params.id
    const idx = movies.findIndex(x => x["ID"] == id)
    if (idx !== -1) {
        res.send(movies[idx]);
    }
    else {
        res.status(404).send('Todo entity not found for id:' + id);
    }
})

app.get('/api/reviewsMovie/:movieID', (req: Request, res: Response) => {
    const movieID = +req.params.movieID
    const reviewsMovie = getReviewsOfMovie(reviews, movieID)
    res.send(reviewsMovie)
})

app.post('/api/newReview', (req: Request, res: Response): void => {
    console.log('Request body received:', req.body);
    const { movieID, rate, comment, firstName, lastName } = req.body;

    if (!movieID || !rate || !firstName || !lastName) {
        res.status(400).send('Movie ID, rate, first name and last name are required.');
        return;
    }

    const newReview = {
        ID: reviews.length,
        "Movie ID": parseInt(movieID, 10),
        "First Name": firstName,
        "Last Name": lastName,
        Date: new Date().toISOString(),
        Rate: parseInt(rate, 10),
        Comment: comment || ''
    };

    reviews.push(newReview);
    saveReviewsToExcel(reviews, './bdd/Dataset_review.xlsx');
    movies = attributRateToMovies(movies, reviews);
    res.status(201).send(newReview);
});


app.listen(8080, () => {
    console.log('Get Movies : http://localhost:8080/api/movies' +
        '\nGet Reviews : http://localhost:8080/api/reviews' +
        '\nGet topTenMovies : http://localhost:8080/api/topTenMovies' +
        '\nGet topTenMovies : http://localhost:8080/api/movie/4' +
        '\nPost new Review : http://localhost:8080/api/newReview' +
        '\nGET reviews of a movie : http://localhost:8080/api/reviewsMovie/3');
});