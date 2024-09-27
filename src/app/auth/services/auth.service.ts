import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
  UserCredential,
} from '@angular/fire/auth';
import { from, Observable, of } from 'rxjs';
import { UserInterface } from '../types/user.interface';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { LoginRequestInterface } from '../types/loginRequest.interface';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { CurrentUserRequestInterface } from '../../shared/types/currentUserRequest.interface';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {
  firestore: Firestore = inject(Firestore);
  firbaseAuth = inject(Auth);
  user$ = user(this.firbaseAuth);
  currentUserSig = signal<CurrentUserInterface | null | undefined>(undefined);

  getCurrentUser(): Observable<CurrentUserInterface | null | undefined> {
    return of(this.currentUserSig());
  }

  register(data: RegisterRequestInterface): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firbaseAuth,
      data.user.email,
      data.user.password
    ).then((response) => {
      updateProfile(response.user, { displayName: data.user.username });

      const portfolios = collection(
        this.firestore,
        'Users',
        response.user.uid,
        'Portfolio'
      );
      addDoc(portfolios, {
        name: 'Default',
        createdOn: Date.now()
      });
    });

    return from(promise);
  }

  login(data: LoginRequestInterface): Observable<UserCredential> {
    return from(
      signInWithEmailAndPassword(
        this.firbaseAuth,
        data.user.email,
        data.user.password
      )
    );
  }

  logout(): Observable<void> {
    const promise = signOut(this.firbaseAuth);
    this.currentUserSig.set(null);

    return from(promise);
  }

  // updateCurrentUser(
  //   currentUser: UserCredential,
  //   currentUserRequestInterface: CurrentUserRequestInterface
  // ): Observable<UserCredential> {
  //   // return from(
  //   //   updateCurrentUser(currentUser.user, {
  //   //     // email: currentUserRequestInterface.user.email,
  //   //     // password: currentUserRequestInterface.user.password,
  //   //     displayName: currentUserRequestInterface.user.displayName,
  //   //   })
  //   );
  // }
}
