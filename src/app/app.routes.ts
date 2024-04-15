import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Tesla Configurator',
    component: HomeComponent,
  },
  {
    path: '**',
    title: 'Tesla Configurator - Page not found',
    component: NotFoundComponent,
  },
];
