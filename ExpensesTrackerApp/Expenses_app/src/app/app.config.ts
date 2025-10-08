import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { DEFAULT_CURRENCY_CODE } from '@angular/core';
import localeEnIn from '@angular/common/locales/en-IN';
import { authInterceptor } from './interceptors/auth.interceptor';

// Register Indian English locale data so Angular pipes (currency, number, date) use en-IN rules
registerLocaleData(localeEnIn, 'en-IN');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    { provide: LOCALE_ID, useValue: 'en-IN' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'INR' }
  ]
};
