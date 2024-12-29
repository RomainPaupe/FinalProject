import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = '/api/movies';

  constructor(private http: HttpClient) {}

  searchMovies(criteria: any): Observable<any[]> {
    const params: any = {};
    Object.keys(criteria).forEach(key => {
      if (criteria[key] !== null && criteria[key] !== '') {
        params[key] = criteria[key];
      }
    });

    console.log('Query Parameters Sent to Backend:', params);
    return this.http.get<any[]>(this.apiUrl, { params });
  }

  getTopTenMovies() {
    return this.http.get<any[]>('/api/topTenMovies');
  }

  getMovieDetails(id: string | null) {
    return this.http.get<any>(`/api/movie/${id}`);
  }

  getMovieStatistics(movieID: string | null) {
    return this.http.get<{ movieID: number, title: string, starCounts: number[] }>(`/api/statistics/${movieID}`);
  }

  submitReview(review: {movieID: string; firstName: string; lastName: string; rate: number; comment: string }) {
    return this.http.post('/api/newReview', review);
  }


}
