import { InjectionToken, Type } from '@angular/core';
import { Observable } from 'rxjs';

export interface EditableWidgetForm<T = unknown> {
  getNewData(): Observable<T>;
}

export const EDITABLE = new InjectionToken<EditableWidgetForm>('Editable widget');

export const WIDGET_EDIT_COMPONENT = new InjectionToken<Type<EditableWidgetForm>>('Component with edit options');
