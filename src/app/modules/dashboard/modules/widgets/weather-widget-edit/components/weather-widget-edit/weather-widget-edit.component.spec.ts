import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherWidgetEditComponent } from './weather-widget-edit.component';

describe('WeatherWidgetEditComponent', () => {
  let component: WeatherWidgetEditComponent;
  let fixture: ComponentFixture<WeatherWidgetEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherWidgetEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherWidgetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
