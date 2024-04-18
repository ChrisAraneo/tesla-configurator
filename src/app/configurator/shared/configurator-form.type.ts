import { FormControl } from '@angular/forms';

export type ConfiguratorForm = {
  model: FormControl<string | null>;
  color: FormControl<string | null>;
  config: FormControl<string | null>;
  towHitch: FormControl<boolean | null>;
  yoke: FormControl<boolean | null>;
};
