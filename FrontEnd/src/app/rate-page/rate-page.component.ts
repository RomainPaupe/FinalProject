import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovieService } from '../movie.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-rate-page',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './rate-page.component.html',
  standalone: true,
  styleUrl: './rate-page.component.css'
})

export class RatePageComponent {
  rateForm: FormGroup;
  movieID: string | null = null;

  constructor(
    private route: ActivatedRoute,
    protected router: Router,
    private movieService: MovieService,
    private fb: FormBuilder
  ) {
    this.rateForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      rate: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['']
    });
  }

  ngOnInit(): void {
    this.movieID = this.route.snapshot.paramMap.get('id');
  }

  submitReview(): void {
    if (this.rateForm.valid && this.movieID) {
      const review = {
        movieID: this.movieID,
        firstName: this.rateForm.value.firstName,
        lastName: this.rateForm.value.lastName,
        rate: this.rateForm.value.rate,
        comment: this.rateForm.value.comment
      };
      console.log('Submitting review:', review);
      this.movieService.submitReview(review).subscribe(
        () => {
          alert('Review submitted successfully!');
        },
        error => {
          console.error('Error submitting review:', error);
      });
    }
  }
}
