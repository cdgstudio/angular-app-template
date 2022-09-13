import { GlobalPositionStrategy, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Host, Inject, Injector, Optional } from '@angular/core';
import { finalize, switchMap } from 'rxjs';
import { ModuleLoaderService } from '../../../../../../../shared/module-loader';
import { ReloadableWidget, RELOADABLE_WIDGET } from '../../../reloadable-widget';
import { EDITABLE_WIDGET, EditableWidget, EditableWidgetFormImport, EDIT_FORM } from '../../../widget-edit';

@Component({
  selector: 'app-widget-toolbar',
  templateUrl: './widget-toolbar.component.html',
  styleUrls: ['./widget-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetToolbarComponent {
  constructor(
    private changeDetector: ChangeDetectorRef,
    private overlay: Overlay,
    private moduleLoaderService: ModuleLoaderService,

    @Optional() @Host() @Inject(RELOADABLE_WIDGET) public reloadableWidget: ReloadableWidget | null,
    @Optional() @Host() @Inject(EDITABLE_WIDGET) private editableWidget: EditableWidget | null,
    @Optional()
    @Host()
    @Inject(EDIT_FORM)
    public moduleSourceImport: EditableWidgetFormImport | null,
  ) {}

  protected isReloading = false;

  reload() {
    if (this.reloadableWidget !== null && this.isReloading === true) {
      return;
    }

    this.isReloading = true;
    this.reloadableWidget!.reload()
      .pipe(
        finalize(() => {
          this.isReloading = false;
          this.changeDetector.detectChanges();
        }),
      )
      .subscribe();
  }

  async edit() {
    this.isReloading = true;

    const moduleRef = await this.moduleLoaderService.loadModuleAsync(this.moduleSourceImport!);
    const EditComponent = moduleRef.injector.get(EDITABLE_WIDGET);

    const overlayRef = this.overlay.create({
      positionStrategy: new GlobalPositionStrategy().centerHorizontally().centerVertically(),
      hasBackdrop: true,
    });

    const widgetInjector = Injector.create({
      providers: [
        {
          provide: OverlayRef,
          useValue: overlayRef,
        },
      ],
    });
    const portal = new ComponentPortal(EditComponent, null, widgetInjector);
    const ref = overlayRef.attach(portal);

    ref.instance
      .getNewData()
      .pipe(
        switchMap((newData) => this.editableWidget!.setNewData(newData)),
        finalize(() => {
          this.isReloading = false;
          this.changeDetector.detectChanges();
        }),
      )
      .subscribe();
  }
}
