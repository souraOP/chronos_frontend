import { Component, inject, OnInit } from '@angular/core';
import { ManagerAttendanceService } from '../../../../shared/services/manager-services/manager-attendance.service';
import { ManagerAttendanceRow } from '../../../models/attendance-response/manager-attendance-row.model';
import { DatePipe, SlicePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-teams-attendance',
  imports: [DatePipe, SlicePipe, TitleCasePipe],
  templateUrl: './teams-attendance.component.html',
  styleUrl: './teams-attendance.component.css',
})
export class TeamsAttendanceComponent implements OnInit {
  public teamAttendanceRow: ManagerAttendanceRow[] = [];

  public currentDate: string = new Date().toISOString().split('T')[0];

  private managerAttendanceService = inject(ManagerAttendanceService);

  ngOnInit(): void {
    const storedUser = localStorage.getItem('auth');
    if (storedUser) {
      this.managerAttendanceService
        .getTeamsAttendanceByDate(this.currentDate)
        .subscribe({
          next: (res) => {
            this.teamAttendanceRow = res.attendanceRows || [];
          },
          error: (err) => {
            console.error('Attendance Error ', err);
            this.teamAttendanceRow = [];
          },
        });
    }
  }
}
