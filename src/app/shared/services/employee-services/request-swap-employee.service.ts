import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { ShiftDashboardResponse } from '../../../landing-page/models/shifts-response/dashboard-shift-response.model';
import { map, Observable } from 'rxjs';
import { TeamMembersWithShift } from '../../../landing-page/models/shifts-response/team-members-with-shift.model';
import { CreateShiftSwapRequestPayload } from '../../../landing-page/models/shift-swap/create-shift-swap-request-response.model';

@Injectable({
  providedIn: 'root',
})
export class RequestSwapEmployeeService {
  private http = inject(HttpClient);

  private shiftsEndpoint = `${environment.BASE_URL}/api/shifts`;
  private teamEndpoint = `${environment.BASE_URL}/api/teams`;
  private shiftSwapEndpoint = `${environment.BASE_URL}/api/shift-swap-requests`;

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

  getLoggedInEmployeeShiftsInForm(): Observable<ShiftDashboardResponse[]> {
    const uuid = this.getUuid();
    const url = `${this.shiftsEndpoint}/${uuid}`;
    return this.http.get<ShiftDashboardResponse[]>(url).pipe(
      map((list) => {
        const now = new Date();
        return list.filter((s) => new Date(s.shiftStartTime) >= now);
      })
    );
  }

  getTeamMembersWithUpcomingShifts(): Observable<TeamMembersWithShift[]> {
    const uuid = this.getUuid();
    const url = `${this.teamEndpoint}/${uuid}/members-with-upcoming-shifts`;
    return this.http.get<TeamMembersWithShift[]>(url);
  }

  createSwapRequest(payload: CreateShiftSwapRequestPayload) {
    const url = `${this.shiftSwapEndpoint}/create`;
    return this.http.post(url, payload);
  }
}
