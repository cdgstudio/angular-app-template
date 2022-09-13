import { InjectionToken, Type } from '@angular/core';

export const WIDGET = new InjectionToken<Type<unknown>>('Widget component to render');
