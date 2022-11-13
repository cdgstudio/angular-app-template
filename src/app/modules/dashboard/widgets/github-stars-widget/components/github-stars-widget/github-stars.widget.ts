import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EDIT_WIDGET_MODULE, StatefullWidget, WIDGET, StatelessWidget } from '@cdgstudio/dashboard';
import { defer, EMPTY, Observable, ReplaySubject, switchMap } from 'rxjs';
import { GithubStarsWidgetState } from '../../models/state.models';
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
    {
      provide: EDIT_WIDGET_MODULE,
      useValue: () => import('../../../github-stars-widget-edit').then((f) => f.GithubStarsWidgetEditModule),
    },
  ],
})
export class GithubStarsWidget implements StatefullWidget<GithubStarsWidgetState> {
  state$ = new ReplaySubject<GithubStarsWidgetState>(1);
  stars$ = this.state$.pipe(
    switchMap(({ organization, project }) => this.githubService.getProjectStars(organization, project)),
  );

  constructor(private githubService: GithubService) {}

  setState(value: GithubStarsWidgetState | undefined): Observable<void> {
    return defer(() => {
      if (value === void 0) {
        this.state$.next({ organization: 'angular', project: 'angular' });
      } else {
        this.state$.next(value);
      }
      return EMPTY;
    });
  }
  getState(): Observable<GithubStarsWidgetState> {
    return this.state$;
  }
}
