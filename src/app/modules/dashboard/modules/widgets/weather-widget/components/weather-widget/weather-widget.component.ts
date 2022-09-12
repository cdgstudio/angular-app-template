import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Reloadable, RELOADABLE } from '../../../reloadable-widget';
import { Editable, EDITABLE, EDIT_FORM } from '../../../widget-edit';
import { OpenWeather } from '../../services/open-weather.models';
import { OpenWeatherService } from '../../services/open-weather.service';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    { provide: RELOADABLE, useExisting: WeatherWidgetComponent },
    { provide: EDITABLE, useExisting: WeatherWidgetComponent },
    {
      provide: EDIT_FORM,
      useValue: () =>
        import('../../../weather-widget-edit/weather-widget-edit.module').then((m) => m.WeatherWidgetEditModule),
    },
  ],
})
export class WeatherWidgetComponent implements OnInit, Reloadable, Editable {
  protected city = 'Warsaw';
  protected lastResponse?: OpenWeather;

  constructor(private changeDetector: ChangeDetectorRef, private openWeatherService: OpenWeatherService) {}

  ngOnInit() {
    this.changeDetector.markForCheck();
    this.reload().subscribe();
  }

  reload(): Observable<void> {
    return this.openWeatherService.getWeatherForCity(this.city).pipe(
      tap((data) => (this.lastResponse = data)),
      map(() => void 0),
      tap(() => this.changeDetector.markForCheck()),
    );
  }

  setNewData(value: any): Observable<void> {
    this.city = value.city;
    return this.reload();
  }
}
