import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import Book from '../../models/book.model';
import { InformacionService } from '../../services/informacion.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { or } from 'firebase/firestore';
import Categoria from '../../domain/categoria';
import { getDownloadURL, listAll, ref, Storage } from '@angular/fire/storage';
import { ReservaComponent } from '../reserva/reserva.component';
import { AuthService } from '../../services/auth.service';
import { LibroServiceService } from '../../services/libro-service.service';


@Component({
  selector: 'app-catalog-common',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ReservaComponent],
  templateUrl: './catalog-common.component.html',
  styleUrl: './catalog-common.component.scss'
})
export class CatalogCommonComponent {
  searchTerm: string = '';
  images: string[];
  libros!: Book[];
  librosFiltrados: Book[] = []; // Asegúrate de inicializar con tus datos
  mostrarModal: boolean = false;
  libroSeleccionado: Book | null = null;
  userId: string | undefined;
  categorias: Categoria[] = [
    { nombre: 'Autores' },
    { nombre: 'Titulos' },
    { nombre: 'Disponibilidad' },
    { nombre: 'Categoria' }
  ];
  categoriasDisponibles: Categoria[] = [];
  autores: string[] = [];
  mostrarAutores = false;
  mostrarCategorias = false;
  mostrarFiltro = false;
  isSmallScreen = window.innerWidth < 768; // Detecta si la pantalla es pequeña

  constructor(
    private informacionService: InformacionService,
    private storage: Storage,
    private authService: AuthService,
    private libroService: LibroServiceService
  ) {
    this.images = [];
  }

  ngOnInit(): void {
    this.informacionService.getLibros().subscribe(libros => {
      this.libros = libros;
      this.librosFiltrados = libros; // Inicialmente mostrar todos los libros
      this.autores = [...new Set(libros.map(libro => libro.autor))]; // Obtener lista única de autores
    });

    this.getImages();
    this.userId = this.authService.getUser();
  }

  // Función para manejar la búsqueda
  onSearch() {
    if (this.searchTerm) {
      this.librosFiltrados = this.libros.filter(libro =>
        libro.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        libro.autor.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.librosFiltrados = this.libros; // Mostrar todos los libros si no hay término de búsqueda
    }
  }

  // Obtener imágenes
  getImages() {
    const imagesRef = ref(this.storage, 'images');
    listAll(imagesRef)
      .then(async response => {
        this.images = [];
        for (let item of response.items) {
          const url = await getDownloadURL(item);
          this.images.push(url);
        }
      })
      .catch(error => console.log(error));
  }

  // Funciones de filtrado
  toggleMostrarFiltro() {
    this.mostrarFiltro = !this.mostrarFiltro;
  }

  filtrarPorCategoria(categoria: any): void {
    switch (categoria.nombre) {
      case 'Autores':
        this.toggleMostrarAutores();
        break;
      case 'Titulos':
        this.filtrarPorTitulo();
        break;
      case 'Disponibilidad':
        this.filtrarPorDisponibilidad();
        break;
      case 'Categoria':
        this.toggleMostrarCategorias();
        break;
      default:
        this.librosFiltrados = this.libros;
    }
  }

  filtrarPorTitulo() {
    this.librosFiltrados = this.libros.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  filtrarPorDisponibilidad() {
    this.librosFiltrados = this.libros.filter(libro => libro.disponibilidad);
  }

  toggleMostrarAutores() {
    this.mostrarAutores = !this.mostrarAutores;
  }

  toggleMostrarCategorias() {
    this.mostrarCategorias = !this.mostrarCategorias;
  }

  filtrarPorAutorEspecifico(autor: string): void {
    this.librosFiltrados = this.libros.filter(libro => libro.autor === autor);
    this.mostrarAutores = false;
  }

  filtrarPorCategoriaEspecifica(categoria: Categoria): void {
    this.librosFiltrados = this.libros.filter(libro => libro.categoriaNombre === categoria.nombre);
    this.mostrarCategorias = false;
  }

  seleccionarLibro(libro: Book): void {
    this.libroService.seleccionarLibro(libro);
    
  }
}
