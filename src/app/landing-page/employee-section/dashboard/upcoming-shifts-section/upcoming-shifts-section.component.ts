import { Component, inject, OnInit } from '@angular/core';
import { ShiftService } from '../../../../shared/services/employee-services/employee-shift.service';
import { DatePipe, SlicePipe, TitleCasePipe } from '@angular/common';
import { ShiftDashboardResponse } from '../../../models/shifts-response/dashboard-shift-response.model';

@Component({
  selector: 'app-upcoming-shifts-section',
  imports: [SlicePipe, DatePipe, TitleCasePipe],
  templateUrl: './upcoming-shifts-section.component.html',
  styleUrl: './upcoming-shifts-section.component.css',
})
export class UpcomingShiftsSectionComponent implements OnInit {
  public shiftService = inject(ShiftService);
  public shifts: ShiftDashboardResponse[] = [];

  ngOnInit(): void {
    this.getUpcomingShiftsDashboardData();
  }

  getUpcomingShiftsDashboardData() {
    this.shiftService
      .getEmployeeUpcomingShiftsDashboard()
      .subscribe((shiftData) => {
        this.shifts = shiftData;
      });
  }
}
