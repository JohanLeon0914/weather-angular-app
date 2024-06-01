import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiUrl = 'https://api.weather.gov/gridpoints/';

  constructor(private http: HttpClient) { }

  getWeatherForecast(id: string): Observable<any> {
    let endpoint;
    switch (id) {
      case 'TOP':
        endpoint = 'TOP/31,80/forecast';
        break;
      case 'LWX':
        endpoint = 'LWX/31,80/forecast';
        break;
      default:
        throw new Error('Invalid forecast ID');
    }
    return this.http.get(`${this.apiUrl}${endpoint}`).pipe(
      map((response: any) => response.properties.periods.map((period: any) => ({
        date: period.startTime,
        temperature: period.temperature
      })))
    );
  }
}