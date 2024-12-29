/**
 * @swagger
 * /api/movies:
 *   get:
 *     description: list of movies
 *     responses:
 *       200:
 *         description: ok
 */

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     description: list of reviews
 *     responses:
 *       200:
 *         description: ok
 */

/**
 * @swagger
 * /api/topTenMovies:
 *   get:
 *     description: list of the 10 best rated movies
 *     responses:
 *       200:
 *         description: ok
 */

/**
 * @swagger
 * /api/movie/{id}:
 *   get:
 *     description: movie by ID
 *     responses:
 *       200:
 *         description: ok
 */

/**
 * @swagger
 * /api/reviewMovie/{movieID}:
 *   get:
 *     description: all the reviews of a movie based on it's ID
 *     responses:
 *       200:
 *         description: ok
 */

/**
 * @swagger
 * /api/newReview:
 *   post:
 *     description: POST a new review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieID: integer
 *               firstName: string
 *               lastName: string
 *               date: string
 *               rate: integer
 *               comment: string
 *     responses:
 *       200:
 *         description: Successfully created a new review.
 */
