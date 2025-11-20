import { Component, OnInit, inject } from '@angular/core';
import { UpcomingShiftsSectionComponent } from './upcoming-shifts-section/upcoming-shifts-section.component';
import { RecentLeaveRequestsSectionComponent } from './recent-leave-requests-section/recent-leave-requests-section.component';
import { LeaveBalanceService } from '../../../shared/services/leave-balance.service';
import { NewLeaveBalance } from '../../models/new-leave-balance.model';
import { EmployeeName } from '../../models/employee-name.model';
import { EmployeeDashboardService } from '../../../shared/services/employee-services/employee-dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    UpcomingShiftsSectionComponent,
    RecentLeaveRequestsSectionComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private leaveBalanceService = inject(LeaveBalanceService);
  private employeeDashboardService = inject(EmployeeDashboardService);

  public employeeName?: EmployeeName;
  public newLeaveBalance: NewLeaveBalance[] = [];

  ngOnInit(): void {
    this.getEmployeeName();
    this.getEmployeeLeaveBalances();
  }

  getEmployeeName() {
    this.employeeDashboardService.getEmployeeName().subscribe({
      next: (res) => {
        this.employeeName = res;
      },
      error: (err) => {
        console.error('Error fetching employee name!', err);
      },
    });
  }

  getEmployeeLeaveBalances() {
    this.leaveBalanceService.getLeaveBalanceFromBackend().subscribe({
      next: (res) => {
        this.newLeaveBalance = res;
      },
      complete: () => {
        console.log('Fetched Leave Balance Successfully');
      },
    });
  }

  getSickLeaveBalance(): number {
    return this.leaveBalanceService.getNewSickLeaveBalance(
      this.newLeaveBalance
    );
  }

  getVacationLeaveBalance(): number {
    return this.leaveBalanceService.getNewVacationLeaveBalance(
      this.newLeaveBalance
    );
  }

  getPersonalLeaveBalance(): number {
    return this.leaveBalanceService.getNewPersonalLeaveBalance(
      this.newLeaveBalance
    );
  }
}
