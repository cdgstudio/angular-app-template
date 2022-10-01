import { Directive, Injector, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { distinctUntilKeyChanged, filter, map, of, ReplaySubject, switchMap, tap } from 'rxjs';
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
export class WidgetLoaderDirective implements OnInit, OnDestroy {
  @Input() set appWidgetLoader(widgetData: WidgetState) {
    this.widgetData$$.next(widgetData);
  }

  private widgetData$$ = new ReplaySubject<WidgetState>(1);

  constructor(private viewContainer: ViewContainerRef, private moduleLoaderService: ModuleLoaderService) {}

  ngOnInit(): void {
    this.widgetData$$
      .pipe(
        distinctUntilKeyChanged('id'),
        switchMap((widgetData) =>
          of(widgetData).pipe(
            map((widgetData) => WIDGET_LOADERS.find((loader) => loader.type === widgetData.type)),
            filter(Boolean),
            switchMap((loader) => this.moduleLoaderService.loadModuleAsync(loader.loadWidgetModule)),
            map((ngModuleRef) => [widgetData, ngModuleRef] as const),
          ),
        ),
        tap(([widgetData, ngModuleRef]) => {
          const injector = Injector.create({
            parent: ngModuleRef.injector,
            providers: [{ provide: WidgetId, useValue: widgetData.id }],
          });
          const Component = ngModuleRef.injector.get(WIDGET_COMPONENT);
          this.viewContainer.clear();
          const ref = this.viewContainer.createComponent(Component, { ngModuleRef, injector });

          const EditComponent = ngModuleRef.injector.get(EDIT_WIDGET_MODULE, null);
          if (EditComponent !== null) {
            const editComponent = ngModuleRef.injector.get(WIDGET) as StatefullWidget; // @Todo: fix type
            editComponent.setState(widgetData.data).subscribe();
          }

          ref.changeDetectorRef.markForCheck();
        }),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.widgetData$$.complete();
  }
}
