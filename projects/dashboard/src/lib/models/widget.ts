import { InjectionToken, Type } from '@angular/core';
import { StatefullWidget } from './statefull-widget';
import { StatelessWidget } from './stateless-widget';

export type Widget = StatelessWidget | StatefullWidget;

export const WIDGET_ID = new InjectionToken<string>('Widget Id');
export const WIDGET = new InjectionToken<Widget>('Widget');
export const WIDGET_COMPONENT = new InjectionToken<Type<Widget>>('Widget component to render');

// @todo: better name
export interface WidgetStateInterface<T = unknown> {
  readonly id: string;
  readonly type: string;
  readonly data: T;
}
