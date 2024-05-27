import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Import AngularFireAuth

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  email: string = '';
  password: string = '';  // Added to store the password input

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth // Inject AngularFireAuth
  ) {}

  onSignupWithEmail(): void {
    if (this.email && this.password) {
      this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
        .then(result => {
          console.log('User registered successfully!', result);
          // Navigate to another route upon successful registration
          this.router.navigate(['/profile']);
        })
        .catch(error => {
          console.error('Registration error:', error);
        });
    } else {
      console.log("Email or password is missing!");
    }
  }
}
