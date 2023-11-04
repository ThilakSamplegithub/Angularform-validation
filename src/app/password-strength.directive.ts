import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appPasswordStrengthValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordStrengthValidatorDirective, multi: true }]
})
export class PasswordStrengthValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasDigit = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value);

    const isValid = hasUppercase && hasLowercase && hasDigit && hasSpecialChar;

    if (!isValid) {
      return { passwordStrength: true };
    }

    return null;
  }
}
