import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { AttendanceHistoryForEmployee } from '../../../landing-page/models/attendance-response/attendance-history-response.model';

@Injectable({ providedIn: 'root' })
export class EmployeeAttendanceService {
  private http = inject(HttpClient);

  private attendanceEndpoint = `${environment.BASE_URL}/api/attendances`;

  getUuid(): string {
    const loggedInUser = localStorage.getItem('auth');
    if (!loggedInUser) {
      console.error('Unauthorized!');
      return '';
    }
    try {
      const user = JSON.parse(loggedInUser);
      return user.uuid || null;
    } catch {
      alert('Employee not logged in!');
      return '';
    }
  }

  public getHistoryForEmployee(): Observable<AttendanceHistoryForEmployee[]> {
    const empUuid = this.getUuid();
    const url = `${this.attendanceEndpoint}/${empUuid}/history`;
    return this.http.get<AttendanceHistoryForEmployee[]>(url);
  }

  public getLatestForEmployee(): Observable<AttendanceHistoryForEmployee> {
    const empUuid = this.getUuid();
    const url = `${this.attendanceEndpoint}/${empUuid}/latest`;
    return this.http.get<AttendanceHistoryForEmployee>(url);
  }

  public checkIn(location?: string): Observable<AttendanceHistoryForEmployee> {
    const empUuid = this.getUuid();
    const url = `${this.attendanceEndpoint}/${empUuid}/check-in`;
    const payload = location ? { location } : null;
    return this.http.post<AttendanceHistoryForEmployee>(url, payload);
  }

  public checkOut(): Observable<AttendanceHistoryForEmployee> {
    const empUuid = this.getUuid();
    const url = `${this.attendanceEndpoint}/${empUuid}/check-out`;
    return this.http.post<AttendanceHistoryForEmployee>(url, {});
  }
}
