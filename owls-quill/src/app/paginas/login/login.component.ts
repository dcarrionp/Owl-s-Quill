import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  fb = inject(FormBuilder);
  //http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    cpassword: ['', Validators.required],
  });

  errorMessage: string | null = null;

  onSubmit() {
    const rawForm = this.form.getRawValue();
    this.authService.login(
      rawForm.email, 
      rawForm.password
    ).subscribe({
      next: () => {
        this.router.navigateByUrl('/home')
      },
      error: (err) => {
        this.errorMessage = err.code;
      },
    });
  }

}