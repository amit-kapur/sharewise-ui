import { createFeature, createReducer, on } from "@ngrx/store";
import { SettingsStateInterface } from "../types/settingsState.interface";
import { authActions } from "../../../../src/app/auth/store/actions";
import { routerNavigatedAction } from "@ngrx/router-store";


const initialState: SettingsStateInterface = { 
    isSubmitting: false,
    validationErrors: null
}

const settingsFeature = createFeature({
    name: 'settings',
    reducer: createReducer(
        initialState, 
        on(authActions.getCurrentUser, (state) => ({
            ...state,
            isSubmitting: true,
            validationErrors: null,
          })),
          on(authActions.getCurrentUserSuccess, (state, action) => ({
            ...state,
            isSubmitting: false,
            currentUser: action.currentUser,
          })),
          on(authActions.getCurrentUserFailure, (state, action) => ({
            ...state,
            isSubmitting: false,
            // validationErrors: action.errors, // TODO
          })),

          // Clean the validation errors, everytime we update the route. 
    on(routerNavigatedAction, (state) => ({...state, validationErrors: null}))
    )
})


export const {
    name: settingsFeatureKey,
    reducer: settingsReducer,
    selectIsSubmitting,
    selectValidationErrors,
  } = settingsFeature;
  