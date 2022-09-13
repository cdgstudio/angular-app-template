import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardStateService } from '../../../service/dashboard-state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {
  widgets$ = this.dashboardStateService.state$;

  constructor(private dashboardStateService: DashboardStateService) {}

  addNewWidget() {
    this.dashboardStateService.addRandomWidget().subscribe();
  }
}
