import { defer, Observable, of } from 'rxjs';
import { WidgetStateInterface } from '../models/widget';
import { DashboardStateService } from './dashboard-store.service';

const LOCAL_STORE_KEY = 'DASHBOARD_STATE';

export class LocalStorageService implements DashboardStateService {
  restoreState(): Observable<WidgetStateInterface[]> {
    return defer(() => {
      const state = this.getStateFromLocalStore();
      return of(state);
    });
  }

  setNewState(state: WidgetStateInterface[]): Observable<void> {
    return defer(() => {
      this.saveStateToLocalStore(state);
      return of(void 0);
    });
  }

  private saveStateToLocalStore(state: WidgetStateInterface[]): void {
    window.localStorage.setItem(LOCAL_STORE_KEY, window.JSON.stringify(state));
  }

  private getStateFromLocalStore(): WidgetStateInterface[] {
    try {
      const oldStateString = window.localStorage.getItem(LOCAL_STORE_KEY) ?? '';
      const state = JSON.parse(oldStateString);
      return this.isValidState(state) ? state : [];
    } catch {
      return [];
    }
  }

  private isValidState(state: any): state is WidgetStateInterface[] {
    return (
      Array.isArray(state) &&
      state.every((st) => !!st && !!(st as WidgetStateInterface).id && !!(st as WidgetStateInterface).type)
    );
  }
}
