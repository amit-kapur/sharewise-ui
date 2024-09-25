import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../auth/store/reducer';
import { combineLatest, filter, Subscription } from 'rxjs';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../../settings/store/reducer';
import { CommonModule } from '@angular/common';
import { BackendErrorMessagesComponent } from '../../../shared/components/backendErrorMessages/backendErrorMessages.component';
import { CurrentUserRequestInterface } from '../../../shared/types/currentUserRequest.interface';
import { authActions } from '../../../auth/store/actions';

@Component({
  selector: 'sw-settings',
  templateUrl: './settings.component.html',
  standalone: true,
  imports: [CommonModule, BackendErrorMessagesComponent, ReactiveFormsModule],
})
export class SettingsComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder);
  store = inject(Store);

  currentUser?: CurrentUserInterface;
  currentUserSubscription?: Subscription; // to unsubscribe from observalues. 
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  form = this.fb.nonNullable.group({
    image: '',
    displayName: '',
    email: '',
    password: '',
  });

  ngOnInit(): void {
    this.currentUserSubscription = this.store
      .pipe(
        select(selectCurrentUser),
        filter(Boolean) // filter boolean - filter null and undefined.
      )
      .subscribe((currentUser) => {
        this.currentUser = currentUser;
        this.initializeForm();
      });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription?.unsubscribe();
  }

  initializeForm(): void {
    if (!this.currentUser) {
      throw new Error('current user is not set');
    }

    this.form.patchValue({
      displayName: this.currentUser?.displayName,
      email: this.currentUser?.email,
    });
  }

  onSubmit(): void {
    if (!this.currentUser) {
      throw new Error('current user is not set');
    }

    const currentUserRequest: CurrentUserRequestInterface = {
        user: {
            ...this.currentUser, 
            ...this.form.getRawValue()
        }
    }

    // TODO 

    console.log('update settings', currentUserRequest);
  }

  onLogout(): void {
    this.store.dispatch(authActions.logout());
  }
}
