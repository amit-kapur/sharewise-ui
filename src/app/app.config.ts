import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import {
  ActionReducer,
  MetaReducer,
  provideState,
  provideStore,
} from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import * as authEffects from './auth/store/effects';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideEffects } from '@ngrx/effects';
import { authFeatureKey, authReducer } from './auth/store/reducer';
import { localStorageSync, LocalStorageConfig } from 'ngrx-store-localstorage';

// config copied from firebase console during app setup. 
const firebaseConfig = {
  apiKey: 'AIzaSyCHnPkTD3CJfxCxOy2JWtTGb9G4yUHs4pQ',
  authDomain: 'sharewise-ai.firebaseapp.com',
  projectId: 'sharewise-ai',
  storageBucket: 'sharewise-ai.appspot.com',
  messagingSenderId: '239879491546',
  appId: '1:239879491546:web:8503b758db0c7e077bbae3',
  measurementId: 'G-KHQM38S4BK',
};

export function localStorageSyncConfig(): LocalStorageConfig {
  return {
    keys: ['auth', 'settings'], 
    rehydrate: true,
    checkStorageAvailability: true,
  };
}

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync(localStorageSyncConfig())(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideStore({
      router: routerReducer,
    },
    {
			metaReducers,
			runtimeChecks: {
				strictStateImmutability: true,
				strictActionImmutability: true,
				strictStateSerializability: true,
				strictActionSerializability: true,
				strictActionWithinNgZone: true,
				strictActionTypeUniqueness: true
			}
		}),
    provideEffects(authEffects),
    provideState(authFeatureKey, authReducer),
    provideRouterStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
};
