import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { authActions } from '../../store/actions';
import { Store } from '@ngrx/store';


@Component({
  selector: 'sw-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class RegisterComponent {

  fb = inject(FormBuilder)
  router = inject(Router)
  authService = inject(AuthService);
  store = inject(Store);
  errorMessage: string | null = null;

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    console.log('register');
    // const rawForm = this.form.getRawValue();
    // this.authService.register(
    //   rawForm.email,
    //   rawForm.username,
    //   rawForm.password
    // ).subscribe({ next: () => this.router.navigateByUrl('/'), error: (err) => {
    //   this.errorMessage = err.code;
    // }});

    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    };

    this.store.dispatch(authActions.register({ request }));
  }
}

