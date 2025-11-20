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

  private readonly storageKey = 'auth';

  public isLoading = signal<boolean>(false);
  public loginMessageStatus = signal<LoginMessageStatus>(null);
  public loginSubscription: Subscription | null = null;

  private user = signal<AuthUser | null>(this.readFromStorage());
  public isAuthenticated = computed(() => !!this.user());

  constructor(private router: Router) {}

  private readFromStorage(): AuthUser | null {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  }

  private writeToStorage(user: AuthUser | null) {
    if (user) {
      localStorage.setItem(this.storageKey, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.storageKey);
    }
  }

  getUser(): AuthUser | null {
    return this.user();
  }

  getToken(): string | null {
    return this.user()?.token ?? null;
  }

  isLoadingFunc() {
    return this.isLoading;
  }

  logInMessageStatusFunc() {
    return this.loginMessageStatus;
  }

  // ROLE based login
  login(loginForm: FormGroup, role: 'Employee' | 'Manager' = 'Employee') {
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

  logout() {
    this.user.set(null);
    this.writeToStorage(null);
    this.router.navigate([''], { replaceUrl: true });
  }
}
