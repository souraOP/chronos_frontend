import { Component, inject, OnInit } from '@angular/core';
import { ShiftService } from '../../../../shared/services/employee-services/employee-shift.service';
import { CommonModule, DatePipe } from '@angular/common';
import { ShiftTableByEmployee } from '../../../models/shifts-response/employee-shift-response.model';

@Component({
  selector: 'app-all-upcoming-shifts',
  imports: [CommonModule, DatePipe],
  templateUrl: './all-upcoming-shifts.component.html',
  styleUrl: './all-upcoming-shifts.component.css',
})
export class AllUpcomingShiftsComponent implements OnInit {
  public upcomingShiftService = inject(ShiftService);
  public getShifts: ShiftTableByEmployee[] = [];

  ngOnInit(): void {
    this.getEmployessUpcomingShifts();
  }

  getEmployessUpcomingShifts() {
    this.upcomingShiftService
      .getEmployeeUpcomingShiftsTable()
      .subscribe((shiftData) => {
        this.getShifts = shiftData;
      });
  }
}
