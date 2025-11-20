import { Component, inject, OnInit } from '@angular/core';
import { EmployeeDashboardService } from '../../../../shared/services/employee-services/employee-dashboard.service';
import { EmployeeLeaveRequestDashboard } from '../../../models/leave-request-response/employee-leave-request-dashboard-response.model';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-recent-leave-requests-section',
  imports: [DatePipe, TitleCasePipe, CommonModule],
  templateUrl: './recent-leave-requests-section.component.html',
  styleUrl: './recent-leave-requests-section.component.css',
})
export class RecentLeaveRequestsSectionComponent implements OnInit {
  private employeeDashboardService = inject(EmployeeDashboardService);

  public leaveRequests: EmployeeLeaveRequestDashboard[] = [];

  ngOnInit(): void {
    this.getLeaveRequests();
  }

  getLeaveRequests() {
    this.employeeDashboardService.getLeaveRequests().subscribe({
      next: (res) => {
        this.leaveRequests = res;
      },
      error: (err) => {
        console.error('Error occurred while fetching the leave requests', err);
        this.leaveRequests = [];
      },
    });
  }
}
