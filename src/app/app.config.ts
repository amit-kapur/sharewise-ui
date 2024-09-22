import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCHnPkTD3CJfxCxOy2JWtTGb9G4yUHs4pQ',
  authDomain: 'sharewise-ai.firebaseapp.com',
  projectId: 'sharewise-ai',
  storageBucket: 'sharewise-ai.appspot.com',
  messagingSenderId: '239879491546',
  appId: '1:239879491546:web:8503b758db0c7e077bbae3',
  measurementId: 'G-KHQM38S4BK',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
  ],
};
