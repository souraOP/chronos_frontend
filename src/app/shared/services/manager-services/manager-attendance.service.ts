import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { ManagerAttendanceDisplayByDateResponseDTO } from '../../../landing-page/models/attendance-response/manager-attendance-display-date-response.model';

@Injectable({ providedIn: 'root' })
export class ManagerAttendanceService {
  private teamsAttendanceByManagerEndpoint = `${environment.BASE_URL}/api/attendances`;
  private http = inject(HttpClient);

  getUuid(): string {
    const loggedInUser = localStorage.getItem('auth');
    if (!loggedInUser) return '';
    try {
      const user = JSON.parse(loggedInUser);
      return user.uuid || null;
    } catch {
      alert('Manager not logged in!');
      return '';
    }
  }

  getTeamsAttendanceByDate(
    date: string
  ): Observable<ManagerAttendanceDisplayByDateResponseDTO> {
    const uuid = this.getUuid();

    if (!uuid) {
      return of({ date, attendanceRows: [] });
    }
    const url = `${this.teamsAttendanceByManagerEndpoint}/${uuid}/attendance`;
    const params = new HttpParams().set('date', date);
    return this.http.get<ManagerAttendanceDisplayByDateResponseDTO>(url, {
      params,
    });
  }
}
