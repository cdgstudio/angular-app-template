import { Type, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { StatelessWidget } from './stateless-widget';

export interface EditableWidgetForm<T = unknown> {
  getNewData(): Observable<T>;
}

export interface StatefullWidget<T = unknown> {
  /**
   * Empty `value` means no state
   */
  setState(value?: T | undefined): Observable<void>;
  getState(): Observable<T>;
}

export type EditableWidgetFormImport = () => Promise<Type<unknown>>;

export const EDIT_WIDGET_MODULE = new InjectionToken<Type<EditableWidgetForm>>('Module path');
export const EDIT_WIDGET_COMPONENT = new InjectionToken<Type<any>>('Component to display edit form');

export function isStatefullWidget(obj: StatelessWidget): obj is StatefullWidget {
  return !!(obj as StatefullWidget).getState && !!(obj as StatefullWidget).setState;
}

export const WidgetState = new InjectionToken<unknown>('Current data of widget');
