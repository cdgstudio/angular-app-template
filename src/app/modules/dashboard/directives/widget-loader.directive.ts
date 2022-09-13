import { Directive, Input, ViewContainerRef } from '@angular/core';
import { ModuleLoaderService } from '../../../shared/module-loader';
import { WIDGET } from '../modules/widgets/widget';

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
  @Input() set appWidgetLoader(widgetData: any) {
    const loader = WIDGET_LOADERS.find((loader) => loader.type === widgetData.type);

    if (loader === void 0) {
      return;
    }

    this.moduleLoaderService.loadModuleAsync(loader.loadWidgetModule).then((moduleRef) => {
      const Component = moduleRef.injector.get(WIDGET);
      const ref = this.viewContainerRef.createComponent(Component, {
        ngModuleRef: moduleRef,
        injector: moduleRef.injector,
      });
      ref.changeDetectorRef.markForCheck();
    });
  }
  constructor(private viewContainerRef: ViewContainerRef, private moduleLoaderService: ModuleLoaderService) {}
}
