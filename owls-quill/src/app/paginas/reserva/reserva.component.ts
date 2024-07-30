
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import Book from '../../models/book.model';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.scss'
})
export class ReservaComponent {
  
}
