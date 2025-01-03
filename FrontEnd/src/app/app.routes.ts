import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component'
import { SearchPageComponent } from './search-page/search-page.component';
import { TopTenPageComponent} from './top-ten-page/top-ten-page.component';
import { MovieDetailPageComponent} from './movie-detail-page/movie-detail-page.component';
import { StatisticPageComponent} from './statistic-page/statistic-page.component';
import { RatePageComponent } from './rate-page/rate-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'top-ten-movies', component: TopTenPageComponent},
  { path: 'movie-detail/:id', component: MovieDetailPageComponent},
  { path: 'statistics/:id', component: StatisticPageComponent },
  { path: 'rate/:id', component: RatePageComponent },

];
