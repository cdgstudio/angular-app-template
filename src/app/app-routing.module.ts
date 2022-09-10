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
        loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
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
      {
        path: 'lost-password',
        loadChildren: () =>
          import('./modules/auth/lost-password/lost-password.module').then((m) => m.LostPasswordModule),
      },
      {
        path: 'sign-up',
        loadChildren: () => import('./modules/auth/sign-up/sign-up.module').then((m) => m.SignUpModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
