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

  /**
   * Retrieves the authenticated employee's UUID from local storage
   *
   * @description Extracts and validates the employee's unique identifier from the stored authentication token.
   * This method is essential for shift-related operations to ensure proper employee identification
   * and maintain security across shift scheduling and management functions.
   *
   * @returns {string} The employee's UUID if authenticated, empty string if not authenticated or on error
   *
   * @throws {Alert} Shows alert dialog if employee is not logged in when parsing fails
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
   * Fetches upcoming shifts for employee dashboard display
   *
   * @description Retrieves a condensed view of the employee's upcoming shifts optimized for dashboard
   * presentation. This method returns essential shift information including dates, times, locations,
   * and status in a format suitable for quick overview and summary displays.
   *
   * @returns {Observable<ShiftDashboardResponse[]>} Observable array of upcoming shifts with dashboard-specific formatting
   *
   * @throws {HttpError} HTTP error if the request fails, employee is not found, or unauthorized access
   *
   * @todo Fix the response DTO structure as noted in the code comment
   */
  getEmployeeUpcomingShiftsDashboard(): Observable<ShiftDashboardResponse[]> {
    const uuid = this.getUuid();
    const url = `${this.shiftsEndpoint}/${uuid}`;
    return this.http.get<ShiftDashboardResponse[]>(url);
  }

  /**
   * Retrieves detailed upcoming shifts for table display
   *
   * @description Fetches comprehensive shift information for the employee including all relevant
   * details for table-based views. This method provides complete shift data suitable for
   * detailed shift management interfaces, scheduling views, and administrative functions.
   *
   * @returns {Observable<ShiftTableByEmployee[]>} Observable array of detailed shift records for table display
   *
   * @throws {HttpError} HTTP error if the request fails, employee is not found, or unauthorized access
   */
  getEmployeeUpcomingShiftsTable(): Observable<ShiftTableByEmployee[]> {
    const uuid = this.getUuid();
    const url = `${this.shiftsEndpoint}/${uuid}`;
    return this.http.get<ShiftTableByEmployee[]>(url);
  }
}
