import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubStarsWidgetComponent } from './components/github-stars-widget/github-stars-widget.component';
import { WidgetModule } from '../widget';

@NgModule({
  declarations: [GithubStarsWidgetComponent],
  imports: [CommonModule, WidgetModule],
  exports: [GithubStarsWidgetComponent],
})
export class GithubStarsWidgetModule {}
