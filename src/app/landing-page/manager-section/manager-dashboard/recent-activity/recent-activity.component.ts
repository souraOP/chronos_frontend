import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { ManagerDashboardService } from '../../../../shared/services/manager-services/manager-dashboard.service';
import { ManagerLeaveRequestDashboard } from '../../../models/leave-request-response/manager-leave-request-dashboard.model';

@Component({
  selector: 'app-recent-activity',
  imports: [CommonModule, SlicePipe],
  templateUrl: './recent-activity.component.html',
  styleUrl: './recent-activity.component.css',
})
export class RecentActivityComponent implements OnInit {
  private managerDashboardService = inject(ManagerDashboardService);
  public teamLeaveRequestsDashboard: ManagerLeaveRequestDashboard[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.loadTeamLeaveRequestDashboardData();
  }

  loadTeamLeaveRequestDashboardData() {
    this.managerDashboardService.getTeamLeaveRequests().subscribe({
      next: (leaveRequests) => {
        this.isLoading = false;
        this.teamLeaveRequestsDashboard = leaveRequests;
      },
      error: (err) => {
        console.error('Error fetching leave requests, ', err);
        this.isLoading = false;
      },
    });
  }
}
