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
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment.development';


// TODO: Move into a seperate file...
export function localStorageSyncConfig(): LocalStorageConfig {
  return {
    keys: ['auth'], 
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
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
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
