import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { ChangeDetectorRef } from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-movie-detail-page',
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './movie-detail-page.component.html',
  standalone: true,
  styleUrl: './movie-detail-page.component.css'
})
export class MovieDetailPageComponent implements OnInit {
  movie: any = null;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieDetails(movieId).subscribe(movie => {
      this.movie = movie;
      this.cdr.detectChanges();
    },
      error => {
        console.error('Error fetching movie details:', error);
      }

    );
  }

  loadMovieDetails(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.movieService.getMovieDetails(movieId).subscribe(
        movie => {
          this.movie = movie;
          this.cdr.detectChanges();
        },
        error => {
          console.error('Error fetching movie details:', error);
        }
      );
    }
  }
}
