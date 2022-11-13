import { Observable } from 'rxjs';
import { StatelessWidget } from './stateless-widget';

export interface ReloadableWidget {
  reload(): Observable<void>;
}

export function isReloadableWidget(widget: StatelessWidget): widget is ReloadableWidget {
  return 'reload' in widget;
}
