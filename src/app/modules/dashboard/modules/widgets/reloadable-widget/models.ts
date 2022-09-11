import { Observable } from 'rxjs';

export interface Reloadable {
  reload(): Observable<void>;
}
