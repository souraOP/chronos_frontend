import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ManagerLeaveRequestData } from '../../../landing-page/models/leave-request-response/manager-leave-request-data-response.model';
import { EmployeeName } from '../../../landing-page/models/employee-name.model';
import { ManagerLeaveRequestDashboard } from '../../../landing-page/models/leave-request-response/manager-leave-request-dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class ManagerDashboardService {
  private teamsEndpoint = `${environment.BASE_URL}/api/teams`;
  private managerLeaveRequestEndpoint = `${environment.BASE_URL}/api/leave-requests/manager`;
  private managersEndpoint = `${environment.BASE_URL}/api/employees`;

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

  public getManagersName(): Observable<EmployeeName> {
    const uuid = this.getUuid();
    const url = `${this.managersEndpoint}/${uuid}/name`;

    return this.http.get<EmployeeName>(url);
  }

  public getTeamSize(): Observable<number> {
    const uuid = this.getUuid();

    if (!uuid) {
      return of(0);
    }

    const url = `${this.teamsEndpoint}/manager/${encodeURIComponent(
      uuid
    )}/teamSize`;
    return this.http.get<number>(url);
  }

  public getTeamLeaveStats(): Observable<ManagerLeaveRequestData> {
    const uuid = this.getUuid();

    if (!uuid) {
      return of();
    }

    const url = `${this.managerLeaveRequestEndpoint}/${uuid}/stats`;
    return this.http.get<ManagerLeaveRequestData>(url);
  }

  public getTeamLeaveRequests(): Observable<ManagerLeaveRequestDashboard[]> {
    const uuid = this.getUuid();

    if (!uuid) {
      return of([]);
    }

    const url = `${this.managerLeaveRequestEndpoint}/${uuid}/dashboard`;
    return this.http.get<ManagerLeaveRequestDashboard[]>(url);
  }
}
