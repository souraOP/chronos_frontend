import { Routes } from '@angular/router';

export const EmployeeRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import(
        '../landing-page/employee-section/dashboard/dashboard.component'
      ).then((mod) => mod.DashboardComponent),
  },
  {
    path: 'attendance',
    loadComponent: () =>
      import(
        '../landing-page/employee-section/employee-attendance/employee-attendance.component'
      ).then((mod) => mod.EmployeeAttendanceComponent),
  },
  {
    path: 'leave-requests',
    loadComponent: () =>
      import(
        '../landing-page/employee-section/employee-leave-requests/employee-leave-requests.component'
      ).then((mod) => mod.EmployeeLeaveRequestsComponent),
  },
  {
    path: 'shifts',
    loadComponent: () =>
      import(
        '../landing-page/employee-section/employee-shift-management/employee-shift-management.component'
      ).then((mod) => mod.EmployeeShiftManagementComponent),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import(
        '../landing-page/employee-section/employee-user-profile/employee-user-profile.component'
      ).then((mod) => mod.EmployeeUserProfileComponent),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
