import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-employee-login-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-login-page.component.html',
  styleUrl: './employee-login-page.component.css',
})
export class EmployeeLoginPageComponent {
  loginForm: FormGroup;
  private authService = inject(AuthService);

  public isLoading = this.authService.isLoading;
  public loginMessageStatus = this.authService.loginMessageStatus;

  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }


  onClickBackButton(): void {
    this.router.navigate(['/']);
  }

  // navigate to manager login screen
  onClickManagerAccess(): void {
    this.router.navigate(['/manager-login']);
  }

  onClickForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  onClickLogin() {
    this.authService.login(this.loginForm, 'Employee');
  }
}
