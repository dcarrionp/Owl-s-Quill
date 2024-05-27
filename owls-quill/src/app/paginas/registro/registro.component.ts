import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {

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
    if (rawForm.password !== rawForm.cpassword) {
      console.error('Passwords do not match');
      return;
    }
    this.authService.register(rawForm.email, rawForm.username, rawForm.password).subscribe({
      next: () => {
        this.router.navigateByUrl('/home')
      },
      error: (err) => {
        this.errorMessage = err.code;
      },
    });
  }
}
