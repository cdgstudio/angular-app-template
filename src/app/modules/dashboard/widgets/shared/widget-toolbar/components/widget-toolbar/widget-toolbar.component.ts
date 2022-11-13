import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Host, Inject, Injector, Optional } from '@angular/core';
import {
  DashboardService,
  EditableWidgetFormImport,
  EDIT_WIDGET_COMPONENT,
  EDIT_WIDGET_MODULE,
  isReloadableWidget,
  isStatefullWidget,
  Widget,
  WIDGET,
  WidgetState,
  WIDGET_ID,
} from '@cdgstudio/dashboard';
import { concat, finalize, lastValueFrom, switchMap, take } from 'rxjs';
import { ModalService } from '../../../../../../../shared/modal';
import { ModuleLoaderService } from '../../../../../../../shared/module-loader';

@Component({
  selector: 'app-widget-toolbar',
  templateUrl: './widget-toolbar.component.html',
  styleUrls: ['./widget-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetToolbarComponent {
  reloadableWidget = isReloadableWidget(this.widget);

  constructor(
    @Inject(WIDGET_ID) private widgetId: string,
    private changeDetector: ChangeDetectorRef,
    private moduleLoaderService: ModuleLoaderService,
    private modalService: ModalService,

    @Host() @Inject(WIDGET) private widget: Widget,
    @Optional()
    @Host()
    @Inject(EDIT_WIDGET_MODULE)
    public moduleSourceImport: EditableWidgetFormImport | null,
    private dashboardStateService: DashboardService,
  ) {}

  protected isReloading = false;

  reload() {
    const widget = this.widget;
    if (!isReloadableWidget(widget) || this.isReloading) {
      return;
    }

    this.isReloading = true;
    widget
      .reload()
      .pipe(
        finalize(() => {
          this.isReloading = false;
          this.changeDetector.detectChanges();
        }),
      )
      .subscribe();
  }

  remove() {
    // @todo: add not blocking confirm
    if (confirm('Are you sure to remove widget?')) {
      this.dashboardStateService.removeWidget(this.widgetId).subscribe();
    }
  }

  async edit() {
    const widget = this.widget;
    if (!isStatefullWidget(widget)) {
      return;
    }

    this.isReloading = true;

    const moduleRef = await this.moduleLoaderService.loadModuleAsync(this.moduleSourceImport!);
    const EditWidgetFormComponent = moduleRef.injector.get(EDIT_WIDGET_COMPONENT); // @todo: fix type

    const currentState = await lastValueFrom(widget.getState().pipe(take(1))); // @todo: make is as observable

    const widgetInjector = Injector.create({
      providers: [
        {
          provide: WidgetState,
          useValue: currentState,
        },
      ],
    });

    const ref = this.modalService.showModal(EditWidgetFormComponent, { injector: widgetInjector });

    ref.instance
      .getNewData()
      .pipe(
        switchMap((newState) =>
          concat([this.dashboardStateService.updateWidgetState(this.widgetId, newState), widget.setState(newState)]),
        ),
        finalize(() => {
          this.isReloading = false;
          this.changeDetector.detectChanges();
        }),
      )
      .subscribe();
  }
}
