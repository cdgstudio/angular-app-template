import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Host, Inject, Injector, Optional } from '@angular/core';
import { combineLatest, finalize, lastValueFrom, switchMap, take } from 'rxjs';
import { ModalService } from '../../../../../../../shared/modal';
import { ModuleLoaderService } from '../../../../../../../shared/module-loader';
import { DashboardStateService } from '../../../../../service/dashboard-state.service';
import { EditableWidgetFormImport, EDIT_WIDGET_COMPONENT, EDIT_WIDGET_MODULE, isStatefullWidget } from '../../editable';
import { isReloadableWidget } from '../../reloadable';
import { WidgetId, WidgetState } from '../../tokens';
import { Widget, WIDGET } from '../../widget';

@Component({
  selector: 'app-widget-toolbar',
  templateUrl: './widget-toolbar.component.html',
  styleUrls: ['./widget-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetToolbarComponent {
  reloadableWidget = isReloadableWidget(this.widget);

  constructor(
    private changeDetector: ChangeDetectorRef,
    private moduleLoaderService: ModuleLoaderService,
    private id: WidgetId,
    private modalService: ModalService,

    @Host() @Inject(WIDGET) private widget: Widget,
    @Optional()
    @Host()
    @Inject(EDIT_WIDGET_MODULE)
    public moduleSourceImport: EditableWidgetFormImport | null,
    private dashboardStateService: DashboardStateService, // @todo: fix import place
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
      this.dashboardStateService.removeWidget(this.id).subscribe();
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
          combineLatest([this.dashboardStateService.updateWidgetState(this.id, newState), widget.setState(newState)]),
        ),
        finalize(() => {
          this.isReloading = false;
          this.changeDetector.detectChanges();
        }),
      )
      .subscribe();
  }
}
