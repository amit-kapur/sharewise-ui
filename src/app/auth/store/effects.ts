import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { PersistenceService } from '../../shared/services/persistence.service';
import { authActions } from './actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserCredential } from '@angular/fire/auth';

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistenceService = inject(PersistenceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({ request }) => {
        return authService.register(request).pipe(
          map(() => {
            const currentUser: CurrentUserInterface = {
              uid: '',
              email: request.user.email,
              displayName: request.user?.username || '',
            };
            persistenceService.set('currentUser', { currentUser });
            return authActions.registerSuccess({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.registerFailure({
                errors: { errorMessage: errorResponse.message },
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const redirectAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => {
        router.navigateByUrl('/');
      })
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);

export const loginEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap(({ request }) => {
        return authService.login(request).pipe(
          map((userCredential: UserCredential) => {
            const currentUser: CurrentUserInterface = {
              uid: userCredential.user.uid,
              email: userCredential.user.email!,
              displayName: userCredential.user.displayName || '',
            };
            return authActions.loginSuccess({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.loginFailure({
                errors: { errorMessage: errorResponse.message },
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const redirectAfterLoginEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.loginSuccess),
      tap(() => {
        router.navigateByUrl('dashboard');
      })
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);


export const logoutEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.logout),
      tap(() => {
          authService.logout().pipe(
          map(() => {
            router.navigateByUrl('/');
          }))
        
      })
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);

export const getCurrentUserEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.getCurrentUser),
      switchMap(() => {
        return authService.getCurrentUser().pipe(
          map((currentUser) => {
            return authActions.getCurrentUserSuccess({ currentUser });
          }),
          catchError(() => {
            return of(authActions.getCurrentUserFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
