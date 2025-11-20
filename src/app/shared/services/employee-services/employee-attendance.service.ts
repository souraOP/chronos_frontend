import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { AttendanceHistoryForEmployee } from '../../../landing-page/models/attendance-response/attendance-history-response.model';

@Injectable({ providedIn: 'root' })
export class EmployeeAttendanceService {
  private http = inject(HttpClient);

  private attendanceEndpoint = `${environment.BASE_URL}/api/attendances`;

  /**
   * Retrieves the authenticated employee's UUID from local storage with enhanced error handling
   *
   * @description Extracts and validates the employee's unique identifier from the stored authentication token.
   * This method provides comprehensive error handling for unauthorized access scenarios and logs
   * security-related issues for monitoring purposes.
   *
   * @returns {string} The employee's UUID if authenticated, empty string if not authenticated or on error
   *
   * @throws {Alert} Shows alert dialog if employee is not logged in when parsing fails
   * @throws {Console.error} Logs unauthorized access attempts
   */
  getUuid(): string {
    const loggedInUser = localStorage.getItem('auth');
    if (!loggedInUser) {
      console.error('Unauthorized!');
      return '';
    }
    try {
      const user = JSON.parse(loggedInUser);
      return user.uuid || null;
    } catch {
      alert('Employee not logged in!');
      return '';
    }
  }

  /**
   * Retrieves the complete attendance history for the authenticated employee
   *
   * @description Fetches a chronological list of all attendance records including check-in/check-out times,
   * work duration, dates, and status information. This comprehensive history is used for
   * attendance tracking, reporting, and employee time management analysis.
   *
   * @returns {Observable<AttendanceHistoryForEmployee[]>} Observable array of historical attendance records
   *
   * @throws {HttpError} HTTP error if the request fails, employee is not found, or unauthorized access
   */
  public getHistoryForEmployee(): Observable<AttendanceHistoryForEmployee[]> {
    const empUuid = this.getUuid();
    const url = `${this.attendanceEndpoint}/${empUuid}/history`;
    return this.http.get<AttendanceHistoryForEmployee[]>(url);
  }

  /**
   * Records employee check-in with optional location tracking
   *
   * @description Initiates a new work session by recording the employee's check-in time and location.
   * This method validates that the employee is not already checked in and creates a new
   * attendance record with ACTIVE status. Location tracking supports both office and remote work scenarios.
   *
   * @param {string} [location] - Optional location identifier for check-in (office, remote, client site, etc.)
   *
   * @returns {Observable<AttendanceHistoryForEmployee>} Observable containing the newly created attendance record
   *
   * @throws {HttpError} HTTP error if employee is already checked in, validation fails, or unauthorized access
   */
  public checkIn(location?: string): Observable<AttendanceHistoryForEmployee> {
    const empUuid = this.getUuid();
    const url = `${this.attendanceEndpoint}/${empUuid}/check-in`;
    const payload = location ? { location } : null;
    return this.http.post<AttendanceHistoryForEmployee>(url, payload);
  }

  /**
   * Records employee check-out and completes the current work session
   *
   * @description Finalizes the current work session by recording check-out time and calculating
   * total work duration. This method validates that the employee is currently checked in,
   * updates the attendance record status to COMPLETE, and computes worked hours for payroll integration.
   *
   * @returns {Observable<AttendanceHistoryForEmployee>} Observable containing the completed attendance record with calculated duration
   *
   * @throws {HttpError} HTTP error if employee is not checked in, validation fails, or unauthorized access
   */
  public checkOut(): Observable<AttendanceHistoryForEmployee> {
    const empUuid = this.getUuid();
    const url = `${this.attendanceEndpoint}/${empUuid}/check-out`;
    return this.http.post<AttendanceHistoryForEmployee>(url, {});
  }
}
