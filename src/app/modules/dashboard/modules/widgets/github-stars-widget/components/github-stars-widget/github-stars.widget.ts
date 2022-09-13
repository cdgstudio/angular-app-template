import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-github-stars-widget',
  templateUrl: './github-stars.widget.html',
  styleUrls: ['./github-stars.widget.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubStarsWidget {
  stars$ = this.githubService.getProjectStars('angular', 'angular');
  constructor(private githubService: GithubService) {}
}
