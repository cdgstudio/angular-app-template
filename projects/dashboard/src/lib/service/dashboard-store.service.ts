import { Observable } from 'rxjs';
import { WidgetStateInterface } from '../models/widget-state';

export abstract class DashboardStateService {
  abstract restoreState(): Observable<WidgetStateInterface[]>;
  abstract setNewState(state: WidgetStateInterface[]): Observable<void>;
}
