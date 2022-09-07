import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerWithSidebarComponent } from './layouts/container-with-sidebar';
import { FluidContainerComponent } from './layouts/fluid-container';

const routes: Routes = [
  {
    path: '',
    component: ContainerWithSidebarComponent,
    children: [
      {
        path: 'to-do',
        loadChildren: () => import('./modules/to-do/to-do.module').then((m) => m.ToDoModule),
      },
      {
        path: 'calculator',
        loadChildren: () => import('./modules/calculator/calculator.module').then((m) => m.CalculatorModule),
      },
    ],
  },
  {
    path: 'auth',
    component: FluidContainerComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./modules/auth/login/login.module').then((m) => m.LoginModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
