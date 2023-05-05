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
        loadChildren: () => import('./modules/dashboard'),
      },
      {
        path: 'to-do',
        loadChildren: () => import('./modules/to-do'),
      },
      {
        path: 'calculator',
        loadChildren: () => import('./modules/calculator'),
      },
    ],
  },
  {
    path: 'auth',
    component: FluidContainerComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./modules/auth/login'),
      },
      {
        path: 'lost-password',
        loadChildren: () => import('./modules/auth/lost-password'),
      },
      {
        path: 'sign-up',
        loadChildren: () => import('./modules/auth/sign-up'),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
