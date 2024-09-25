// import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { UserProfileInterface } from '../types/userProfile.interface';
import { GetUserProfileResponseInterface } from '../types/getUserProfileResponse.interface';


@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
 // http = inject(HttpClient);

  getUserProfile(uid: string): Observable<UserProfileInterface> {

    // TODO: Get User Profile from firebase...
    
    const userTest: GetUserProfileResponseInterface = {
      userProfile: {
        displayName: 'Test User',
      },
    };

    return of(userTest).pipe(map((profile) => profile.userProfile));
  }
}
