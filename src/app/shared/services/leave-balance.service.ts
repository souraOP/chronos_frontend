import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { NewLeaveBalance } from '../../landing-page/models/new-leave-balance.model';
import { CreateLeaveBalanceResponse } from '../../landing-page/models/leave-request-response/create-leave-balance-response.model';
import { LeaveType } from '../../constants/leave-type';

@Injectable({
  providedIn: 'root',
})
export class LeaveBalanceService {
  private http = inject(HttpClient);
  private newLeaveBalanceEndpoint = `${environment.BASE_URL}/api/leave-balances/employees`;

  /**
   * Retrieves the authenticated user's UUID from local storage
   *
   * @description Extracts and validates the user's unique identifier from the stored authentication token.
   * This method supports both employee and manager access to leave balance information while
   * maintaining proper authentication validation throughout the leave management system.
   *
   * @returns {string} The user's UUID if authenticated, empty string if not authenticated or on error
   *
   * @throws {Alert} Shows alert dialog if user is not logged in when parsing fails
   */
  getUuid(): string {
    const loggedInUser = localStorage.getItem('auth');
    if (!loggedInUser) return '';
    try {
      const user = JSON.parse(loggedInUser);
      return user.uuid || null;
    } catch {
      alert('User not logged in!');
      return '';
    }
  }

  /**
   * Creates a new leave balance entry for a specific employee
   *
   * @description Initializes or updates leave balance for an employee by leave type. This method
   * is typically used during employee onboarding, annual leave allocation updates, or
   * administrative balance adjustments. The operation requires appropriate authorization.
   *
   * @param {string} employeeId - The unique identifier of the employee
   * @param {string} leaveType - The type of leave balance to create (SICK, VACATION, PERSONAL)
   * @param {number} balance - The initial or updated leave balance amount in days
   *
   * @returns {Observable<CreateLeaveBalanceResponse>} Observable containing the created leave balance confirmation
   *
   * @throws {HttpError} HTTP error if creation fails, employee is not found, or unauthorized access
   */
  createLeaveBalance(
    employeeId: string,
    leaveType: string,
    balance: number
  ): Observable<CreateLeaveBalanceResponse> {
    const url = `${this.newLeaveBalanceEndpoint}/${employeeId}?leaveType=${leaveType}&leaveBalance=${balance}`;
    return this.http.post<CreateLeaveBalanceResponse>(url, {});
  }

  /**
   * Fetches all leave balance information for the authenticated user
   *
   * @description Retrieves comprehensive leave balance data including all leave types
   * (sick, vacation, personal) with current balances, used amounts, and balance IDs.
   * This method provides the foundation data for leave request validation and display.
   *
   * @returns {Observable<NewLeaveBalance[]>} Observable array of leave balance objects for all leave types
   *
   * @throws {HttpError} HTTP error if the request fails, user is not found, or unauthorized access
   */
  getLeaveBalanceFromBackend(): Observable<NewLeaveBalance[]> {
    const uuid = this.getUuid();
    const url = `${this.newLeaveBalanceEndpoint}/${uuid}`;

    return this.http.get<NewLeaveBalance[]>(url);
  }

  /**
   * Extracts the sick leave balance from a leave balance array
   *
   * @description Utility method to find and return the current sick leave balance from
   * a collection of leave balances. This method provides type-safe access to specific
   * leave type balances with fallback handling for missing data.
   *
   * @param {NewLeaveBalance[]} newLeaveBalance - Array of leave balance objects from the backend
   *
   * @returns {number} Current sick leave balance in days, returns 0 if not found
   */
  getNewSickLeaveBalance(newLeaveBalance: NewLeaveBalance[]): number {
    const sickLeave = newLeaveBalance.find(
      (balance) => balance.leaveType === LeaveType.SICK
    );
    return sickLeave ? sickLeave.leaveBalance : 0;
  }

  /**
   * Extracts the vacation leave balance from a leave balance array
   *
   * @description Utility method to find and return the current vacation leave balance from
   * a collection of leave balances. This method enables vacation leave request validation
   * and balance display throughout the application.
   *
   * @param {NewLeaveBalance[]} leaveBalance - Array of leave balance objects from the backend
   *
   * @returns {number} Current vacation leave balance in days, returns 0 if not found
   */
  getNewVacationLeaveBalance(leaveBalance: NewLeaveBalance[]): number {
    const vacationLeave = leaveBalance.find(
      (balance) => balance.leaveType === LeaveType.VACATION
    );
    return vacationLeave ? vacationLeave.leaveBalance : 0;
  }

  /**
   * Extracts the personal leave balance from a leave balance array
   *
   * @description Utility method to find and return the current personal leave balance from
   * a collection of leave balances. This method supports personal leave management and
   * request validation with consistent error handling.
   *
   * @param {NewLeaveBalance[]} leaveBalance - Array of leave balance objects from the backend
   *
   * @returns {number} Current personal leave balance in days, returns 0 if not found
   */
  getNewPersonalLeaveBalance(leaveBalance: NewLeaveBalance[]): number {
    const personalBalance = leaveBalance.find(
      (balance) => balance.leaveType === LeaveType.PERSONAL
    );
    return personalBalance ? personalBalance.leaveBalance : 0;
  }
}
