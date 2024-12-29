import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieService } from '../movie.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-top-ten-page',
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './top-ten-page.component.html',
  standalone: true,
  styleUrl: './top-ten-page.component.css'
})

export class TopTenPageComponent implements OnInit{
  topTenMovies: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getTopTenMovies().subscribe(movies => {
      this.topTenMovies = movies;
    });
  }
}
