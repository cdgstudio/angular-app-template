import { Pipe, PipeTransform } from '@angular/core';
import { OpenWeather } from '../services/open-weather.models';

@Pipe({
  name: 'weatherIconUrl',
})
export class WeatherIconUrlPipe implements PipeTransform {
  transform(weather: OpenWeather | undefined): string | null {
    if (weather === void 0) {
      return null;
    }

    return `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  }
}
