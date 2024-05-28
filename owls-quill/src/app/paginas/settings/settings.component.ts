import { Component, Input, OnInit } from '@angular/core';
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
        this.currentUser = user;
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

    }
  }
}
