import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: String = '';
  password: String = '';

  constructor(private router: Router) {}

    onLogin(): void {
        console.log('Logging in with:', this.email, this.password);
        this.router.navigate(['/home']);
    }

    onSignUp(): void {
        this.router.navigate(['/signup']);
    }
}
