import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { ManagerTeamsShiftResponse } from '../../../landing-page/models/shifts-response/manager-teams-shift-response.model';
import { TeamEmployeesCreateShiftForm } from '../../../landing-page/models/team-response/team-employees-create-shift-form-response.model';
import { CreateShiftRequestPayload } from '../../../landing-page/models/shifts-response/create-shift-payload.model';

@Injectable({ providedIn: 'root' })
export class ManagerShiftService {
  private http = inject(HttpClient);
  private teamsEndpoint = `${environment.BASE_URL}/api/teams`;
  private shiftsEndpoint = `${environment.BASE_URL}/api/shifts`;

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

  public getTeamSize(): Observable<number> {
    const uuid = this.getUuid();

    if (!uuid) {
      return of(0);
    }

    const url = `${this.teamsEndpoint}/manager/${encodeURIComponent(uuid)}/teamSize`;
    return this.http.get<number>(url);
  }

  public getTeamsShiftByManagerWithDatePicker(
    date: string
  ): Observable<ManagerTeamsShiftResponse[]> {
    const uuid = this.getUuid();

    const url = `${this.shiftsEndpoint}/manager/${uuid}/team-shifts-by-date`;
    const params = new HttpParams().set('date', date);

    return this.http.get<ManagerTeamsShiftResponse[]>(url, { params });
  }

  // form part
  public getTeamEmployees(): Observable<TeamEmployeesCreateShiftForm[]> {
    const uuid = this.getUuid();

    const url = `${this.teamsEndpoint}/manager/${uuid}/team-employees`;
    return this.http.get<TeamEmployeesCreateShiftForm[]>(url);
  }

  // create shift form part
  public createShiftForEmployee(payload: CreateShiftRequestPayload) {
    const uuid = this.getUuid();
    const url = `${this.shiftsEndpoint}/manager/${uuid}/create`;

    return this.http.post(url, payload);
  }
}
