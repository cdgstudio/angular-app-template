import { Observable } from 'rxjs';

export interface ReloadableWidget {
  reload(): Observable<void>;
}
