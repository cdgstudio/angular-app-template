import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetToolbarComponent } from './widget-toolbar.component';

describe('WidgetToolbarComponent', () => {
  let component: WidgetToolbarComponent;
  let fixture: ComponentFixture<WidgetToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
