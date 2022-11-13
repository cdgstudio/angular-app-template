import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubStarsWidget } from './components/github-stars-widget/github-stars.widget';
import { WidgetModule } from '../widget';
import { WIDGET_COMPONENT } from '@cdgstudio/dashboard';

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
