import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WIDGET } from '../../../widget';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-github-stars-widget',
  templateUrl: './github-stars.widget.html',
  styleUrls: ['./github-stars.widget.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: WIDGET,
      useExisting: GithubStarsWidget,
    },
  ],
})
export class GithubStarsWidget {
  stars$ = this.githubService.getProjectStars('angular', 'angular');
  constructor(private githubService: GithubService) {}
}
