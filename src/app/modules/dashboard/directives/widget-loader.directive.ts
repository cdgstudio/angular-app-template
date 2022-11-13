import { Directive, Injector, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { isStatefullWidget, WidgetId, WidgetStateInterface, WIDGET_COMPONENT } from '@cdgstudio/dashboard';
import { defaultIfEmpty, distinctUntilKeyChanged, filter, map, of, ReplaySubject, switchMap, tap } from 'rxjs';
import { ModuleLoaderService } from '../../../shared/module-loader';

const WIDGET_LOADERS = [
  {
    type: 'weather',
    loadWidgetModule: () => import('./../modules/widgets/weather-widget').then((m) => m.WeatherWidgetModule),
  },
  {
    type: 'github-stars',
    loadWidgetModule: () => import('./../modules/widgets/github-stars-widget').then((m) => m.GithubStarsWidgetModule),
  },
  {
    type: 'yt-statistics',
    loadWidgetModule: () =>
      import('./../modules/widgets/yt-channel-statistics').then((m) => m.YtChannelStatisticsModule),
  },
];

@Directive({
  selector: '[appWidgetLoader]',
})
export class WidgetLoaderDirective implements OnInit, OnDestroy {
  @Input() set appWidgetLoader(widgetData: WidgetStateInterface) {
    this.widgetData$$.next(widgetData);
  }

  private widgetData$$ = new ReplaySubject<WidgetStateInterface>(1);

  constructor(
    private viewContainer: ViewContainerRef,
    private moduleLoaderService: ModuleLoaderService,
    private injector: Injector,
  ) {}

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
        map(([widgetData, ngModuleRef]) => {
          const injector = Injector.create({
            parent: this.injector,
            providers: [{ provide: WidgetId, useValue: widgetData.id }],
          });
          const WidgetComponent = ngModuleRef.injector.get(WIDGET_COMPONENT);

          this.viewContainer.clear();
          const widgetRef = this.viewContainer.createComponent(WidgetComponent, { ngModuleRef, injector });

          return [widgetData, widgetRef] as const;
        }),
        switchMap(([widgetData, componentRef]) => {
          const widget = componentRef.instance;
          if (!isStatefullWidget(widget)) {
            return of(componentRef);
          }
          return widget.setState(widgetData.data).pipe(
            map(() => componentRef),
            defaultIfEmpty(componentRef),
          );
        }),
        tap((componentRef) => componentRef.changeDetectorRef.markForCheck()),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.widgetData$$.complete();
  }
}
