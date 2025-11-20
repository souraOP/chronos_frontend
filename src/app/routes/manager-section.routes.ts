import { Routes } from '@angular/router';

export const ManagerRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import(
        '../landing-page/manager-section/manager-dashboard/manager-dashboard.component'
      ).then((mod) => mod.ManagerDashboardComponent),
  },
  {
    path: 'attendance',
    loadComponent: () =>
      import(
        '../landing-page/manager-section/manager-attendance/manager-attendance.component'
      ).then((mod) => mod.ManagerAttendanceComponent),
  },
  {
    path: 'leave-requests',
    loadComponent: () =>
      import(
        '../landing-page/manager-section/manager-leave-requests/manager-leave-requests.component'
      ).then((mod) => mod.ManagerLeaveRequestsComponent),
  },
  {
    path: 'shift-management',
    loadComponent: () =>
      import(
        '../landing-page/manager-section/manager-shift-management/manager-shift-management.component'
      ).then((mod) => mod.ManagerShiftManagementComponent),
  },
  {
    path: 'report-analytics',
    loadComponent: () =>
      import(
        '../landing-page/manager-section/manager-report-analytics/manager-report-analytics.component'
      ).then((module) => module.ManagerReportAnalyticsComponent),
  },
  {
    path: 'manager-profile',
    loadComponent: () =>
      import(
        '../landing-page/manager-section/manager-user-profile/manager-user-profile.component'
      ).then((mod) => mod.ManagerUserProfileComponent),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
