import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  email: string = '';

  constructor(private router: Router) {}

  onSignupWithEmail(): void {
    console.log("Navigating to registration page");
    this.router.navigate(['/register'], { queryParams: { email: this.email } });
  }
}
