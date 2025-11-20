import { Component, inject } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { LeaveBalanceService } from '../../../shared/services/leave-balance.service';
import { NewLeaveBalance } from '../../models/new-leave-balance.model';
import { SlicePipe, TitleCasePipe } from '@angular/common';
import { EmployeeUserProfileService } from '../../../shared/services/employee-services/employee-user-profile.service';

@Component({
  selector: 'app-employee-user-profile',
  imports: [TitleCasePipe, SlicePipe],
  templateUrl: './employee-user-profile.component.html',
  styleUrl: './employee-user-profile.component.css',
})
export class EmployeeUserProfileComponent {
  private leaveBalanceService = inject(LeaveBalanceService);
  private employeeUserDetailsService = inject(EmployeeUserProfileService);

  public employee?: Employee;
  public leaveBalance: NewLeaveBalance[] = [];

  ngOnInit(): void {
    const stored = localStorage.getItem('auth');
    if (stored) {
      this.getEmployeeProfileDetails();
      this.getEmployeeLeaveBalance();
    }
  }

  getEmployeeProfileDetails() {
    this.employeeUserDetailsService.getEmployeeDetails().subscribe({
      next: (res) => {
        this.employee = res;
      },
      error: (err) => {
        console.error('Error fetching Employee details', err);
      },
    });
  }

  getEmployeeLeaveBalance() {
    this.leaveBalanceService.getLeaveBalanceFromBackend().subscribe({
      next: (res) => {
        this.leaveBalance = res;
      },
      error: (err) => {
        console.error('Error fetching employee leave balance ', err);
        this.leaveBalance = [];
      },
      complete: () => {
        console.log('Fetched leave balance');
      },
    });
  }

  getSickLeaveBalance(): number {
    return this.leaveBalanceService.getNewSickLeaveBalance(this.leaveBalance);
  }

  getVacationLeaveBalance(): number {
    return this.leaveBalanceService.getNewVacationLeaveBalance(
      this.leaveBalance
    );
  }

  getPersonalLeaveBalance(): number {
    return this.leaveBalanceService.getNewPersonalLeaveBalance(
      this.leaveBalance
    );
  }

  onClickChangePassword() {
    this.employeeUserDetailsService.onClickChangePassword();
  }
}
