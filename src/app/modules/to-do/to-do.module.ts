import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { RouterModule, Routes } from '@angular/router';
import { TodosResolver } from './resolvers/todos.resolver';

const routes: Routes = [
  {
    path: '',
    component: ToDoListComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      todos: TodosResolver,
    },
  },
];

@NgModule({
  declarations: [ToDoListComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class ToDoModule {}
