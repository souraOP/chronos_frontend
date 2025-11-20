import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-manager-login-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './manager-login-page.component.html',
  styleUrl: './manager-login-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerLoginPageComponent {
  managerLoginForm: FormGroup;
  private authService = inject(AuthService);


  public isLoading= this.authService.isLoadingFunc();
  public loginMessageStatus=this.authService.logInMessageStatusFunc();

  constructor(private router: Router) {
    this.managerLoginForm = new FormGroup({
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

  onClickLogo() {
    this.router.navigate(['/']);
  }

  onClickManagerLogin() {
    this.authService.login(this.managerLoginForm, 'Manager');
  }

  onClickForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}
