import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherWidgetEdit } from './weather.widget-edit';

describe('WeatherWidgetEditComponent', () => {
  let component: WeatherWidgetEdit;
  let fixture: ComponentFixture<WeatherWidgetEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherWidgetEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherWidgetEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
