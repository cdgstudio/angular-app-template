import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubStarsWidgetEditComponent } from './github-stars-widget-edit.component';

describe('GithubStarsWidgetEditComponent', () => {
  let component: GithubStarsWidgetEditComponent;
  let fixture: ComponentFixture<GithubStarsWidgetEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithubStarsWidgetEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GithubStarsWidgetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
