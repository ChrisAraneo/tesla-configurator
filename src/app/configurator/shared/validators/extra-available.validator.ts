import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isNull } from 'lodash';

export function createExtraAvailableValidator(isAvailable: boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (isNull(control.value) || isAvailable) {
      return null;
    } else {
      return {
        'extra-available': true,
      };
    }
  };
}
