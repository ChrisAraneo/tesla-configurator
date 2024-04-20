import { Routes } from '@angular/router';
import { ConfigStepComponent } from './configurator/config-step/config-step.component';
import { ConfiguratorComponent } from './configurator/configurator.component';
import { ModelStepComponent } from './configurator/model-step/model-step.component';
import { SummaryStepComponent } from './configurator/summary-step/summary-step.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { canActivateConfigStep } from './shared/guards/can-activate-config-step.guard';
import { canActivateSummaryStep } from './shared/guards/can-activate-summary-step.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Welcome - Tesla Configurator',
    component: HomeComponent,
  },
  {
    path: 'configurator',
    component: ConfiguratorComponent,
    children: [
      {
        path: '1',
        title: 'Step 1 - Choose model & color - Tesla Configurator',
        component: ModelStepComponent,
      },
      {
        path: '2',
        canActivate: [canActivateConfigStep],
        title: 'Step 2 - Select config & options - Tesla Configurator',
        component: ConfigStepComponent,
      },
      {
        path: '3',
        canActivate: [canActivateSummaryStep],
        title: 'Step 3 - Summary - Tesla Configurator',
        component: SummaryStepComponent,
      },
      {
        path: '',
        pathMatch: 'prefix',
        redirectTo: '1',
      },
    ],
  },
  {
    path: 'forbidden',
    title: 'Forbidden - Tesla Configurator',
    component: ForbiddenComponent,
  },
  {
    path: '**',
    title: 'Page not found - Tesla Configurator',
    component: NotFoundComponent,
  },
];
