export interface ToDo {
  id: string;
  description: string;
  status: ToDoStatus;
}

export type ToDoStatus = 'DONE' | 'TODO' | 'REMOVED';
