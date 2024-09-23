
import { createFeature, createReducer, on } from '@ngrx/store';
import { authActions } from './actions';
import { routerNavigatedAction } from '@ngrx/router-store';
import { AuthStateInterface } from '../types/authState.interface';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  // currentUser: undefined,
  validationErrors: null,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),

    on(authActions.registerSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })),

    on(authActions.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),

    on(authActions.login, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),

   

    on(routerNavigatedAction, (state) => ({...state, validationErrors: null}))
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  // selectIsSubmitting,
  // selectIsLoading,
  // selectCurrentUser,
  // selectValidationErrors,
} = authFeature;
