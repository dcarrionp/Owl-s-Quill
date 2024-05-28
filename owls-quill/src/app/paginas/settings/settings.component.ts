import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../domain/user.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  user$: Observable<any>;
  currentUser: any = null; // Inicializar currentUser como null

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.settingsForm = this.fb.group({
      username: [''],
      email: [''],
      password: [''] // Agregamos un campo para la contraseña actual
    });
    this.user$ = this.authService.user$;
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (user) {
        this.currentUser = user; // Guardamos el usuario actual
        this.settingsForm.patchValue({
          username: user.displayName || '',
          email: user.email || ''
        });
      }
    });
  }

  onSubmit(): void {
    if (this.settingsForm.valid && this.currentUser) {
      const { username, email, password } = this.settingsForm.value;

      if (!password) {
        console.error('Password is required for reauthentication');
        return;
      }

      // Reautenticamos al usuario antes de realizar los cambios
      this.authService.reauthenticate(this.currentUser.email, password).subscribe({
        next: () => {
          console.log('User reauthenticated, updating profile...');
          this.authService.updateUserProfile(username).subscribe({
            next: () => {
              console.log('Username updated successfully');
              if (email !== this.currentUser.email) {
                this.authService.sendVerificationEmail(email).subscribe({
                  next: () => {
                    console.log('Verification email sent. Please verify your new email.');
                  },
                  error: (error) => {
                    console.error('Error sending verification email', error);
                  }
                });
              }
            },
            error: (error) => {
              console.error('Error updating username', error);
            }
          });
        },
        error: (error) => {
          console.error('Error reauthenticating user', error);
        }
      });
    } else {
      console.error('User is not logged in or form is invalid.');
    }
  }
}
