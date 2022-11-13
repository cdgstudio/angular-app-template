import { Observable, of } from 'rxjs';
import { WidgetStateInterface } from '../models/widget';
import { DashboardStateService } from './dashboard-store.service';

export class InMemoryStateService implements DashboardStateService {
  restoreState(): Observable<WidgetStateInterface[]> {
    return of([]);
  }

  setNewState(state: WidgetStateInterface[]): Observable<void> {
    return of(void 0);
  }
}
