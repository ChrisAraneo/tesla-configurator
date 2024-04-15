import { Routes } from '@angular/router';
import { ConfiguratorComponent } from './configurator/configurator.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Tesla Configurator',
    component: HomeComponent,
  },
  {
    path: 'configurator/:step',
    title: 'Tesla Configurator - Choose model & color',
    component: ConfiguratorComponent,
  },
  {
    path: 'configurator',
    redirectTo: 'configurator/1',
  },
  {
    path: '**',
    title: 'Tesla Configurator - Page not found',
    component: NotFoundComponent,
  },
];
