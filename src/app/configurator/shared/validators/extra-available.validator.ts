import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isNull } from 'lodash';
import { Options } from '../types/options.type';

export function createExtraAvailableValidator(
  options: Options | null,
  key: 'towHitch' | 'yoke',
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: boolean | null = control.value;

    if (value === null || (!isNull(options) && options[key].enabled)) {
      return null;
    } else {
      return {
        'extra-available': true,
      };
    }
  };
}
