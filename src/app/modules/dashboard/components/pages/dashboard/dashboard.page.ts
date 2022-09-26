import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardStateService, WidgetState } from '../../../service/dashboard-state.service';

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

  trackById(index: number, widget: WidgetState) {
    return widget.id;
  }
}
