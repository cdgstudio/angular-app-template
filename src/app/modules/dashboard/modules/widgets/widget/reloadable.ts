import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const RELOADABLE_WIDGET = new InjectionToken<any>('Widget with reload functionality');

export interface ReloadableWidget {
  reload(): Observable<void>;
}
