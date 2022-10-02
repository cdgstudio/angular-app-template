import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalService } from '../../../../../shared/modal';
import { DashboardStateService, WidgetState } from '../../../service/dashboard-state.service';
import { WidgetSelectionComponent } from '../../widget-selection/widget-selection.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {
  widgets$ = this.dashboardStateService.state$;

  constructor(private dashboardStateService: DashboardStateService, private modalService: ModalService) {}

  addNewWidget() {
    this.modalService.showModal(WidgetSelectionComponent);
    // this.dashboardStateService.addRandomWidget().subscribe();
  }

  trackById(index: number, widget: WidgetState) {
    return widget.id;
  }
}
