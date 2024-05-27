import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';
import { Book } from '../../models/book.model';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalago',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './catalago.component.html',
  styleUrl: './catalago.component.scss'
})
export class CatalagoComponent {
  
}
