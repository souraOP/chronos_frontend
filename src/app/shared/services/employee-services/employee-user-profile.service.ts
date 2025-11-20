import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environment/environment';
import { Observable } from 'rxjs';
import { Employee } from '../../../landing-page/models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeUserProfileService {
  private http = inject(HttpClient);

  private employeeEndpoint = `${environment.BASE_URL}/api/employees`;

  constructor(private router: Router) {}

  /**
   * Retrieves the authenticated employee's UUID from local storage
   *
   * @description Extracts and validates the employee's unique identifier from the stored authentication token.
   * This method is crucial for profile-related operations to ensure that employees can only access
   * and modify their own profile information, maintaining data security and privacy.
   *
   * @returns {string} The employee's UUID if authenticated, empty string if not authenticated or on error
   *
   * @throws {Alert} Shows alert dialog if employee is not logged in when parsing fails
   *
   * @example
   * ```typescript
   * const employeeId = this.employeeUserProfileService.getUuid();
   * if (employeeId) {
   *   // Employee is authenticated, proceed with profile operations
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
   * Fetches comprehensive employee profile details
   *
   * @description Retrieves complete employee information including personal details, contact information,
   * job title, department, employment status, and other profile-related data. This method provides
   * all necessary information for profile display and management interfaces.
   *
   * @returns {Observable<Employee>} Observable containing complete employee profile information
   *
   * @throws {HttpError} HTTP error if the request fails, employee is not found, or unauthorized access
   *
   * @example
   * ```typescript
   * this.employeeUserProfileService.getEmployeeDetails().subscribe({
   *   next: (employee) => {
   *     this.employeeProfile = employee;
   *     this.displayName = `${employee.firstName} ${employee.lastName}`;
   *     this.jobTitle = employee.jobTitle;
   *     this.department = employee.departmentName;
   *   },
   *   error: (error) => console.error('Failed to load employee details:', error)
   * });
   * ```
   */
  getEmployeeDetails(): Observable<Employee> {
    const uuid = this.getUuid();
    const url = `${this.employeeEndpoint}/${uuid}`;
    return this.http.get<Employee>(url);
  }

  /**
   * Navigates to the password change interface
   *
   * @description Provides a secure navigation method to the password change form, ensuring proper
   * routing and maintaining the current authentication context. This method is typically triggered
   * by user actions from the profile management interface.
   *
   * @returns {void}
   *
   * @example
   * ```typescript
   * // In component template
   * // <button (click)="changePassword()">Change Password</button>
   *
   * // In component
   * changePassword() {
   *   this.employeeUserProfileService.onClickChangePassword();
   * }
   * ```
   */
  onClickChangePassword() {
    this.router.navigate(['change-password']);
  }
}
