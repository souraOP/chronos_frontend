import { Component, inject, OnInit, signal } from '@angular/core';
import { AllUpcomingShiftsComponent } from './all-upcoming-shifts/all-upcoming-shifts.component';
import { ShiftSwapEmployeeService } from '../../../shared/services/employee-services/shift-swap-employee.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { RequestSwapEmployeeService } from '../../../shared/services/employee-services/request-swap-employee.service';
import { FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ShiftSwapRequestForEmployee } from '../../models/shift-swap/shift-swap-request-employee-response.model';
import { ShiftDashboardResponse } from '../../models/shifts-response/dashboard-shift-response.model';
import { TeamMembersWithShift } from '../../models/shifts-response/team-members-with-shift.model';
import { CreateShiftSwapRequestPayload } from '../../models/shift-swap/create-shift-swap-request-response.model';
import { ShiftStatus } from '../../../constants/shift-status';
import { reasonValidator } from '../../../validators/reason-validator.validator';

@Component({
  selector: 'app-employee-shift-management',
  imports: [
    AllUpcomingShiftsComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './employee-shift-management.component.html',
  styleUrl: './employee-shift-management.component.css',
})
export class EmployeeShiftManagementComponent implements OnInit {
  private shiftSwapService = inject(ShiftSwapEmployeeService);
  private requestShiftSwapService = inject(RequestSwapEmployeeService);

  private currentEmployee = localStorage.getItem('auth');
  public shiftSwapRequestEmployeeTable: ShiftSwapRequestForEmployee[] = [];
  public loggedInEmployeeShiftsInForm: ShiftDashboardResponse[] = [];
  public teamMembersUpcomingShifts: TeamMembersWithShift[] = [];

  isModalOpen = signal(false);

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.swapRequestForm?.reset();
  }

  swapRequestForm!: FormGroup;

  ngOnInit(): void {
    if (!this.currentEmployee) {
      return;
    }

    this.swapRequestForm = new FormGroup({
      offering_shift_id: new FormControl('', [Validators.required]),
      requested_employee_shift: new FormControl('', [Validators.required]),
      reason: new FormControl('', [
        Validators.minLength(10),
        Validators.maxLength(50),
        reasonValidator,
      ]),
    });

    this.loadLoggedInEmployeeShiftsInForm();
    this.getTeamMembersWithUpcomingShifts();
    this.loadShiftSwapRequests();
  }

  loadLoggedInEmployeeShiftsInForm() {
    this.requestShiftSwapService.getLoggedInEmployeeShiftsInForm().subscribe({
      next: (res) => {
        this.loggedInEmployeeShiftsInForm = res;
      },
      error: (err) => {
        console.error('Error fetching current employee shifts ', err);
        this.loggedInEmployeeShiftsInForm = [];
      },
    });
  }

  loadShiftSwapRequests() {
    this.shiftSwapService.loadShiftSwapRequests().subscribe({
      next: (res) => {
        this.shiftSwapRequestEmployeeTable = res;
      },
      error: (err) => {
        console.error('Error fetching the shift swap requests ', err);
        this.shiftSwapRequestEmployeeTable = [];
      },
    });
  }

  getTeamMembersWithUpcomingShifts() {
    this.requestShiftSwapService.getTeamMembersWithUpcomingShifts().subscribe({
      next: (res) => {
        this.teamMembersUpcomingShifts = res;
      },
      error: (err) => {
        console.error('Error fetching team members shifts ', err);
      },
    });
  }

  submitShiftSwapRequest(event: Event) {
    event.preventDefault();

    if (this.swapRequestForm.invalid) {
      return;
    }

    const requesterEmployeeId = this.requestShiftSwapService.getUuid();
    const offeringShiftId = this.swapRequestForm.value
      .offering_shift_id as string;

    const [requestedEmployeeId, requestingShiftId] = (
      this.swapRequestForm.value.requested_employee_shift as string
    ).split('|');

    const payload: CreateShiftSwapRequestPayload = {
      requestedEmployeeId,
      requesterEmployeeId,
      offeringShiftId,
      requestingShiftId,
      reason: this.swapRequestForm.value.reason,
    };

    this.requestShiftSwapService.createSwapRequest(payload).subscribe({
      next: () => {
        alert('submitted swap request successfully!');
        const offeringShiftId = payload.offeringShiftId;
        const ownIdx = this.loggedInEmployeeShiftsInForm.findIndex(
          (s) => s.id === offeringShiftId || s.shiftId === offeringShiftId
        );
        if (ownIdx > -1) {
          this.loggedInEmployeeShiftsInForm[ownIdx].shiftStatus =
            ShiftStatus.PENDING;
        }

        const requestingShiftId = payload.requestingShiftId;
        this.teamMembersUpcomingShifts = this.teamMembersUpcomingShifts.map(
          (member) => {
            if (!member.shifts) return member;
            member.shifts = member.shifts.map((sh: any) => {
              if (
                sh.id === requestingShiftId ||
                sh.shiftId === requestingShiftId
              ) {
                sh.shiftStatus = 'PENDING';
              }
              return sh;
            });
            return member;
          }
        );
      },
      error: () => {
        console.error('Error while submitting !');
      },
    });
  }
}
