import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamMembers } from '../../../landing-page/models/team-members.model';
import { environment } from '../../../../environment/environment';
import { ShiftDashboardResponse } from '../../../landing-page/models/shifts-response/dashboard-shift-response.model';
import { ShiftTableByEmployee } from '../../../landing-page/models/shifts-response/employee-shift-response.model';

@Injectable({
  providedIn: 'root',
})
export class ShiftService {
  private http = inject(HttpClient);
  private shiftsEndpoint = `${environment.BASE_URL}/api/shifts`;

  public teamMembers: TeamMembers[] = [];
  public teamSize = 0;

  getUuid(): string {
    const loggedInUser = localStorage.getItem('auth');
    if (!loggedInUser) return '';
    try {
      const user = JSON.parse(loggedInUser);
      return user.uuid || null;
    } catch {
      alert('Employee not logged in!');
      return '';
    }
  }

  // need to fix the response dto
  getEmployeeUpcomingShiftsDashboard(): Observable<ShiftDashboardResponse[]> {
    const uuid = this.getUuid();
    const url = `${this.shiftsEndpoint}/${uuid}`;
    return this.http.get<ShiftDashboardResponse[]>(url);
  }

  getEmployeeUpcomingShiftsTable(): Observable<ShiftTableByEmployee[]> {
    const uuid = this.getUuid();
    const url = `${this.shiftsEndpoint}/${uuid}`;
    return this.http.get<ShiftTableByEmployee[]>(url);
  }
}
