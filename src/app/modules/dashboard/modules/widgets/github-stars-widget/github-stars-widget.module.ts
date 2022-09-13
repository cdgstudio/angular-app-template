import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubStarsWidget } from './components/github-stars-widget/github-stars.widget';
import { WIDGET, WidgetModule } from '../widget';

@NgModule({
  declarations: [GithubStarsWidget],
  imports: [CommonModule, WidgetModule],
  providers: [
    {
      provide: WIDGET,
      useValue: GithubStarsWidget,
    },
  ],
})
export class GithubStarsWidgetModule {}
