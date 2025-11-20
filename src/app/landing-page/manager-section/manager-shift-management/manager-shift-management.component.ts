import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { TeamsShiftOverviewComponent } from './teams-shift-overview/teams-shift-overview.component';
import { TeamsShiftSwapRequestsComponent } from './teams-shift-swap-requests/teams-shift-swap-requests.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ManagerShiftService } from '../../../shared/services/manager-services/manager-shift.service';
import { ManagerTeamsShiftResponse } from '../../models/shifts-response/manager-teams-shift-response.model';
import { TeamEmployeesCreateShiftForm } from '../../models/team-response/team-employees-create-shift-form-response.model';
import { CreateShiftRequestPayload } from '../../models/shifts-response/create-shift-payload.model';
import { ShiftStatus } from '../../../constants/shift-status';
import { reasonValidator } from '../../../validators/reason-validator.validator';

@Component({
  selector: 'app-manager-shift-management',
  imports: [
    TeamsShiftOverviewComponent,
    TeamsShiftSwapRequestsComponent,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './manager-shift-management.component.html',
  styleUrl: './manager-shift-management.component.css',
})
export class ManagerShiftManagementComponent implements OnInit {
  private managerShiftService = inject(ManagerShiftService);

  isModalOpen = signal(false);
  // for getting the shift overview date selector using ngModel
  today: string = ''; //using in the create shift form
  public managerShiftDate: string = new Date().toISOString().split('T')[0]; // default today;
  public fullTeamSize: number = 0;
  public getShiftsByDate: ManagerTeamsShiftResponse[] = [];
  public teamEmployeesCreateShiftForm: TeamEmployeesCreateShiftForm[] = [];

  constructor() {
    this.today = this.getFormattedDate(new Date());
  }

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.shiftForm.reset();
  }

  private getFormattedDate(date: Date): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().slice(0, 10);
  }

  shiftForm!: FormGroup;

  ngOnInit(): void {
    this.shiftForm = new FormGroup({
      employee_uuid: new FormControl('', [Validators.required]),
      shift_date: new FormControl('', [Validators.required]),
      shift_type: new FormControl('', [Validators.required]),
      shift_start_time: new FormControl('', [Validators.required]),
      shift_end_time: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required, Validators.minLength(8), reasonValidator]),
    });

    this.loadTeamSize();
    this.getTeamEmployeeInForm();
  }

  loadTeamSize() {
    this.managerShiftService.getTeamSize().subscribe({
      next: (size) => {
        this.fullTeamSize = size;
      },
      error: (err) => {
        console.error('Error fetching the total team size ', err);
        this.fullTeamSize = 0;
      },
    });
  }

  getTeamEmployeeInForm() {
    this.managerShiftService.getTeamEmployees().subscribe({
      next: (res) => {
        this.teamEmployeesCreateShiftForm = res;
      },
    });
  }

  // for getting the reference of child component
  // basically to get the latest shifts according to date
  @ViewChild(TeamsShiftOverviewComponent)
  childShiftOverview!: TeamsShiftOverviewComponent;

  onChangeDateGetShifts() {
    if (this.childShiftOverview) {
      this.childShiftOverview.getShiftDate = this.managerShiftDate;
      this.childShiftOverview.onChangeDateGetShifts();
    }
  }

  createShiftForEmployee(event: Event) {
    event.preventDefault();
    if (this.shiftForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const createShiftPayload: CreateShiftRequestPayload = {
      employeeId: this.shiftForm.value.employee_uuid,
      shiftDate: this.shiftForm.value.shift_date,
      shiftStartTime: this.shiftForm.value.shift_start_time,
      shiftEndTime: this.shiftForm.value.shift_end_time,
      shiftStatus: ShiftStatus.CONFIRMED,
      shiftType: this.shiftForm.value.shift_type,
      shiftLocation: this.shiftForm.value.location,
    };

    this.managerShiftService.createShiftForEmployee(createShiftPayload).subscribe({
      next: () => {
        alert('Create shift successfully!');
      },
      error: (err) => {
        console.error('Error creating shift! ', err);
        return;
      },
    });
  }
}
