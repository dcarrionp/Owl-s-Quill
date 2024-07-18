import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Book from '../../models/book.model';
import { InformacionService } from '../../services/informacion.service';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss'
})
export class HistorialComponent {
  libros!: Book[];

  constructor(private informacionService: InformacionService){}

  ngOnInit():void{
    this.informacionService.getLibros().subscribe(libros =>{
      this.libros = libros;
    })
  }
}
