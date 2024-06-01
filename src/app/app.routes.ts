import { Routes } from '@angular/router';
import { WeatherComponent } from './components/weather/weather.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'weather/:id', component: WeatherComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
