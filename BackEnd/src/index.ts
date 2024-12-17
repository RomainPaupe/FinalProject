import * as express from 'express'
import { Request, Response} from 'express';
import {getMovieDataSet, getReviewDataSet} from "./xlsx_import";
import {attributRateToMovies} from "./movies_functions"
const app = express();

var movies = getMovieDataSet()
var reviews = getReviewDataSet()
movies = attributRateToMovies(movies, reviews)

app.use(express.json())

app.get('/api/movies', (req: Request, res: Response) => {
    res.send(movies)
})

app.get('/api/reviews', (req: Request, res: Response) => {
    res.send(reviews)
})

app.listen(8080, () => {
    console.log('Get Movies : http://localhost:8080/api/movies' +
        '\nGet Reviews : http://localhost:8080/api/reviews');
});