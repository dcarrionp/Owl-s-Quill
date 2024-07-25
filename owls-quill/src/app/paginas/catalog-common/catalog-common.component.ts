import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Book from '../../models/book.model';
import { InformacionService } from '../../services/informacion.service';
import { FormsModule } from '@angular/forms';
import { or } from 'firebase/firestore';


@Component({
  selector: 'app-catalog-common',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalog-common.component.html',
  styleUrl: './catalog-common.component.scss'
})
export class CatalogCommonComponent {
  libros!: Book[];
  nombre: any
  libro!: Book

  categories: string[] = [];
  dropdownOpen = false;

  constructor(private informacionService: InformacionService) { }

  ngOnInit(): void {
    this.informacionService.getLibros().subscribe(libros => {
      this.libros = libros;
    })
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  filtro() {
    if (this.nombre === '' || this.nombre === undefined) {
      console.log('vacio')
      alert('Ingrese un nombre')
    } else {
      this.informacionService.getlibro(this.nombre).subscribe(libros => {
        this.libro = libros
        this.libros = []
        this.libros.push(this.libro)
        console.log(this.libros)
      })
    }
  }

}
