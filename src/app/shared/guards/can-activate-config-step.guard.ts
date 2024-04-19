import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { first, map, mergeMap } from 'rxjs';
import { ConfiguratorService } from '../../configurator/configurator.service';

export const canActivateConfigStep: CanActivateFn = () => {
  const service: ConfiguratorService = inject(ConfiguratorService);
  const router: Router = inject(Router);

  return service.disabledSteps.pipe(
    map((value) => value[2]),
    first(),
    mergeMap((isDisabled: boolean): Promise<boolean> => {
      if (isDisabled) {
        return router.navigate(['forbidden']);
      } else {
        return Promise.resolve(true);
      }
    }),
  );
};
