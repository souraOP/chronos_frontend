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
   *
   * @example
   * ```typescript
   * const employeeId = this.employeeAttendanceService.getUuid();
   * if (employeeId) {
   *   // Employee is authenticated, proceed with attendance operations
   * }
   * ```
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
   *
   * @example
   * ```typescript
   * this.employeeAttendanceService.getHistoryForEmployee().subscribe({
   *   next: (history) => {
   *     this.attendanceHistory = history.sort((a, b) =>
   *       new Date(b.date).getTime() - new Date(a.date).getTime()
   *     );
   *   },
   *   error: (error) => console.error('Failed to load attendance history:', error)
   * });
   * ```
   */
  public getHistoryForEmployee(): Observable<AttendanceHistoryForEmployee[]> {
    const empUuid = this.getUuid();
    const url = `${this.attendanceEndpoint}/${empUuid}/history`;
    return this.http.get<AttendanceHistoryForEmployee[]>(url);
  }

  /**
   * Fetches the most recent attendance record for the authenticated employee
   *
   * @description Retrieves the latest attendance entry to determine current status (checked in/out),
   * last check-in time, and current work session information. This method is essential for
   * displaying real-time attendance status and enabling appropriate check-in/check-out actions.
   *
   * @returns {Observable<AttendanceHistoryForEmployee>} Observable containing the latest attendance record
   *
   * @throws {HttpError} HTTP error if no recent attendance found, employee not found, or unauthorized access
   *
   * @example
   * ```typescript
   * this.employeeAttendanceService.getLatestForEmployee().subscribe({
   *   next: (latest) => {
   *     this.isCheckedIn = latest.status === 'ACTIVE';
   *     this.lastCheckInTime = latest.checkInTime;
   *   },
   *   error: (error) => console.error('No recent attendance found:', error)
   * });
   * ```
   */
  public getLatestForEmployee(): Observable<AttendanceHistoryForEmployee> {
    const empUuid = this.getUuid();
    const url = `${this.attendanceEndpoint}/${empUuid}/latest`;
    return this.http.get<AttendanceHistoryForEmployee>(url);
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
   *
   * @example
   * ```typescript
   * // Check-in at office
   * this.employeeAttendanceService.checkIn('Office - Building A').subscribe({
   *   next: (record) => {
   *     this.currentSession = record;
   *     this.showSuccess('Checked in successfully!');
   *   },
   *   error: (error) => this.showError('Check-in failed: ' + error.message)
   * });
   *
   * // Check-in without location
   * this.employeeAttendanceService.checkIn().subscribe({
   *   next: (record) => console.log('Checked in at:', record.checkInTime)
   * });
   * ```
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
   *
   * @example
   * ```typescript
   * this.employeeAttendanceService.checkOut().subscribe({
   *   next: (record) => {
   *     this.completedSession = record;
   *     this.totalHoursWorked = record.hoursWorked;
   *     this.showSuccess(`Checked out! Total hours: ${record.hoursWorked}`);
   *   },
   *   error: (error) => {
   *     if (error.status === 400) {
   *       this.showError('You are not currently checked in');
   *     } else {
   *       this.showError('Check-out failed: ' + error.message);
   *     }
   *   }
   * });
   * ```
   */
  public checkOut(): Observable<AttendanceHistoryForEmployee> {
    const empUuid = this.getUuid();
    const url = `${this.attendanceEndpoint}/${empUuid}/check-out`;
    return this.http.post<AttendanceHistoryForEmployee>(url, {});
  }
}
