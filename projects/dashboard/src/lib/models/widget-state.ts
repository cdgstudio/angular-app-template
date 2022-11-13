import { InjectionToken } from '@angular/core';

export const WidgetId = new InjectionToken<string>('Widget Id');

// @todo: better name
export interface WidgetStateInterface<T = unknown> {
  readonly id: string;
  readonly type: string;
  readonly data: T;
}
