import { GlobalPositionStrategy, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Compiler,
  Component,
  ContentChild,
  Injector,
  NgModuleRef,
  Type,
} from '@angular/core';
import { finalize, switchMap, tap } from 'rxjs';
import { Reloadable, RELOADABLE } from '../../../reloadable-widget';
import { EDITABLE, Editable, EditableWidgetForm, EDIT_FORM } from '../../../widget-edit';

const loadedModules = new Map<Type<EditableWidgetForm>, NgModuleRef<unknown>>();

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetComponent {
  @ContentChild(RELOADABLE, { static: true, descendants: false }) reloadableWidget: Reloadable | null = null;
  @ContentChild(EDITABLE, { static: true, descendants: false }) editableWidget: Editable | null = null;
  @ContentChild(EDIT_FORM, { static: true, descendants: false }) getEditComponentModule!: () => Promise<
    Type<EditableWidgetForm>
  >;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private compiler: Compiler,
    private injector: Injector,
    private overlay: Overlay,
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
          this.changeDetector.markForCheck();
        }),
      )
      .subscribe();
  }

  async edit() {
    this.isReloading = true;

    const moduleSource = await this.getEditComponentModule();

    if (loadedModules.has(moduleSource) === false) {
      const factory = await this.compiler.compileModuleAsync(moduleSource);
      const module = factory.create(this.injector);
      loadedModules.set(moduleSource, module);
    }

    const moduleRef = loadedModules.get(moduleSource)!;
    const EditComponent = moduleRef.injector.get(EDITABLE);

    const overlayRef = this.overlay.create({
      positionStrategy: new GlobalPositionStrategy().centerHorizontally().centerVertically(),
      hasBackdrop: true,
    });

    const widgetInjector = Injector.create({
      parent: this.injector,
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
          this.changeDetector.markForCheck();
        }),
      )
      .subscribe();
  }
}
