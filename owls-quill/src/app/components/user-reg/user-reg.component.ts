import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-reg',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Import ReactiveFormsModule here
  templateUrl: './user-reg.component.html',
  styleUrls: ['./user-reg.component.scss'] // Corrected from 'styleUrl' to 'styleUrls'
})

@Injectable({
  providedIn: 'root'
})

export class UserRegComponent implements OnInit {
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    return this.http.post('/api/register', userData);
  }

  ngOnInit(): void {
    // Form initialization if needed
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Form Data:', this.registerForm.value);
      // Implement your registration logic here
    }
  }
}
