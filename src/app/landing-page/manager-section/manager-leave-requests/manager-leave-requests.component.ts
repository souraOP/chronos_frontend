import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ManagerLeaveRequestData } from '../../models/leave-request-response/manager-leave-request-data-response.model';
import { ManagerLeaveRequestService } from '../../../shared/services/manager-services/manager-leave-request.service';
import { TeamsLeaveRequest } from '../../models/leave-request-response/team-leave-requests.model';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TeamEmployeesCreateLeaveBalanceForm } from '../../models/leave-request-response/create-leave-balance-team-employees.model';
import { LeaveBalanceService } from '../../../shared/services/leave-balance.service';
import { CreateLeaveBalanceResponse } from '../../models/leave-request-response/create-leave-balance-response.model';
import { LeaveStatus } from '../../../constants/leave-status';

@Component({
  selector: 'app-manager-leave-requests',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manager-leave-requests.component.html',
  styleUrl: './manager-leave-requests.component.css',
})
export class ManagerLeaveRequestsComponent implements OnInit {
  selectedRequest: TeamsLeaveRequest | null = null;
  public teamLeaveRequestStats?: ManagerLeaveRequestData;
  public teamsLeaveRequest: TeamsLeaveRequest[] = [];

  public createdLeaveBalance!: CreateLeaveBalanceResponse;
  private managerLeaveRequestService = inject(ManagerLeaveRequestService);
  private leaveBalanceService = inject(LeaveBalanceService);

  isLoading = false;
  isModalOpen = false;
  confirmationModalOpen = false;
  modalAction!: 'APPROVED' | 'REJECTED';
  teamEmployeesInForm: TeamEmployeesCreateLeaveBalanceForm[] = [];
  createLeaveBalanceForm!: FormGroup;

  ngOnInit(): void {
    const loggedUser = localStorage.getItem('auth');
    if (!loggedUser) {
      console.error('Manager not logged in.');
      return;
    }

    this.createLeaveBalanceForm = new FormGroup({
      employee_uuid: new FormControl('', [Validators.required]),
      leave_type: new FormControl('', [Validators.required]),
      no_of_days: new FormControl('', [Validators.required]),
    });

    this.fetchTeamLeaveStats();
    this.fetchTeamLeaveRequest();
    this.getTeamEmployeesInForm();

    this.createLeaveBalanceForm.valueChanges.subscribe({
      next: () => {
        console.log('Value ', this.createLeaveBalanceForm.value);
      },
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.createLeaveBalanceForm.reset();
  }

  getTeamEmployeesInForm() {
    this.managerLeaveRequestService.getTeamEmployees().subscribe({
      next: (res) => {
        this.teamEmployeesInForm = res;
      },
      error: (err) => {
        console.error('Unable to fetch team employees', err);
      },
    });
  }

  createLeaveBalanceForEmployee() {
    if (this.createLeaveBalanceForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const employeeId = this.createLeaveBalanceForm.value.employee_uuid;
    const leaveType = this.createLeaveBalanceForm.value.leave_type;
    const noOfDays = this.createLeaveBalanceForm.value.no_of_days;

    this.leaveBalanceService
      .createLeaveBalance(employeeId, leaveType, noOfDays)
      .subscribe({
        next: (res) => {
          alert('Created leave balance successfully!');
          this.createdLeaveBalance = res;
        },
        error: (err) => {
          console.error('Error occurred while creating leave balance: ', err);
          alert('Error occurred!');
        },
      });
  }

  openLeaveRequestConfirmationModal(
    leaveRequestId: string,
    action: 'APPROVED' | 'REJECTED'
  ) {
    this.confirmationModalOpen = true;
    this.modalAction = action;
    this.selectedRequest =
      this.teamsLeaveRequest.find((r) => r.requestId === leaveRequestId) ||
      null;
  }

  closeLeaveRequestConfirmationModal() {
    if (this.isLoading) {
      return;
    }
    this.confirmationModalOpen = false;
    this.selectedRequest = null;
  }

  confirmLeaveRequest() {
    if (!this.modalAction || !this.selectedRequest) {
      return;
    }
    this.isLoading = true;

    this.managerLeaveRequestService.actionOnLeaveRequest(this.selectedRequest.requestId, this.modalAction).subscribe({
        next: () => {
          alert(
            this.modalAction === LeaveStatus.APPROVED
              ? 'Approved the leave request'
              : 'Rejected the leave request'
          );
          this.fetchTeamLeaveRequest();

          this.isLoading = false;
          this.closeLeaveRequestConfirmationModal();
        },
        error: (err) => {
          alert(
            this.modalAction === LeaveStatus.APPROVED
              ? 'Error approving the leave request'
              : 'Error rejecting the leave request'
          );
          console.error('Error updating the leave request ', err);
          this.isLoading = false;
        },
      });
  }

  private fetchTeamLeaveRequest() {
    this.managerLeaveRequestService.getTeamLeaveRequests().subscribe({
      next: (res) => {
        this.teamsLeaveRequest = res;
      },
      error: (err) => {
        console.error('Error fetching the leave requests ', err);
      },
    });
  }

  private fetchTeamLeaveStats() {
    this.managerLeaveRequestService.getTeamLeaveRequestStats().subscribe({
      next: (res) => {
        this.teamLeaveRequestStats = res;
      },
      error: (err) => {
        console.error(
          'Error occured while fetching the leave request stats ',
          err
        );
      },
    });
  }
}
