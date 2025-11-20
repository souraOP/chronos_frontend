import { AbstractControl, ValidationErrors } from '@angular/forms';

export function reasonValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value: string = (control.value || '').trim();
  if (!value) {
    return null;
  }

  if (/^\d+$/.test(value)) {
    return { onlyNumbers: true };
  }

  // for alphanumeric
  if (/^[A-Za-z0-9]+$/.test(value)) {
    return { onlyAlphanumeric: true };
  }

  return null;
}
