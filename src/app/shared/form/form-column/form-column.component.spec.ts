import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormColumnComponent } from './form-column.component';

describe('FormColumnComponent', () => {
  let component: FormColumnComponent;
  let fixture: ComponentFixture<FormColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormColumnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
