# FinalProject
NodeJS and Angular project on A4 ESILV

## Team members
- Romain PAUPE
- Yann THEAGENE
- Sandeep PIDUGU
- Noëmie NURIJANYAN

## Project description
We are proud to deliver our movie discovery website, designed to help users explore and engage with their favorite films. This platform allows you to search for movies by title, genre, director, and more. You can also view ratings provided by other users and contribute your own reviews. The website is divided into two main sections. The first section focuses on enabling users to search for movies using various criteria, making it easier to find exactly what you’re looking for. The second section showcases the top 10 highest-rated movies on the platform, providing quick access to the most popular choices among our community. By clicking on a movie of interest, you can access detailed information such as the synopsis and statistical insights derived from user ratings, offering a comprehensive view of the film.

## Project repartition
To efficiently manage our work, we decided to divide the team into two smaller groups. Sandeep and Noémie took responsibility for the front-end development, focusing on creating an intuitive and visually appealing user interface. Meanwhile, Romain and Yann concentrated on back-end development, ensuring the website’s functionality and data management. This division of labor allowed us to streamline our workflow, minimize potential conflicts during the development process, and avoid issues related to commit and push synchronization. By organizing our team this way, we were able to deliver a good project.

## Project URL : https://github.com/RomainPaupe/FinalProject.git

To launch the project : 

`cd backend`
`backend>node src/index.js`
`cd frontend`
`frontend>ng serve`

The site opens on the home page : 

![image](https://github.com/user-attachments/assets/4c1b6b1d-af0f-4dfa-920e-f95d141026d6)

Clicking on the "Top 10 Movies" button, we get to the top ten movie page : 

![image](https://github.com/user-attachments/assets/87ede5e6-5a8a-4f7d-b946-117532da2434)

Clicking on the "Search Movie" button, we get to the search page : 

![image](https://github.com/user-attachments/assets/c537feaf-567e-4b12-8064-e2af2388f803)

If the filters entered by the user don't work, an error message shows up :

![image](https://github.com/user-attachments/assets/f2481a24-04c1-45fe-abe7-78c6c57da06c)

The user has to put at least one criteria to search for a movie, for example an actor : 

![image](https://github.com/user-attachments/assets/68dd555e-a263-4c82-be1b-97391dc930e1)

Another example with a search by rating. The search displays all the movies that have a rating between the rating entered and the rating entered + 0.5 :

![image](https://github.com/user-attachments/assets/d70237e4-135c-46b4-b3f1-3b0db0813d17)

Every movie displayed has a button "View Details". When clicked we get to the movie detail page : 

![image](https://github.com/user-attachments/assets/96d3aa2a-22a7-4601-883b-8bdb7c245c8a)

Clicking on the "Statistics" button gets us to the movie statistics page that displays a HighCharts for every review posted on this movie : 

![image](https://github.com/user-attachments/assets/69d8aabc-5ad2-4652-837f-bd9b7b894f3a)

Clicking on the "Rate Movie" button gets us to the rate movie page : 

![image](https://github.com/user-attachments/assets/64c16921-41ad-42e2-8e9f-94d72a8f5614)

We add a new review : 

![image](https://github.com/user-attachments/assets/16dae4e0-7eed-4c14-8f3a-922c3d39cc0c)

Here we added a new review of 5 star to the movie Inception. We can see that this review has been sucessfully added. We can see the difference on the average rate of the movie in its details page : 

![image](https://github.com/user-attachments/assets/c6fca393-cfbe-4b9d-b32d-fb972e3a0908)

The movie rating went from 2.75 to 3.2. We can also see it on the HighCharts : 

![image](https://github.com/user-attachments/assets/0b31b9b0-9fcb-44f9-b97e-c785f6105ba8)

And the top 10 movie gets affected : 

![image](https://github.com/user-attachments/assets/666bcb82-4a8b-4319-be4c-bbc3a03db376)



