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

  /**
   * Retrieves the authenticated manager's UUID from local storage
   *
   * @description Extracts and validates the manager's unique identifier from the stored authentication token.
   * This method is essential for all manager dashboard operations to ensure proper authorization
   * and data scope limiting to the manager's team and responsibilities.
   *
   * @returns {string} The manager's UUID if authenticated, empty string if not authenticated or on error
   *
   * @throws {Alert} Shows alert dialog if manager is not logged in when parsing fails
   */
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

  /**
   * Fetches the authenticated manager's name information for dashboard personalization
   *
   * @description Retrieves the first and last name of the currently logged-in manager
   * for display purposes on the management dashboard. This provides personalized
   * header information and user context throughout the management interface.
   *
   * @returns {Observable<EmployeeName>} Observable containing the manager's name details (firstName, lastName)
   *
   * @throws {HttpError} HTTP error if the request fails or manager is not found
   */
  public getManagersName(): Observable<EmployeeName> {
    const uuid = this.getUuid();
    const url = `${this.managersEndpoint}/${uuid}/name`;

    return this.http.get<EmployeeName>(url);
  }

  /**
   * Retrieves the total number of team members under the manager's supervision
   *
   * @description Fetches the count of active employees in the manager's team for dashboard
   * metrics and overview displays. This metric is essential for team management insights
   * and resource planning dashboards.
   *
   * @returns {Observable<number>} Observable containing the team size count, returns 0 if manager is not authenticated
   *
   * @throws {HttpError} HTTP error if the request fails or team information is not accessible
   */
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

  /**
   * Fetches comprehensive leave request statistics for the manager's team
   *
   * @description Retrieves aggregated leave request data including pending requests,
   * approved leaves, rejection counts, and other statistical information for dashboard
   * analytics. This data supports managerial decision-making and team oversight.
   *
   * @returns {Observable<ManagerLeaveRequestData>} Observable containing leave request statistics and metrics
   *
   * @throws {HttpError} HTTP error if the request fails or data is not accessible
   *
   */
  public getTeamLeaveStats(): Observable<ManagerLeaveRequestData> {
    const uuid = this.getUuid();

    if (!uuid) {
      return of();
    }

    const url = `${this.managerLeaveRequestEndpoint}/${uuid}/stats`;
    return this.http.get<ManagerLeaveRequestData>(url);
  }

  /**
   * Retrieves recent team leave requests for dashboard overview
   *
   * @description Fetches a summary of recent leave requests from team members including
   * request details, employee names, leave types, and statuses. This information is
   * optimized for dashboard display providing managers with quick oversight capabilities.
   *
   * @returns {Observable<ManagerLeaveRequestDashboard[]>} Observable array of recent leave requests, returns empty array if manager is not authenticated
   *
   * @throws {HttpError} HTTP error if the request fails or leave request data is not accessible
   */
  public getTeamLeaveRequests(): Observable<ManagerLeaveRequestDashboard[]> {
    const uuid = this.getUuid();

    if (!uuid) {
      return of([]);
    }

    const url = `${this.managerLeaveRequestEndpoint}/${uuid}/dashboard`;
    return this.http.get<ManagerLeaveRequestDashboard[]>(url);
  }
}
