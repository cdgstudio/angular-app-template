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
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./modules/dashboard').then((m) => m.DashboardModule),
      },
      {
        path: 'to-do',
        loadChildren: () => import('./modules/to-do').then((m) => m.ToDoModule),
      },
      {
        path: 'calculator',
        loadChildren: () => import('./modules/calculator').then((m) => m.CalculatorModule),
      },
    ],
  },
  {
    path: 'auth',
    component: FluidContainerComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./modules/auth/login').then((m) => m.LoginModule),
      },
      {
        path: 'lost-password',
        loadChildren: () => import('./modules/auth/lost-password').then((m) => m.LostPasswordModule),
      },
      {
        path: 'sign-up',
        loadChildren: () => import('./modules/auth/sign-up').then((m) => m.SignUpModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
