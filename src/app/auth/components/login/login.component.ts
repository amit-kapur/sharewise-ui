import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'sw-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class LoginComponent {

  fb = inject(FormBuilder)
  router = inject(Router)
  authService = inject(AuthService)
  errorMessage: string | null = null;

  form = this.fb.nonNullable.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
  })

  onSubmit(): void {
    console.log('login');
    const rawForm = this.form.getRawValue();
    this.authService.login(
      rawForm.email,
      rawForm.password
    ).subscribe({ next: () => this.router.navigateByUrl('/'), error: (err) => {
      this.errorMessage = err.code;
    }});
  }
}
