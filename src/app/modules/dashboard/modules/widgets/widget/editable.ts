import { Type, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Widget } from './widget';

export interface EditableWidgetForm<T = unknown> {
  getNewData(): Observable<T>;
}

export interface StatefullWidget<T = unknown> {
  setState(value: T): Observable<void>;
  getState(): Observable<T>;
}

export type EditableWidgetFormImport = () => Promise<Type<unknown>>;

export const EDIT_WIDGET_MODULE = new InjectionToken<Type<EditableWidgetForm>>('Module path');
export const EDIT_WIDGET_COMPONENT = new InjectionToken<Type<any>>('Component to display edit form');

export function isStatefullWidget(obj: Widget): obj is StatefullWidget {
  return !!(obj as StatefullWidget).getState && !!(obj as StatefullWidget).setState;
}
