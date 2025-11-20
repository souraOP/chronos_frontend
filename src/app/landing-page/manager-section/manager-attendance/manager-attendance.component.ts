import { Component, inject, OnInit } from '@angular/core';
import { ManagerAttendanceService } from '../../../shared/services/manager-services/manager-attendance.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ManagerAttendanceRow } from '../../models/attendance-response/manager-attendance-row.model';

@Component({
  selector: 'app-manager-attendance',
  templateUrl: './manager-attendance.component.html',
  styleUrls: ['./manager-attendance.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ManagerAttendanceComponent implements OnInit {
  public teamsAttendanceRow?: ManagerAttendanceRow[] = [];

  selectedDate: string = new Date().toISOString().split('T')[0]; // default today
  today: string = new Date().toISOString().split('T')[0];
  private managerService = inject(ManagerAttendanceService);

  ngOnInit(): void {
    const storedManager = localStorage.getItem('auth');
    if (storedManager) {
      this.loadTeamsAttendance(this.selectedDate);
    } else {
      console.error('Manager UUID not found in localStorage');
    }
  }

  loadTeamsAttendance(date: string) {
    this.managerService.getTeamsAttendanceByDate(date).subscribe({
      next: (rows) => {
        this.teamsAttendanceRow = rows?.attendanceRows || [];
      },
      error: (err) => {
        console.error('Error occurred while fetching team attendance ', err);
        this.teamsAttendanceRow = [];
      },
    });
  }

  onDateChange(): void {
    this.loadTeamsAttendance(this.selectedDate);
  }
}
