import { InjectionToken } from '@angular/core';

export class WidgetId extends String {}

export const WidgetState = new InjectionToken<unknown>('Current data of widget');
