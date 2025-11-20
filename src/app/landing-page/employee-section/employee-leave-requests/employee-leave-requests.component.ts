import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LeaveRequestTableForEmployee } from '../../models/leave-request-response/employee-leave-request-response.model';
import { EmployeeLeaveRequestService } from '../../../shared/services/employee-services/employee-leave-request.service';
import { LeaveBalanceService } from '../../../shared/services/leave-balance.service';
import { NewLeaveBalance } from '../../models/new-leave-balance.model';
import { CreateNewLeaveRequest } from '../../models/leave-request-response/employee-create-leave-request.model';
import { reasonValidator } from '../../../validators/reason-validator.validator';

@Component({
  selector: 'app-employee-leave-requests',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './employee-leave-requests.component.html',
  styleUrl: './employee-leave-requests.component.css',
})
export class EmployeeLeaveRequestsComponent implements OnInit {
  private employeeLeaveRequestService = inject(EmployeeLeaveRequestService);
  private leaveBalanceService = inject(LeaveBalanceService);

  today: string;
  isModalOpen = false;

  leaveRequestsList: LeaveRequestTableForEmployee[] = [];
  leaveBalanceEmployee: NewLeaveBalance[] = [];
  leaveRequestForm: FormGroup;

  constructor() {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    this.today = `${year}-${month}-${day}`;

    this.leaveRequestForm = new FormGroup({
      leave_type: new FormControl('', Validators.required),
      start_date: new FormControl('', Validators.required),
      end_date: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      reason: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100),
        reasonValidator
      ]),
    });

    this.leaveRequestForm.get('start_date')?.valueChanges.subscribe((val) => {
      const endDateControl = this.leaveRequestForm.get('end_date');
      if (val) {
        endDateControl?.enable({ emitEvent: false });
      } else {
        endDateControl?.disable({ emitEvent: false });
        endDateControl?.reset('');
      }
    });
  }

  ngOnInit(): void {
    const loggedUser = localStorage.getItem('auth');
    if (!loggedUser) {
      console.error('Employee not logged in.');
      return;
    }

    this.getEmployeeLeaveBalance();
    this.getLeaveRequests();
  }

  getLeaveRequests() {
    this.employeeLeaveRequestService.getLeaveRequests().subscribe({
      next: (response) => {
        this.leaveRequestsList = response;
      },
      error: (err) => {
        console.error(
          'Error occurred while fetching employee leave request data ',
          err
        );
      },
    });
  }

  getEmployeeLeaveBalance() {
    this.leaveBalanceService.getLeaveBalanceFromBackend().subscribe({
      next: (leaveBalance) => {
        this.leaveBalanceEmployee = leaveBalance;
      },
      error: (err) => {
        console.error('Error fetching leave balance ', err);
        this.leaveBalanceEmployee = [];
      },
    });
  }

  createNewLeaveRequest(event: Event) {
    event.preventDefault();
    if (this.leaveRequestForm.invalid) {
      this.leaveRequestForm.markAllAsTouched();
      return;
    }

    const getLeaveType = this.leaveRequestForm.value.leave_type;
    const getStartDate = this.leaveRequestForm.value.start_date;
    const getEndDate = this.leaveRequestForm.value.end_date;
    const getReason = this.leaveRequestForm.value.reason;

    const newLeaveRequestPayload: CreateNewLeaveRequest = {
      leaveType: getLeaveType,
      startDate: getStartDate,
      endDate: getEndDate,
      reason: getReason,
    };

    this.employeeLeaveRequestService
      .createNewLeaveRequest(newLeaveRequestPayload)
      .subscribe({
        next: () => {
          alert('Successfully create new leave request!');
          this.closeModal();
        },
        error: (err) => {
          alert('Error creating new leave request!');
          console.error('Error creating new leave request ', err);
        },
      });
  }

  openModal() {
    this.isModalOpen = true;
    this.leaveRequestForm.reset();
  }

  closeModal() {
    this.isModalOpen = false;
    this.leaveRequestForm.reset();
  }
}
