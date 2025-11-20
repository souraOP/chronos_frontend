import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { Observable } from 'rxjs';
import { EmployeeLeaveRequestDashboard } from '../../../landing-page/models/leave-request-response/employee-leave-request-dashboard-response.model';
import { EmployeeName } from '../../../landing-page/models/employee-name.model';

@Injectable({ providedIn: 'root' })
export class EmployeeDashboardService {
  private http = inject(HttpClient);

  private leaveRequestEndpoint = `${environment.BASE_URL}/api/leave-requests/employees`;
  private employeeEndpoint = `${environment.BASE_URL}/api/employees`;

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

  getEmployeeName() {
    const uuid = this.getUuid();
    const url = `${this.employeeEndpoint}/${uuid}/name`;
    return this.http.get<EmployeeName>(url);
  }

  getLeaveRequests(): Observable<EmployeeLeaveRequestDashboard[]> {
    const uuid = this.getUuid();
    const url = `${this.leaveRequestEndpoint}/${uuid}/dashboard`;
    return this.http.get<EmployeeLeaveRequestDashboard[]>(url);
  }
}
