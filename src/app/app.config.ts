import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { ApiService } from './shared/services/api/api.service';
import { GlobalErrorHandlerService } from './shared/services/global-error-handler/global-error-handler.service';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: 'API', useValue: environment.api },
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    provideHttpClient(),
    provideRouter(routes),
    ApiService,
  ],
};
