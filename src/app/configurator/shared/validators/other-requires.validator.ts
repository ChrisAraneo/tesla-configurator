import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isNull } from 'lodash';

export function createOthersRequiredValidator(otherControls: AbstractControl[]): ValidatorFn {
  return (): ValidationErrors | null => {
    if (otherControls.findIndex((control: AbstractControl) => isNull(control.value)) >= 0) {
      return {
        'others-required': true,
      };
    }

    return null;
  };
}
