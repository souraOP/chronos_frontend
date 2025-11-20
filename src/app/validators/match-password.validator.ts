import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const MatchPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const newPassword = control.get('newPassword');
  const confirmPassword = control.get('confirmPassword');

  return newPassword?.value &&
    confirmPassword?.value &&
    newPassword?.value === confirmPassword?.value
    ? null
    : { matchPassword: true };
};
