import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-github-stars-widget',
  templateUrl: './github-stars-widget.component.html',
  styleUrls: ['./github-stars-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubStarsWidgetComponent {
  stars$ = this.githubService.getProjectStars('angular', 'angular');
  constructor(private githubService: GithubService) {}
}
