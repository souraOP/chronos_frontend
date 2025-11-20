import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { LoginMessageStatus } from '../../landing-page/employee-login-page/employee-login.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import {
  AuthUser,
  LoginDTO,
  LoginResponseDTO,
} from '../../landing-page/models/auth.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  /** Local storage key for authentication data persistence */
  private readonly storageKey = 'auth';

  /** Loading state signal for UI feedback during authentication operations */
  public isLoading = signal<boolean>(false);

  /** Login message status signal for displaying success/failure feedback */
  public loginMessageStatus = signal<LoginMessageStatus>(null);

  /** Current authenticated user signal with automatic storage integration */
  private user = signal<AuthUser | null>(this.readFromStorage());

  /** Computed authentication status based on user presence */
  public isAuthenticated = computed(() => !!this.user());

  constructor(private router: Router) {}

  /**
   * Reads and parses authentication data from local storage
   *
   * @description Safely retrieves and deserializes user authentication information from browser storage.
   * This method handles parsing errors gracefully and ensures application stability when storage
   * data is corrupted or invalid.
   *
   * @private
   * @returns {AuthUser | null} Parsed authentication user object or null if not found or invalid
   */
  private readFromStorage(): AuthUser | null {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  }

  /**
   * Writes authentication data to local storage with error handling
   *
   * @description Safely serializes and stores user authentication information in browser storage.
   * This method handles both setting new authentication data and removing existing data
   * during logout operations.
   *
   * @private
   * @param {AuthUser | null} user - User authentication object to store, or null to remove
   */
  private writeToStorage(user: AuthUser | null) {
    if (user) {
      localStorage.setItem(this.storageKey, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.storageKey);
    }
  }

  /**
   * Retrieves the current authenticated user information
   *
   * @description Provides access to the current user's authentication details including UUID,
   * email, role, employee ID, and authentication token. This method is used throughout
   * the application for user context and authorization decisions.
   *
   * @returns {AuthUser | null} Current authenticated user object or null if not authenticated
   */
  getUser(): AuthUser | null {
    return this.user();
  }

  /**
   * Extracts the authentication token from the current user session
   *
   * @description Provides secure access to the JWT authentication token for API requests.
   * This method is primarily used by HTTP interceptors and services requiring
   * authenticated API access.
   *
   * @returns {string | null} JWT authentication token or null if user is not authenticated
   */
  getToken(): string | null {
    return this.user()?.token ?? null;
  }

  /**
   * Returns the loading state signal for UI binding
   *
   * @description Provides access to the loading state signal for components that need to
   * display loading indicators during authentication operations. This enables reactive
   * UI updates based on authentication state changes.
   *
   * @returns {Signal<boolean>} Loading state signal
   */
  isLoadingFunc() {
    return this.isLoading;
  }

  /**
   * Returns the login message status signal for UI feedback
   *
   * @description Provides access to the login status signal for components that need to
   * display success or error messages based on authentication results. This enables
   * reactive feedback to users during login operations.
   *
   * @returns {Signal<LoginMessageStatus>} Login message status signal
   */
  logInMessageStatusFunc() {
    return this.loginMessageStatus;
  }

  /**
   * Performs role-based authentication with comprehensive error handling
   *
   * @description Authenticates users against the backend API with role-specific endpoints
   * and automatic redirection based on user roles. This method handles form validation,
   * loading states, success/error feedback, and secure token storage.
   *
   * @param {FormGroup} loginForm - Reactive form containing email and password fields
   * @param {'Employee' | 'Manager'} [role='Employee'] - User role for determining authentication endpoint and post-login routing
   *
   * @returns {void}
   *
   * @throws {HttpError} HTTP error if authentication fails due to invalid credentials or server issues
   */
  login(loginForm: FormGroup, role: 'Employee' | 'Manager' = 'Employee'): void {
    if (loginForm.invalid) {
      loginForm.markAllAsTouched();
      this.loginMessageStatus.set('failed');
      return;
    }
    this.isLoading.set(true);
    this.loginMessageStatus.set(null);

    const { email, password } = loginForm.value as LoginDTO;

    const rolePath = role.toLowerCase();

    const url = `${environment.BASE_URL}/api/login/${rolePath}`;

    this.http.post<LoginResponseDTO>(url, { email, password }).subscribe({
      next: (res) => {
        const authUser: AuthUser = {
          uuid: res.uuid,
          email: res.email,
          role: res.role,
          employeeId: res.employeeId,
          token: res.token,
        };

        this.user.set(authUser);
        this.writeToStorage(authUser);

        this.loginMessageStatus.set('success');
        this.isLoading.set(false);

        if (res.role === 'EMPLOYEE') {
          this.router.navigate(['employee-section', res.uuid, 'dashboard']);
        } else {
          this.router.navigate(['manager-section', res.uuid, 'dashboard']);
        }
      },
      error: () => {
        this.loginMessageStatus.set('failed');
        this.isLoading.set(false);
      },
    });
  }

  /**
   * Performs secure logout with complete session cleanup
   *
   * @description Terminates the user session by clearing authentication state, removing
   * stored credentials, and redirecting to the login page. This method ensures complete
   * security cleanup and prevents unauthorized access after logout.
   *
   * @returns {void}
   */
  logout(): void {
    this.user.set(null);
    this.writeToStorage(null);
    this.router.navigate([''], { replaceUrl: true });
  }
}
