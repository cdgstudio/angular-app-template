import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubStarsWidget } from './components/github-stars-widget/github-stars.widget';
import { WidgetModule } from '../widget';

@NgModule({
  declarations: [GithubStarsWidget],
  imports: [CommonModule, WidgetModule],
  exports: [GithubStarsWidget],
})
export class GithubStarsWidgetModule {}
