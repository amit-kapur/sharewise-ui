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
    'register failure': props<{errors: BackendErrorsInterface}>(),

    Login: props<{ request: LoginRequestInterface }>(),
    'login success': emptyProps(),
    'login failure': props<{errors: BackendErrorsInterface}>(),

  },
});
