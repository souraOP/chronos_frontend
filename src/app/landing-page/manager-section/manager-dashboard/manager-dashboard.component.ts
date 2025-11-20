import { Component, inject } from '@angular/core';
import { TeamsAttendanceComponent } from './teams-attendance/teams-attendance.component';
import { RecentActivityComponent } from './recent-activity/recent-activity.component';
import { CommonModule } from '@angular/common';
import { ManagerDashboardService } from '../../../shared/services/manager-services/manager-dashboard.service';
import { ManagerLeaveRequestData } from '../../models/leave-request-response/manager-leave-request-data-response.model';
import { EmployeeName } from '../../models/employee-name.model';
import { ManagerAttendanceService } from '../../../shared/services/manager-services/manager-attendance.service';

@Component({
  selector: 'app-manager-dashboard',
  imports: [TeamsAttendanceComponent, RecentActivityComponent, CommonModule],
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.css',
})
export class ManagerDashboardComponent {
  private managerDashboardService = inject(ManagerDashboardService);
  private managerAttendanceService = inject(ManagerAttendanceService);

  public managerTeamLeaveStats?: ManagerLeaveRequestData;
  public managersTeamSize = 0;
  public managersName?: EmployeeName;
  public presentToday: number = 0;
  isLoading = true;

  ngOnInit(): void {
    const loggedUser = localStorage.getItem('auth');
    if (!loggedUser) {
      console.error('Manager not logged in.');
      this.isLoading = false;
      return;
    }

    this.getManagersName();
    this.getTeamSize();
    this.getPresentToday();
    this.getTeamLeaveStats();
  }

  getManagersName() {
    this.managerDashboardService.getManagersName().subscribe({
      next: (name) => {
        this.managersName = name;
      },
      error: (err) => {
        console.error('Failed to fetch Managers Name ', err);
      },
    });
  }

  getTeamSize() {
    this.managerDashboardService.getTeamSize().subscribe({
      next: (size) => {
        this.managersTeamSize = size || 0;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load the team size', err);
        this.isLoading = false;
      },
    });
  }

  getPresentToday() {
    const today = new Date().toISOString().split('T')[0];
    this.managerAttendanceService.getTeamsAttendanceByDate(today).subscribe({
      next: (res) => {
        this.presentToday = res?.attendanceRows?.length ?? 0;
      },
      error: (err) => {
        console.error("Failed to load today's attendance ", err);
      },
    });
  }

  getTeamLeaveStats() {
    this.managerDashboardService.getTeamLeaveStats().subscribe({
      next: (stats) => {
        this.managerTeamLeaveStats = stats;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load teams leave stats ', err);
        this.isLoading = false;
      },
    });
  }
}
