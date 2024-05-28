import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.scss']
})
export class RegFormComponent implements OnInit {
  form: FormGroup;
  router = inject(Router);

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      try {
        const docRef = await addDoc(collection(this.firestore, 'users'), this.form.value);
        console.log('Document written with ID: ', docRef.id);
        this.router.navigateByUrl('/home')

      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }

    
  }
}
