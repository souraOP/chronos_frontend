import { Component, inject } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { ManagerUserProfileService } from '../../../shared/services/manager-services/manager-user-profile.service';
import { CommonModule } from '@angular/common';
import { LeaveBalanceService } from '../../../shared/services/leave-balance.service';
import { NewLeaveBalance } from '../../models/new-leave-balance.model';

@Component({
  selector: 'app-manager-user-profile',
  imports: [CommonModule],
  templateUrl: './manager-user-profile.component.html',
  styleUrl: './manager-user-profile.component.css',
})
export class ManagerUserProfileComponent {
  public manager?: Employee;
  public leaveBalance: NewLeaveBalance[] = [];

  private mngUserProfileService = inject(ManagerUserProfileService);
  private leaveBalanceService = inject(LeaveBalanceService);

  ngOnInit(): void {
    const loggedInUser = localStorage.getItem('auth');
    if (loggedInUser) {
      this.getManagerProfileDetails();
      this.getManagersLeaveBalance();
    }
  }

  getManagerProfileDetails() {
    this.mngUserProfileService.getManagerDetails().subscribe({
      next: (managerDetails) => {
        this.manager = managerDetails;
      },
      error: (err) => {
        console.error('Error fetching Manager Profile details', err);
      },
    });
  }

  getManagersLeaveBalance() {
    this.leaveBalanceService.getLeaveBalanceFromBackend().subscribe({
      next: (res) => {
        this.leaveBalance = res;
      },
      error: (err) => {
        console.error('Error fetching Managers leave balance', err);
        this.leaveBalance = [];
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

  onChangePassword() {
    this.mngUserProfileService.onClickChangePassword();
  }
}
