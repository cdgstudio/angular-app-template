import { Pipe, PipeTransform } from '@angular/core';
import { OpenWeather } from '../services/open-weather.models';

@Pipe({
  name: 'weatherDescription',
})
export class WeatherDescriptionPipe implements PipeTransform {
  transform(value: OpenWeather | undefined): string {
    if (value === void 0) {
      return '';
    }
    return value.weather[0].description;
  }
}
