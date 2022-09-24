import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubStarsWidget } from './components/github-stars-widget/github-stars.widget';
import { WIDGET_COMPONENT, WidgetModule } from '../widget';

@NgModule({
  declarations: [GithubStarsWidget],
  imports: [CommonModule, WidgetModule],
  providers: [
    {
      provide: WIDGET_COMPONENT,
      useValue: GithubStarsWidget,
    },
  ],
})
export class GithubStarsWidgetModule {}
