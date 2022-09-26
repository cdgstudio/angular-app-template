import { Directive, Injector, Input, ViewContainerRef } from '@angular/core';
import { ModuleLoaderService } from '../../../shared/module-loader';
import { EDIT_WIDGET_MODULE, StatefullWidget, WIDGET, WidgetId, WIDGET_COMPONENT } from '../modules/widgets/widget';
import { WidgetState } from '../service/dashboard-state.service';

const WIDGET_LOADERS = [
  {
    type: 'weather',
    loadWidgetModule: () => import('./../modules/widgets/weather-widget').then((m) => m.WeatherWidgetModule),
  },
  {
    type: 'github-stars',
    loadWidgetModule: () => import('./../modules/widgets/github-stars-widget').then((m) => m.GithubStarsWidgetModule),
  },
];

@Directive({
  selector: '[appWidgetLoader]',
})
export class WidgetLoaderDirective {
  private prevValue?: WidgetState;

  // @todo: make input more reactive
  @Input() set appWidgetLoader(widgetData: WidgetState) {
    if (this.prevValue?.id === widgetData.id) {
      return;
    }
    this.prevValue = widgetData;

    const loader = WIDGET_LOADERS.find((loader) => loader.type === widgetData.type);

    if (loader === void 0) {
      return;
    }

    this.moduleLoaderService.loadModuleAsync(loader.loadWidgetModule).then((moduleRef) => {
      const Component = moduleRef.injector.get(WIDGET_COMPONENT);

      const componentInjector = Injector.create({
        parent: moduleRef.injector,
        providers: [{ provide: WidgetId, useValue: widgetData.id }],
      });

      this.viewContainer.clear();
      const ref = this.viewContainer.createComponent(Component, {
        ngModuleRef: moduleRef,
        injector: componentInjector,
      });

      const edit = ref.injector.get(EDIT_WIDGET_MODULE, null);
      if (edit !== null) {
        const edit = ref.injector.get(WIDGET, null) as StatefullWidget;
        edit.setState(widgetData.data).subscribe();
      }

      ref.changeDetectorRef.markForCheck();
    });
  }

  constructor(private viewContainer: ViewContainerRef, private moduleLoaderService: ModuleLoaderService) {}
}
