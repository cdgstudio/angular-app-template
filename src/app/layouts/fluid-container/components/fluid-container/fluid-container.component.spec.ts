import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluidContainerComponent } from './fluid-container.component';

describe('FluidContainerComponent', () => {
  let component: FluidContainerComponent;
  let fixture: ComponentFixture<FluidContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FluidContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FluidContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
