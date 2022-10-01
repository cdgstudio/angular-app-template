import { InjectionToken, Type } from '@angular/core';

export interface Widget {}
export const WIDGET_COMPONENT = new InjectionToken<Type<Widget>>('Widget component to render');
export const WIDGET = new InjectionToken<Widget>('Widget'); // @todo: what is it?
