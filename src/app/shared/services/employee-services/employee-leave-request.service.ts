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

  /**
   * Retrieves the authenticated employee's UUID from local storage
   *
   * @description Extracts and validates the employee's unique identifier from the stored authentication token.
   * This method is used across leave request operations to ensure proper employee identification
   * and maintains security by validating authentication state before proceeding with leave-related operations.
   *
   * @returns {string} The employee's UUID if authenticated, empty string if not authenticated or on error
   *
   * @throws {Alert} Shows alert dialog if employee is not logged in when parsing fails
   *
   * @example
   * ```typescript
   * const employeeId = this.employeeLeaveRequestService.getUuid();
   * if (employeeId) {
   *   // Employee is authenticated, proceed with leave request operations
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
   * Retrieves all leave requests for the authenticated employee
   *
   * @description Fetches a comprehensive list of the employee's leave requests including pending,
   * approved, and rejected requests. This method provides detailed information for each request
   * including dates, leave type, status, reason, and approval workflow details for table display.
   *
   * @returns {Observable<LeaveRequestTableForEmployee[]>} Observable array of detailed leave request records
   *
   * @throws {HttpError} HTTP error if the request fails, employee is not found, or unauthorized access
   *
   * @example
   * ```typescript
   * this.employeeLeaveRequestService.getLeaveRequests().subscribe({
   *   next: (requests) => {
   *     this.leaveRequests = requests;
   *     this.pendingRequests = requests.filter(r => r.status === 'PENDING');
   *     this.approvedRequests = requests.filter(r => r.status === 'APPROVED');
   *   },
   *   error: (error) => console.error('Failed to load leave requests:', error)
   * });
   * ```
   */
  getLeaveRequests(): Observable<LeaveRequestTableForEmployee[]> {
    const uuid = this.getUuid();
    const url = `${this.leaveReqEndpoint}/${uuid}`;

    return this.http.get<LeaveRequestTableForEmployee[]>(url);
  }

  /**
   * Creates a new leave request for the authenticated employee
   *
   * @description Submits a new leave request to the backend system including validation of dates,
   * leave type, available balance, and business rules. The request enters the approval workflow
   * and notifications are sent to relevant managers for review and approval.
   *
   * @param {CreateNewLeaveRequest} payload - Leave request details including dates, type, reason, and duration
   * @param {Date} payload.startDate - Leave start date
   * @param {Date} payload.endDate - Leave end date
   * @param {LeaveType} payload.leaveType - Type of leave (SICK, VACATION, PERSONAL)
   * @param {string} payload.reason - Detailed reason for the leave request
   * @param {number} payload.daysRequested - Number of days being requested
   *
   * @returns {Observable<any>} Observable containing the created leave request confirmation
   *
   * @throws {HttpError} HTTP error if validation fails, insufficient leave balance, invalid dates, or unauthorized access
   *
   * @example
   * ```typescript
   * const leaveRequest: CreateNewLeaveRequest = {
   *   startDate: new Date('2024-12-25'),
   *   endDate: new Date('2024-12-31'),
   *   leaveType: LeaveType.VACATION,
   *   reason: 'Family vacation during holidays',
   *   daysRequested: 5
   * };
   *
   * this.employeeLeaveRequestService.createNewLeaveRequest(leaveRequest).subscribe({
   *   next: (response) => {
   *     this.showSuccess('Leave request submitted successfully!');
   *     this.refreshLeaveRequests();
   *   },
   *   error: (error) => {
   *     if (error.status === 400) {
   *       this.showError('Invalid request: ' + error.error.message);
   *     } else {
   *       this.showError('Failed to submit leave request');
   *     }
   *   }
   * });
   * ```
   */
  createNewLeaveRequest(payload: CreateNewLeaveRequest) {
    const uuid = this.getUuid();
    const url = `${this.leaveReqEndpoint}/${uuid}`;

    return this.http.post(url, payload);
  }
}
