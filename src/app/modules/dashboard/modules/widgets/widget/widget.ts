import { InjectionToken, Type } from '@angular/core';

export const WIDGET_COMPONENT = new InjectionToken<Type<unknown>>('Widget component to render');
export const WIDGET = new InjectionToken<unknown>('Widget');
export interface Widget {}
