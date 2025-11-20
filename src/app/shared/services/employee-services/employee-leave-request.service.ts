import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { LeaveRequestTableForEmployee } from '../../../landing-page/models/leave-request-response/employee-leave-request-response.model';
import { Observable } from 'rxjs';
import { CreateNewLeaveRequest } from '../../../landing-page/models/leave-request-response/employee-create-leave-request.model';

@Injectable({ providedIn: 'root' })
export class EmployeeLeaveRequestService {
  private http = inject(HttpClient);

  private leaveReqEndpoint = `${environment.BASE_URL}/api/leave-requests/employees`;

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

  getLeaveRequests(): Observable<LeaveRequestTableForEmployee[]> {
    const uuid = this.getUuid();
    const url = `${this.leaveReqEndpoint}/${uuid}`;

    return this.http.get<LeaveRequestTableForEmployee[]>(url);
  }

  createNewLeaveRequest(payload: CreateNewLeaveRequest) {
    const uuid = this.getUuid();
    const url = `${this.leaveReqEndpoint}/${uuid}`;

    return this.http.post(url, payload);
  }
}
