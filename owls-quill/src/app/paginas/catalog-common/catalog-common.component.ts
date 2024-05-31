import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Book from '../../models/book.model';
import { InformacionService } from '../../services/informacion.service';


@Component({
  selector: 'app-catalog-common',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog-common.component.html',
  styleUrl: './catalog-common.component.scss'
})
export class CatalogCommonComponent {
  libros!: Book[];

  constructor(private informacionService: InformacionService) { }

  ngOnInit(): void {
    this.informacionService.getLibros().subscribe(libros => {
      this.libros = libros;
    })
  }
}
