export { DashboardService } from './lib/service/dashboard.service';
export { WidgetStateInterface, WidgetId } from './lib/models/widget-state';
export { LocalStorageService } from './lib/service/local-storage.service';
export { InMemoryStateService } from './lib/service/in-memory-store.service';
export { DashboardStateService } from './lib/service/dashboard-store.service';
export {
  EDIT_WIDGET_COMPONENT,
  StatefullWidget,
  EDIT_WIDGET_MODULE,
  EditableWidgetFormImport,
  EditableWidgetForm,
  isStatefullWidget,
  WidgetState,
} from './lib/models/statefull-widget';
export { WIDGET_COMPONENT, WIDGET, StatelessWidget } from './lib/models/stateless-widget';
export { ReloadableWidget, isReloadableWidget } from './lib/models/reloadable-widget';
