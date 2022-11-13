import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import {
  DashboardService,
  DashboardStateService,
  LocalStorageService,
  WidgetStateInterface,
} from '@cdgstudio/dashboard';
import { ModalService } from '../../../../../shared/modal';
import { WidgetSelectionComponent } from '../../widget-selection/widget-selection.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DashboardService,
    {
      provide: DashboardStateService,
      useClass: LocalStorageService,
    },
  ],
})
export class DashboardPage {
  widgets$ = this.dashboardService.state$;

  constructor(
    private dashboardService: DashboardService,
    private modalService: ModalService,
    private injector: Injector,
  ) {
    this.dashboardService.restoreState().subscribe();
  }

  addNewWidget() {
    this.modalService.showModal(WidgetSelectionComponent, { injector: this.injector });
  }

  trackById(index: number, widget: WidgetStateInterface) {
    return widget.id;
  }
}
