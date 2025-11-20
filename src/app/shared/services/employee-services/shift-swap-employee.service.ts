import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ShiftSwapRequestForEmployee } from '../../../landing-page/models/shift-swap/shift-swap-request-employee-response.model';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ShiftSwapEmployeeService {
  private http = inject(HttpClient);

  private shiftSwapEndpoint = `${environment.BASE_URL}/api/shift-swap-requests`;

  /**
   * Retrieves the authenticated employee's UUID from local storage
   *
   * @description Extracts and validates the employee's unique identifier from the stored authentication token.
   * This method is essential for shift swap operations to ensure that employees can only view and
   * manage their own shift swap requests, maintaining proper authorization and data security.
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
   * Loads all shift swap requests associated with the authenticated employee
   *
   * @description Retrieves comprehensive shift swap request information including both requests
   * initiated by the employee and requests targeting the employee's shifts. This method provides
   * complete swap request history with status tracking, dates, and involved parties information.
   *
   * @returns {Observable<ShiftSwapRequestForEmployee[]>} Observable array of shift swap requests, or empty array if employee is not authenticated
   *
   * @throws {HttpError} HTTP error if the request fails or unauthorized access
   */
  loadShiftSwapRequests(): Observable<ShiftSwapRequestForEmployee[]> {
    const uuid = this.getUuid();
    if (!uuid) {
      return of([]);
    }

    const url = `${this.shiftSwapEndpoint}/employee/${uuid}`;
    return this.http.get<ShiftSwapRequestForEmployee[]>(url);
  }
}
