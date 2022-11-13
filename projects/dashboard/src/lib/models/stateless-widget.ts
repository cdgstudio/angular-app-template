import { InjectionToken, Type } from '@angular/core';

export interface StatelessWidget {}
export const WIDGET_COMPONENT = new InjectionToken<Type<StatelessWidget>>('Widget component to render');
export const WIDGET = new InjectionToken<StatelessWidget>('Widget'); // @todo: what is it?
