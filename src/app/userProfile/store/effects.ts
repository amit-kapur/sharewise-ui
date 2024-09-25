import { HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, of } from "rxjs";
import { PersistenceService } from "../../shared/services/persistence.service";
import { userProfileActions } from "./actions";
import { UserProfileService } from "../service/userProfile.service";
import { UserProfileInterface } from "../types/userProfile.interface";



export const userProfileEffect = createEffect(
    (
      actions$ = inject(Actions),
      userProfileService = inject(UserProfileService),
      persistenceService = inject(PersistenceService)
    ) => {
      return actions$.pipe(
        ofType(userProfileActions.getUserProfile),
        switchMap(({ slug }) => {
          return userProfileService.getUserProfile(slug).pipe(
            map((user) => {
              const userProfile: UserProfileInterface = {
                displayName: user.displayName
              };
              persistenceService.set('userProfile', { userProfile });
              return userProfileActions.getUserProfileSuccess({ userProfile });
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return of(
                userProfileActions.getUserProfileFailure()
              );
            })
          );
        })
      );
    },
    { functional: true }
  );
  
//   export const redirectAfterRegisterEffect = createEffect(
//     (actions$ = inject(Actions), router = inject(Router)) => {
//       return actions$.pipe(
//         ofType(userProfileActions.registerSuccess),
//         tap(() => {
//           router.navigateByUrl('/');
//         })
//       );
//     },
//     {
//       functional: true,
//       dispatch: false,
//     }
//   );