import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../../services/weather.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit {
  forecastId: string;
  chart: any;

  constructor(private route: ActivatedRoute, private weatherService: WeatherService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.forecastId = params['id'];
      this.loadWeatherData();
    });
  }

  loadWeatherData(): void {
    this.weatherService.getWeatherForecast(this.forecastId).subscribe(data => {
      const labels = data.map((d: any) => new Date(d.date).toLocaleDateString());
      const temperatures = data.map((d: any) => d.temperature);

      this.chart = new Chart('weatherChart', {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Temperature',
            data: temperatures,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: false,
          }]
        },
        options: {
          scales: {
            x: {
              type: 'category',
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Temperature (°F)'
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `Temperature: ${context.parsed.y}°F`;
                }
              }
            }
          }
        }
      });
    });
  }
}