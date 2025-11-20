import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./landing-page/landing-page.component').then(
        (mod) => mod.LandingPageComponent
      ),
  },
  {
    path: 'login',
    title: 'Chronos - Employee Login',
    // adding lazy loading in my project
    loadComponent: () =>
      import(
        './landing-page/employee-login-page/employee-login-page.component'
      ).then((module) => module.EmployeeLoginPageComponent),
  },
  {
    path: 'change-password',
    title: 'Chronos - Change Password',
    loadComponent: () =>
      import(
        './landing-page/employee-section/employee-user-profile/change-password/change-password.component'
      ).then((mod) => mod.ChangePasswordComponent),
  },
  {
    path: 'manager-login',
    loadComponent: () =>
      import(
        './landing-page/employee-login-page/manager-login-page/manager-login-page.component'
      ).then((mod) => mod.ManagerLoginPageComponent),
    title: 'Chronos - Manager Login',
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import(
        './landing-page/employee-login-page/forgot-password-page/forgot-password-page.component'
      ).then((mod) => mod.ForgotPasswordPageComponent),
    title: 'Chronos - Forgot Password',
  },

  {
    path: 'employee-section/:uuid',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./landing-page/employee-section/employee-section.component').then(
        (mod) => mod.EmployeeSectionComponent
      ),
    loadChildren: () =>
      import('./routes/employee-section.routes').then(
        (mod) => mod.EmployeeRoutes
      ),
  },
  {
    path: 'manager-section/:uuid',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./landing-page/manager-section/manager-section.component').then(
        (mod) => mod.ManagerSectionComponent
      ),
    loadChildren: () =>
      import('./routes/manager-section.routes').then(
        (mod) => mod.ManagerRoutes
      ),
  },

  //wildcard route
  {
    path: '**',
    redirectTo: '',
  },
];
