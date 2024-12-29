import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MovieService } from '../movie.service';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-search-page',
  imports: [
    FormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './search-page.component.html',
  standalone: true,
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {

  searchCriteria = {
    title: '',
    genre: '',
    director: '',
    actor: '',
    rating: null
  };


  movies: any[] = [];
  errorMessage: string | null = null;

  constructor(private movieService: MovieService) {}

  onSearch() {
    if (this.searchCriteria.rating !== null && (this.searchCriteria.rating < 0 || this.searchCriteria.rating > 5)) {
      this.errorMessage = 'Rating must be between 0 and 5.';
      return;
    }

    const formattedCriteria = {
      ...this.searchCriteria,
      rating: this.searchCriteria.rating !== null ? parseFloat(this.searchCriteria.rating) : null
    };

    const hasCriteria = Object.values(this.searchCriteria).some(value => value);
    if (!hasCriteria) {
      this.errorMessage = 'Please enter at least one search criter';
      return;
    }
    this.errorMessage = null;

    this.movieService.searchMovies(this.searchCriteria).pipe(
      tap((movies: any[]) => {
        console.log('Movies Received from Backend:', movies);
        this.movies = movies;
      }),
      tap({
        error: (error: any) => {
          this.errorMessage = 'No movies matched the given filters';
        }
      })
    ).subscribe();
  }
}
