import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequestInterface } from '../../types/loginRequest.interface';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/actions';

@Component({
  selector: 'sw-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  store = inject(Store);
  errorMessage: string | null = null;

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    const request: LoginRequestInterface = {
      user: this.form.getRawValue(),
    };

    this.store.dispatch(authActions.login({ request }));
  }
}
