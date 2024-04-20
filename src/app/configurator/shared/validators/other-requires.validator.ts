import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isNull } from 'lodash';

export function createOthersRequiredValidator(otherControls: AbstractControl[]): ValidatorFn {
  return (): ValidationErrors | null => {
    if (otherControls.map((control) => isNull(control.value)).findIndex((isNull) => isNull) >= 0) {
      return {
        'others-required': true,
      };
    } else {
      return null;
    }
  };
}
