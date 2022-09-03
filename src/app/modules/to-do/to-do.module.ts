import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateListPipe } from './pipes/create-list.pipe';

const routes: Routes = [
  {
    path: '',
    component: ToDoListComponent,
  },
];

@NgModule({
  declarations: [ToDoListComponent, CreateListPipe],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class ToDoModule {}
