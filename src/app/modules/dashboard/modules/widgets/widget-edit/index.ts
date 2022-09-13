import { InjectionToken, NgModuleRef, Type } from '@angular/core';
import { Observable } from 'rxjs';

export interface EditableWidgetForm<T = unknown> {
  getNewData(): Observable<T>;
}

export interface Editable<T = unknown> {
  setNewData(value: T): Observable<void>;
}

export type EditableWidgetFormImport = () => Promise<Type<unknown>>;

export const EDIT_FORM = new InjectionToken<EditableWidgetForm>('Editable widget');
export const EDITABLE = new InjectionToken<Type<EditableWidgetForm>>('Component with edit options');
