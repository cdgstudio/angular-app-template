import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalService } from '../../../../shared/modal';
import { AvailableWidgetType, DashboardStateService } from '../../service/dashboard-state.service';

@Component({
  selector: 'app-widget-selection',
  templateUrl: './widget-selection.component.html',
  styleUrls: ['./widget-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetSelectionComponent {
  widgets: { type: AvailableWidgetType; description: string }[] = [
    {
      type: 'weather',
      description: 'Weather widget',
    },
    {
      type: 'github-stars',
      description: 'GitHub stars',
    },
    {
      type: 'yt-statistics',
      description: 'YouTube statistics',
    },
  ];

  constructor(private dashboardStateService: DashboardStateService, private modalService: ModalService) {}

  addWidget(widgetType: string) {
    this.dashboardStateService.addWidget(widgetType).subscribe({
      complete: () => this.modalService.closeModal(),
    });
  }
}
