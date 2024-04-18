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
    title: 'Tesla Configurator - Welcome',
    component: HomeComponent,
  },
  {
    // TODO Guards
    path: 'configurator',
    component: ConfiguratorComponent,
    children: [
      // TODO Guards
      {
        path: '1',
        title: 'Tesla Configurator - Step 1 - Choose model & color',
        component: ModelStepComponent,
      },
      {
        path: '2',
        canActivate: [canActivateConfigStep],
        title: 'Tesla Configurator - Step 2 - Select config & options',
        component: ConfigStepComponent,
      },
      {
        path: '3',
        canActivate: [canActivateSummaryStep],
        title: 'Tesla Configurator - Step 3 - Summary',
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
    title: 'Tesla Configurator - Forbidden',
    component: ForbiddenComponent,
  },
  {
    path: '**',
    title: 'Tesla Configurator - Page not found',
    component: NotFoundComponent,
  },
];
