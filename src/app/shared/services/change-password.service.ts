import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ChangePasswordDTO,
  ChangePasswordResponseDTO,
} from '../../landing-page/models/auth.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {
  private http = inject(HttpClient);

  /**
   * Changes the password for a user account with secure validation
   *
   * @description Securely updates a user's password by validating the new password requirements
   * and ensuring proper authentication. This method supports both employee and manager password
   * changes with comprehensive security validation including password strength, confirmation
   * matching, and secure transmission to the backend authentication system.
   *
   * @param {string} email - User's email address (URL encoded for security)
   * @param {ChangePasswordDTO} payload - Password change request data
   * @param {string} payload.newPassword - The new password meeting security requirements
   * @param {string} payload.confirmPassword - Password confirmation for validation
   *
   * @returns {Observable<ChangePasswordResponseDTO>} Observable containing password change confirmation and user details
   *
   * @throws {HttpError} HTTP error if password change fails due to validation errors, security requirements, or server issues
   *
   * @example
   * ```typescript
   * const passwordChangeData: ChangePasswordDTO = {
   *   newPassword: 'NewSecurePassword123!',
   *   confirmPassword: 'NewSecurePassword123!'
   * };
   *
   * const userEmail = 'user@company.com';
   *
   * this.changePasswordService.changePassword(userEmail, passwordChangeData).subscribe({
   *   next: (response) => {
   *     this.showSuccess('Password changed successfully!');
   *     console.log('Password changed for:', response.email);
   *     this.router.navigate(['/login']);
   *   },
   *   error: (error) => {
   *     if (error.status === 400) {
   *       this.showError('Password validation failed: ' + error.error.message);
   *     } else if (error.status === 401) {
   *       this.showError('Current password is incorrect');
   *     } else if (error.status === 422) {
   *       this.showError('New password does not meet security requirements');
   *     } else {
   *       this.showError('Failed to change password. Please try again.');
   *     }
   *   }
   * });
   *
   * // Password validation in component
   * validatePasswordChange(formData: ChangePasswordDTO): boolean {
   *   if (formData.newPassword !== formData.confirmPassword) {
   *     this.showError('Passwords do not match');
   *     return false;
   *   }
   *   if (formData.newPassword.length < 8) {
   *     this.showError('Password must be at least 8 characters long');
   *     return false;
   *   }
   *   return true;
   * }
   * ```
   */
  changePassword(
    email: string,
    payload: ChangePasswordDTO
  ): Observable<ChangePasswordResponseDTO> {
    const url = `${
      environment.BASE_URL
    }/api/login/change-password?email=${decodeURIComponent(email)}`;
    return this.http.patch<ChangePasswordResponseDTO>(url, payload);
  }
}
