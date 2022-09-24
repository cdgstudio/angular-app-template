import { Observable } from 'rxjs';
import { Widget } from './widget';

export interface ReloadableWidget {
  reload(): Observable<void>;
}

export function isReloadableWidget(widget: Widget): widget is ReloadableWidget {
  return 'reload' in widget;
}
