import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ForgotPasswordService } from '../../../shared/services/forgot-password.service';

@Component({
  selector: 'app-forgot-password-page',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.css'],
})
export class ForgotPasswordPageComponent implements OnInit {
  private router = inject(Router);
  private forgotPasswordService = inject(ForgotPasswordService);

  isLoading = false;
  userNotFound = false;

  forgotForm!: FormGroup;

  ngOnInit(): void {
    this.forgotForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }


  backToLogin() {
    this.router.navigate(['login']);
  }


  onSubmitForm() {
    if(this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.userNotFound = false;

    const userEmail: string = this.forgotForm.value.email;

    this.forgotPasswordService.isEmailPresent(userEmail).subscribe({
      next: (res) => {
        if(res) {
          this.userNotFound = false;
          this.router.navigate(['change-password'], {
            queryParams: {email: `${encodeURIComponent(this.forgotForm.value.email)}`}
          });
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error("User not found", err);
        this.isLoading = false;
        this.userNotFound = true;
      }
    });
  }
}
