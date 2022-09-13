import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubStarsWidget } from './github-stars.widget';

describe('GithubStarsWidgetComponent', () => {
  let component: GithubStarsWidget;
  let fixture: ComponentFixture<GithubStarsWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GithubStarsWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(GithubStarsWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
