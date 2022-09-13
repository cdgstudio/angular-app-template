import { GlobalPositionStrategy, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Host, Inject, Injector, Optional } from '@angular/core';
import { finalize, switchMap } from 'rxjs';
import { ModuleLoaderService } from '../../../../../../../shared/module-loader';
import { RELOADABLE, Reloadable } from '../../../reloadable-widget';
import { EDITABLE, Editable, EditableWidgetFormImport, EDIT_FORM } from '../../../widget-edit';

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

    @Optional() @Host() @Inject(RELOADABLE) public reloadableWidget: Reloadable | null,
    @Optional() @Host() @Inject(EDITABLE) private editableWidget: Editable | null,
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
    const EditComponent = moduleRef.injector.get(EDITABLE);

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
