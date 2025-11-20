import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { ShiftDashboardResponse } from '../../../landing-page/models/shifts-response/dashboard-shift-response.model';
import { map, Observable } from 'rxjs';
import { TeamMembersWithShift } from '../../../landing-page/models/shifts-response/team-members-with-shift.model';
import { CreateShiftSwapRequestPayload } from '../../../landing-page/models/shift-swap/create-shift-swap-request-response.model';

@Injectable({
  providedIn: 'root',
})
export class RequestSwapEmployeeService {
  private http = inject(HttpClient);

  private shiftsEndpoint = `${environment.BASE_URL}/api/shifts`;
  private teamEndpoint = `${environment.BASE_URL}/api/teams`;
  private shiftSwapEndpoint = `${environment.BASE_URL}/api/shift-swap-requests`;

  /**
   * Retrieves the authenticated employee's UUID from local storage
   *
   * @description Extracts and validates the employee's unique identifier from the stored authentication token.
   * This method is fundamental for shift swap request operations, ensuring proper employee identification
   * and maintaining security throughout the swap request lifecycle.
   *
   * @returns {string} The employee's UUID if authenticated, empty string if not authenticated or on error
   *
   * @throws {Alert} Shows alert dialog if employee is not logged in when parsing fails
   *
   * @example
   * ```typescript
   * const employeeId = this.requestSwapEmployeeService.getUuid();
   * if (employeeId) {
   *   // Employee is authenticated, proceed with swap request operations
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
   * Fetches the logged-in employee's available shifts for swap requests
   *
   * @description Retrieves the employee's upcoming shifts that are eligible for swap requests.
   * This method automatically filters out past shifts and only returns future shifts that
   * can be included in swap requests. The data is formatted for use in swap request forms.
   *
   * @returns {Observable<ShiftDashboardResponse[]>} Observable array of future shifts available for swapping
   *
   * @throws {HttpError} HTTP error if the request fails, employee is not found, or unauthorized access
   *
   * @example
   * ```typescript
   * this.requestSwapEmployeeService.getLoggedInEmployeeShiftsInForm().subscribe({
   *   next: (availableShifts) => {
   *     this.employeeShiftsForSwap = availableShifts;
   *     this.populateSwapRequestForm(availableShifts);
   *   },
   *   error: (error) => console.error('Failed to load available shifts for swap:', error)
   * });
   * ```
   */
  getLoggedInEmployeeShiftsInForm(): Observable<ShiftDashboardResponse[]> {
    const uuid = this.getUuid();
    const url = `${this.shiftsEndpoint}/${uuid}`;
    return this.http.get<ShiftDashboardResponse[]>(url).pipe(
      map((list) => {
        const now = new Date();
        return list.filter((s) => new Date(s.shiftStartTime) >= now);
      })
    );
  }

  /**
   * Retrieves team members along with their upcoming shifts for swap targeting
   *
   * @description Fetches information about team members and their scheduled upcoming shifts,
   * enabling employees to identify potential swap partners and available shifts for exchange.
   * This method provides comprehensive team shift visibility for informed swap decisions.
   *
   * @returns {Observable<TeamMembersWithShift[]>} Observable array of team members with their associated upcoming shifts
   *
   * @throws {HttpError} HTTP error if the request fails, team information is not accessible, or unauthorized access
   *
   * @example
   * ```typescript
   * this.requestSwapEmployeeService.getTeamMembersWithUpcomingShifts().subscribe({
   *   next: (teamMembersWithShifts) => {
   *     this.availableSwapPartners = teamMembersWithShifts;
   *     this.buildSwapTargetOptions(teamMembersWithShifts);
   *   },
   *   error: (error) => console.error('Failed to load team members with shifts:', error)
   * });
   * ```
   */
  getTeamMembersWithUpcomingShifts(): Observable<TeamMembersWithShift[]> {
    const uuid = this.getUuid();
    const url = `${this.teamEndpoint}/${uuid}/members-with-upcoming-shifts`;
    return this.http.get<TeamMembersWithShift[]>(url);
  }

  /**
   * Creates a new shift swap request
   *
   * @description Submits a shift swap request to the system including validation of shift compatibility,
   * employee permissions, and business rules. The request enters the approval workflow and
   * notifications are sent to relevant parties including the target employee and managers.
   *
   * @param {CreateShiftSwapRequestPayload} payload - Complete swap request details
   * @param {string} payload.requesterId - UUID of the employee requesting the swap
   * @param {string} payload.requesterShiftId - ID of the shift being offered for swap
   * @param {string} payload.targetEmployeeId - UUID of the target employee
   * @param {string} payload.targetShiftId - ID of the desired shift
   * @param {string} payload.reason - Reason for the swap request
   * @param {Date} payload.requestDate - Date when the request was made
   *
   * @returns {Observable<any>} Observable containing the created swap request confirmation
   *
   * @throws {HttpError} HTTP error if validation fails, shift conflicts exist, or unauthorized access
   *
   * @example
   * ```typescript
   * const swapRequest: CreateShiftSwapRequestPayload = {
   *   requesterId: this.currentEmployeeId,
   *   requesterShiftId: 'shift-123',
   *   targetEmployeeId: 'emp-456',
   *   targetShiftId: 'shift-789',
   *   reason: 'Family commitment on original shift date',
   *   requestDate: new Date()
   * };
   *
   * this.requestSwapEmployeeService.createSwapRequest(swapRequest).subscribe({
   *   next: (response) => {
   *     this.showSuccess('Swap request submitted successfully!');
   *     this.refreshSwapRequests();
   *     this.closeSwapRequestModal();
   *   },
   *   error: (error) => {
   *     if (error.status === 409) {
   *       this.showError('Shift conflict detected. Please choose different shifts.');
   *     } else {
   *       this.showError('Failed to submit swap request: ' + error.message);
   *     }
   *   }
   * });
   * ```
   */
  createSwapRequest(payload: CreateShiftSwapRequestPayload) {
    const url = `${this.shiftSwapEndpoint}/create`;
    return this.http.post(url, payload);
  }
}
