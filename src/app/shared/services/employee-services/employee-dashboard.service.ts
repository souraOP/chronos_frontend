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

  /**
   * Retrieves the authenticated employee's UUID from local storage
   *
   * @description Extracts and validates the employee's unique identifier from the stored authentication token.
   * This method handles authentication validation and provides error feedback for unauthorized access.
   *
   * @returns {string} The employee's UUID if authenticated, empty string if not authenticated or on error
   *
   * @throws {Alert} Shows alert dialog if employee is not logged in when parsing fails
   *
   * @example
   * ```typescript
   * const employeeId = this.employeeDashboardService.getUuid();
   * if (employeeId) {
   *   // Employee is authenticated, proceed with operations
   * }
   * ```
   */
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

  /**
   * Fetches the authenticated employee's name information
   *
   * @description Retrieves the first and last name of the currently logged-in employee
   * from the backend API. This method is commonly used for displaying personalized
   * information on the employee dashboard.
   *
   * @returns {Observable<EmployeeName>} Observable containing the employee's name details (firstName, lastName)
   *
   * @throws {HttpError} HTTP error if the request fails or employee is not found
   *
   * @example
   * ```typescript
   * this.employeeDashboardService.getEmployeeName().subscribe({
   *   next: (name) => {
   *     this.employeeName = `${name.firstName} ${name.lastName}`;
   *   },
   *   error: (error) => console.error('Failed to load employee name:', error)
   * });
   * ```
   */
  getEmployeeName() {
    const uuid = this.getUuid();
    const url = `${this.employeeEndpoint}/${uuid}/name`;
    return this.http.get<EmployeeName>(url);
  }

  /**
   * Retrieves recent leave requests for the authenticated employee's dashboard
   *
   * @description Fetches a summary of the employee's recent leave requests including
   * status, dates, and leave types. This data is specifically formatted for dashboard
   * display with condensed information for quick overview.
   *
   * @returns {Observable<EmployeeLeaveRequestDashboard[]>} Observable array of recent leave request summaries
   *
   * @throws {HttpError} HTTP error if the request fails or employee is not authenticated
   *
   * @example
   * ```typescript
   * this.employeeDashboardService.getLeaveRequests().subscribe({
   *   next: (requests) => {
   *     this.recentLeaveRequests = requests.slice(0, 5); // Show latest 5
   *   },
   *   error: (error) => console.error('Failed to load leave requests:', error)
   * });
   * ```
   */
  getLeaveRequests(): Observable<EmployeeLeaveRequestDashboard[]> {
    const uuid = this.getUuid();
    const url = `${this.leaveRequestEndpoint}/${uuid}/dashboard`;
    return this.http.get<EmployeeLeaveRequestDashboard[]>(url);
  }
}
