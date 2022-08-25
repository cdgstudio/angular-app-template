import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNavigationProgressComponent } from './page-navigation-progress.component';

describe('PageNavigationProgressComponent', () => {
  let component: PageNavigationProgressComponent;
  let fixture: ComponentFixture<PageNavigationProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageNavigationProgressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageNavigationProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
