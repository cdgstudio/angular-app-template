import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments';
import { OpenWeather } from './open-weather.models';

@Injectable({
  providedIn: 'root',
})
export class OpenWeatherService {
  constructor(private http: HttpClient) {}

  getWeatherForCity(city: string): Observable<OpenWeather> {
    const params = new HttpParams({ fromObject: { city } });

    return this.http.get<OpenWeather>(`${environment.openWeatherBaseUrl}/weather`, { params });
  }
}
