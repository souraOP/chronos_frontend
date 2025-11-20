import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { ManagerLeaveRequestData } from '../../../landing-page/models/leave-request-response/manager-leave-request-data-response.model';
import { TeamsLeaveRequest } from '../../../landing-page/models/leave-request-response/team-leave-requests.model';
import { TeamEmployeesCreateLeaveBalanceForm } from '../../../landing-page/models/leave-request-response/create-leave-balance-team-employees.model';
import { LeaveStatus } from '../../../constants/leave-status';

@Injectable({
  providedIn: 'root',
})
export class ManagerLeaveRequestService {
  private http = inject(HttpClient);
  private managerLeaveRequestEndpoint = `${environment.BASE_URL}/api/leave-requests/manager`;
  private teamsEndpoint = `${environment.BASE_URL}/api/teams`;

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

  getTeamLeaveRequestStats(): Observable<ManagerLeaveRequestData> {
    const managerUuid = this.getUuid();

    if (!managerUuid) {
      return of();
    }

    const url = `${this.managerLeaveRequestEndpoint}/${managerUuid}/stats`;
    return this.http.get<ManagerLeaveRequestData>(url);
  }

  getTeamEmployees(): Observable<TeamEmployeesCreateLeaveBalanceForm[]> {
    const uuid = this.getUuid();

    const url = `${this.teamsEndpoint}/manager/${uuid}/team-employees`;
    return this.http.get<TeamEmployeesCreateLeaveBalanceForm[]>(url);
  }

  getTeamLeaveRequests(): Observable<TeamsLeaveRequest[]> {
    const uuid = this.getUuid();

    if (!uuid) {
      return of([]);
    }

    const url = `${this.managerLeaveRequestEndpoint}/${uuid}`;
    return this.http.get<TeamsLeaveRequest[]>(url);
  }

  actionOnLeaveRequest(
    leaveRequestId: string,
    action: 'APPROVED' | 'REJECTED'
  ) {
    const uuid = this.getUuid();
    const url = `${this.managerLeaveRequestEndpoint}/${leaveRequestId}/action`;
    const params = new HttpParams().set('managerId', uuid);
    const payload = { action };
    return this.http.post<void>(url, payload, { params });
  }

  approveLeaveRequest(leaveRequestId: string) {
    return this.actionOnLeaveRequest(leaveRequestId, LeaveStatus.APPROVED);
  }

  rejectLeaveRequest(leaveRequestId: string) {
    return this.actionOnLeaveRequest(leaveRequestId, LeaveStatus.REJECTED);
  }
}
