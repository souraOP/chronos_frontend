import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { ChangePasswordService } from '../../../../shared/services/change-password.service';
import { MatchPasswordValidator } from '../../../../validators/match-password.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';
import { ChangePasswordDTO } from '../../../models/auth.model';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  private changePasswordService = inject(ChangePasswordService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(AuthService);
  changePasswordForm: FormGroup;
  isLoading = false;

  public email: string = '';

  constructor() {
    this.changePasswordForm = new FormGroup(
      {
        newPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      {
        validators: [MatchPasswordValidator],
      }
    );
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const qpEmail = params['email'];

      if (qpEmail) {
        this.email = qpEmail;
      } else {
        const user = this.auth.getUser();
        if (user?.email) {
          this.email = user.email;
        } else {
          console.error('No user identified.');
          alert('No user identified. Cannot change password.');
          this.router.navigate(['login']);
        }
      }
    });
  }

  onClickChangePasswordSubmit() {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }
    if (!this.email) {
      console.error('User ID or Role is missing, cannot update password.');
      alert('Email not available, cannot update password');
      return;
    }

    const { newPassword, confirmPassword } = this.changePasswordForm.value as ChangePasswordDTO;
    const payload: ChangePasswordDTO = { newPassword, confirmPassword };

    this.changePasswordService.changePassword(this.email, payload).subscribe({
      next: (response) => {
        alert(response?.message || 'Password changed successfully !');
        this.auth.logout();
      },
      error: (error) => {
        console.error('Failed to change password', error);
        const msg = error?.error?.message || 'Failed to change password. Please ensure passwords match and try again.';
        alert(msg);
      },
      complete: () => {
        this.isLoading = false;
        this.changePasswordForm.reset();
      },
    });
  }
}
