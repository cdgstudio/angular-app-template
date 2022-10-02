import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalService } from '../../../../shared/modal';
import { DashboardStateService } from '../../service/dashboard-state.service';

@Component({
  selector: 'app-widget-selection',
  templateUrl: './widget-selection.component.html',
  styleUrls: ['./widget-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetSelectionComponent {
  widgets = [
    {
      type: 'weather',
      description: 'Weather widget',
    },
    {
      type: 'github-stars',
      description: 'GitHub stars',
    },
  ] as const;

  constructor(private dashboardStateService: DashboardStateService, private modalService: ModalService) {}

  addWidget(widgetType: string) {
    this.dashboardStateService.addWidget(widgetType).subscribe({
      complete: () => this.modalService.closeModal(),
    });
  }
}
