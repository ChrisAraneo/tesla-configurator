import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isEqual, isUndefined } from 'lodash';

export function createValueValidator<T>(correctValues: T[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: T | null = control.value;

    if (value === null || !isUndefined(correctValues.find((item) => isEqual(item, value)))) {
      return null;
    } else {
      return {
        value: true,
      };
    }
  };
}
