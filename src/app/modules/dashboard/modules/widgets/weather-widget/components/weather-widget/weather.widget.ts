import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { EditableWidget, EDITABLE_WIDGET, EDIT_FORM, ReloadableWidget, RELOADABLE_WIDGET } from '../../../widget';
import { OpenWeather } from '../../services/open-weather.models';
import { OpenWeatherService } from '../../services/open-weather.service';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather.widget.html',
  styleUrls: ['./weather.widget.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    { provide: RELOADABLE_WIDGET, useExisting: WeatherWidget },
    { provide: EDITABLE_WIDGET, useExisting: WeatherWidget },
    {
      provide: EDIT_FORM,
      useValue: () => import('../../../weather-widget-edit').then((m) => m.WeatherWidgetEditModule),
    },
  ],
})
export class WeatherWidget implements OnInit, ReloadableWidget, EditableWidget {
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
