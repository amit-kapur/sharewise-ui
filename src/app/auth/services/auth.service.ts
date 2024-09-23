import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { UserInterface } from '../types/user.interface';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { LoginRequestInterface } from '../types/loginRequest.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  firbaseAuth = inject(Auth);
  user$ = user(this.firbaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined);

  register(
   data: RegisterRequestInterface
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firbaseAuth,
      data.user.email,
      data.user.password
    ).then((response) =>
      updateProfile(response.user, { displayName: data.user.username })
    );

    return from(promise);
  }

  login(data: LoginRequestInterface): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firbaseAuth,
      data.user.email,
      data.user.password
    ).then(() => {});

    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firbaseAuth);

    return from(promise);
  }
}
