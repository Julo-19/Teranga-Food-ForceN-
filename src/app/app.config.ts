import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
// rendre la date en format français
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {provide:LocationStrategy,useClass:HashLocationStrategy},
    provideClientHydration(),provideHttpClient(),
    {provide: LOCALE_ID, useValue: 'fr' }
  ]
};
