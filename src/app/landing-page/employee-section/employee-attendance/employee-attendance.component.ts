import { Component, inject, OnInit } from '@angular/core';
import { EmployeeAttendanceService } from '../../../shared/services/employee-services/employee-attendance.service';
import { CommonModule } from '@angular/common';
import { AttendanceHistoryForEmployee } from '../../models/attendance-response/attendance-history-response.model';

@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrls: ['./employee-attendance.component.css'],
  imports: [CommonModule],
})
export class EmployeeAttendanceComponent implements OnInit {
  public employeeID: string = '';
  todayDate = new Date().toISOString().split('T')[0];

  checkInTime: string | null = null;
  checkOutTime: string | null = null;
  hoursWorked: number = 0;
  isClockedIn = false;
  history: AttendanceHistoryForEmployee[] = [];
  actionLoading = false;
  currentStatus: 'COMPLETE' | 'ACTIVE' | null = null;

  private employeeAttendanceService = inject(EmployeeAttendanceService);

  ngOnInit(): void {
    const currentUser = localStorage.getItem('auth');
    if (!currentUser) {
      alert('Employee Not logged in');
      return;
    }
    const user = JSON.parse(currentUser);

    this.employeeID = user.employeeID || '';

    this.refreshHistory();
  }

  handleClockAction() {
    if (this.actionLoading) return;
    this.actionLoading = true;

    if (!this.isClockedIn) {
      this.employeeAttendanceService.checkIn('Coimbatore Office').subscribe({
        next: () => {
          this.refreshHistory();
        },
        error: (err) => {
          console.error('Error occurred during clock-in ', err);
          alert('Error during clock-in');
          this.actionLoading = false;
        },
        complete: () => (this.actionLoading = false),
      });
    } else {
      this.employeeAttendanceService.checkOut().subscribe({
        next: () => {
          this.refreshHistory();
        },
        error: (err) => {
          console.error('Error occurred during clock-out ', err);
          alert('Error during clock-out');
          this.actionLoading = false;
        },
        complete: () => (this.actionLoading = false),
      });
    }
  }

  private refreshHistory() {
    this.employeeAttendanceService.getHistoryForEmployee().subscribe({
      next: (res: AttendanceHistoryForEmployee[]) => {
        const sorted = [...(res ?? [])].sort((a, b) => {
          const afterTime = a.checkIn
            ? new Date(a.checkIn).getTime()
            : new Date(a.date).getTime();
          const beforeTime = b.checkIn
            ? new Date(b.checkIn).getTime()
            : new Date(b.date).getTime();
          return beforeTime - afterTime;
        });
        this.history = sorted;

        const active =
          sorted.find((r) => r.attendanceStatus === 'ACTIVE') ?? null;
        const current = active ?? (sorted.length ? sorted[0] : null);

        if (current) {
          this.isClockedIn = current.attendanceStatus === 'ACTIVE';
          this.currentStatus = current.attendanceStatus;
          this.checkInTime = this.formatTime(current.checkIn);
          this.checkOutTime = this.formatTime(current.checkOut);
          this.hoursWorked = current.hoursWorked ?? 0;
        } else {
          this.isClockedIn = false;
          this.currentStatus = null;
          this.checkInTime = null;
          this.checkOutTime = null;
          this.hoursWorked = 0;
        }
      },
      error: (err: any) => console.error('Error loading history', err),
    });
  }

  private formatTime(iso?: string | null) {
    if (!iso) return null;
    const date = new Date(iso);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }
}
