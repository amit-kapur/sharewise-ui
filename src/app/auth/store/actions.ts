import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { LoginRequestInterface } from '../types/loginRequest.interface';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { BackendErrorsInterface } from '../../shared/types/backendErrors.interface';


export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    'register success': props<{ currentUser: CurrentUserInterface }>(),
    'register failure': props<{ errors: BackendErrorsInterface }>(),

    Login: props<{ request: LoginRequestInterface }>(),
    'login success': props<{ currentUser: CurrentUserInterface }>(),
    'login failure': props<{ errors: BackendErrorsInterface }>(),

    Logout: emptyProps(),

    'Get current user': emptyProps(),
    'Get current user success': props<{
      currentUser: CurrentUserInterface | null | undefined;
    }>(),
    'Get current user failure': emptyProps(),

    'Update current user': emptyProps(),
    'Update current user success': props<{
      currentUser: CurrentUserInterface | null | undefined;
    }>(),
    'Update current user failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
