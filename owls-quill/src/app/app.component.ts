import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Importa FormsModule y ReactiveFormsModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Importa AngularFire y Firestore

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'owls-quill';
}
