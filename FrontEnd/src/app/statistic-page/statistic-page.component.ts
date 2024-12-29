import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as Highcharts from 'highcharts';
import {HighchartsChartModule} from 'highcharts-angular';
import { MovieService } from '../movie.service';
import { ActivatedRoute } from '@angular/router';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-statistic-page',
  imports: [
    RouterLink,
    HighchartsChartModule,
    NgIf
  ],
  templateUrl: './statistic-page.component.html',
  standalone: true,
  styleUrls: ['./statistic-page.component.css']
})

export class StatisticPageComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  movieID: string | null = null;
  movieTitle: string='';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.movieID = this.route.snapshot.paramMap.get('id');

    if (this.movieID) {
      this.movieService.getMovieStatistics(this.movieID).subscribe(statistics => {
        this.movieTitle = statistics.title;
        this.setupChart(statistics.starCounts);
      });
    }
  }

  setupChart(starCounts: number[]): void {
    this.chartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Movie Reviews'
      },
      xAxis: {
        categories: ['0 star', '1 star', '2 stars', '3 stars', '4 stars', '5 stars'],
        title: {
          text: 'Star number'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Review number'
        }
      },
      series: [{
        name: 'Review number',
        data: starCounts,
        type: 'column'
      }]
    };
  }
}
