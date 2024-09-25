import { createFeature, createReducer, on } from '@ngrx/store';
import { userProfileActions } from './actions';
import { routerNavigatedAction } from '@ngrx/router-store';
import { UserProfileStateInterface } from '../types/userProfileState.interface';

const initialState: UserProfileStateInterface = {
  isLoading: false,
  data: null,
  error: '',
};

const userProfileFeature = createFeature({
  name: 'userProfile',
  reducer: createReducer(
    initialState,
    on(userProfileActions.getUserProfile, (state) => ({
      ...state,
      isLoading: true,
      error: '',
    })),
    on(userProfileActions.getUserProfileSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.userProfile,
    })),
    on(userProfileActions.getUserProfileFailure, (state) => ({
      ...state,
      isLoading: false,
      error: '',
    })),

    // Clean the validation errors, everytime we update the route.
    on(routerNavigatedAction, (state) => ({ ...state, validationErrors: null }))
  ),
});

export const {
  name: userProfileFeatureKey,
  reducer: userProfileReducer,
  selectData,
  selectIsLoading,
  selectError,
} = userProfileFeature;
