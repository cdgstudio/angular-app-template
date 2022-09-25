import { Directive, Injector, Input, ViewContainerRef } from '@angular/core';
import { ModuleLoaderService } from '../../../shared/module-loader';
import { EDIT_WIDGET_MODULE, StatefullWidget, WIDGET, WIDGET_COMPONENT } from '../modules/widgets/widget';
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
  @Input() set appWidgetLoader(widgetData: WidgetState) {
    const loader = WIDGET_LOADERS.find((loader) => loader.type === widgetData.type);

    if (loader === void 0) {
      return;
    }

    this.moduleLoaderService.loadModuleAsync(loader.loadWidgetModule).then((moduleRef) => {
      const Component = moduleRef.injector.get(WIDGET_COMPONENT);

      const componentInjector = Injector.create({
        parent: moduleRef.injector,
        providers: [
          {
            provide: 'ID', // @todo: provide ID as injector token or class reference
            useValue: widgetData.id,
          },
        ],
      });

      const ref = this.viewContainerRef.createComponent(Component, {
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

  constructor(private viewContainerRef: ViewContainerRef, private moduleLoaderService: ModuleLoaderService) {}
}
