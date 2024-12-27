import * as express from 'express'
import { Request, Response} from 'express';
import {getMovieDataSet, getReviewDataSet} from "./xlsx_import";
import {attributRateToMovies, getReviewsOfMovie, getTopTenMovies} from "./movies_functions"
const app = express();

let movies = getMovieDataSet()
const reviews = getReviewDataSet()
movies = attributRateToMovies(movies, reviews)
const topTenMovies = getTopTenMovies(movies)
console.log(topTenMovies)

app.use(express.json())

app.get('/api/movies', (req: Request, res: Response) => {
    res.send(movies)
})

app.get('/api/reviews', (req: Request, res: Response) => {
    res.send(reviews)
})

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

app.post('/api/newReview', function (req: Request, res: Response){
    if (!req.body) {
        return res.status(400).send('Missing prioritys');
    }
    const newReview = {"ID": reviews.length, "Movie ID": req.body.movieID, "First Name": req.body.firstName, "Last Name": req.body.lastName,
                            "Date" : req.body.date, "Rate" : req.body.rate, "Comment": req.body.comment}
    reviews.push(newReview)
    res.send(reviews)
})


app.listen(8080, () => {
    console.log('Get Movies : http://localhost:8080/api/movies' +
        '\nGet Reviews : http://localhost:8080/api/reviews' +
        '\nGet topTenMovies : http://localhost:8080/api/topTenMovies' +
        '\nGet topTenMovies : http://localhost:8080/api/movie/4' +
        '\nPost new Review : http://localhost:8080/api/newReview' +
        '\nGET reviews of a movie : http://localhost:8080/api/reviewsMovie/3');
});