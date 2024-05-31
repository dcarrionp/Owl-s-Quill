import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InformacionService } from '../../services/informacion.service';
import Book from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { Storage, getDownloadURL, uploadBytes, listAll, deleteObject, ref } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { NavigationEnd, Router } from '@angular/router';



@Component({
  selector: 'app-catalago',
  templateUrl: './catalago.component.html',
  styleUrls: ['./catalago.component.scss'],
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true
})
export class CatalagoComponent {
  authService = inject(AuthService);
  userRole!: string;
  showAdminControls: boolean = true;

  images: string[];
  formulario: FormGroup;
  libros!: Book[];
  libroEnEdicion: Book | null = null;

  constructor(
    private informacionService: InformacionService,
    private storage: Storage,
    private router: Router
  ) {
    this.formulario = new FormGroup({
      nombre: new FormControl(),
      precio: new FormControl(),
      autor: new FormControl(),
      imagen: new FormControl()
    });
    this.images = [];
  }

  ngOnInit(): void {
    this.informacionService.getLibros().subscribe(libros => {
      this.libros = libros;
    });

    this.getImages();

    this.authService.getStatus().subscribe((role: string) => {
      this.userRole = role;
      this.showAdminControls = (role === 'admin'); // Mostrar controles de admin si el rol es admin
    });

    // Suscripción a los eventos de navegación para la lógica de mostrar controles de admin
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showAdminControls = this.isAdmin();
      }
    });

  }

  isAdmin(): boolean {
    return this.userRole === 'admin';
  }

  isClient(): boolean {
    return this.userRole === 'common';
  }

  async onSubmit() {
    const libro: Book = {
      nombre: this.formulario.get('nombre')?.value,
      precio: this.formulario.get('precio')?.value,
      autor: this.formulario.get('autor')?.value,
      imagen: this.formulario.get('imagen')?.value
    };

    if (this.libroEnEdicion) {
      // Actualizar libro existente
      libro.id = this.libroEnEdicion.id;
      const response = await this.informacionService.updateLibro(libro);
      console.log(response);
    } else {
      // Crear nuevo libro
      const response = await this.informacionService.addLibro(libro);
      console.log(response);
    }

    this.formulario.reset();
    this.libroEnEdicion = null; // Reiniciar el libro en edición
    this.getImages();
  }

  async delete(libro: Book) {
    const response = await this.informacionService.deleteLibro(libro);
    console.log(response);

    if (libro.imagen) {
      const imgRef = ref(this.storage, libro.imagen);
      await deleteObject(imgRef)
        .then(() => console.log("Imagen eliminada de Firebase Storage"))
        .catch(error => console.log("Error al eliminar la imagen de Firebase Storage", error));
    }
  }

  uploadImage($event: any) {
    const file = $event.target.files[0];
    console.log(file);

    const imgRef = ref(this.storage, `images/${file.name}`);

    uploadBytes(imgRef, file)
      .then(async response => {
        console.log(response);
        const url = await getDownloadURL(imgRef);
        this.formulario.patchValue({ imagen: url }); // Actualizar el valor del control 'imagen' en el formulario
      })
      .catch(error => console.log(error));
  }

  getImages() {
    const imagesRef = ref(this.storage, 'images');
    listAll(imagesRef)
      .then(async response => {
        console.log(response);
        this.images = [];
        for (let item of response.items) { // Recorrer y obtener los items
          const url = await getDownloadURL(item);
          this.images.push(url);
        }
      })
      .catch(error => console.log(error));
  }

  edit(libro: Book) {
    this.libroEnEdicion = libro;
    this.formulario.patchValue({
      nombre: libro.nombre,
      precio: libro.precio,
      autor: libro.autor,
      imagen: libro.imagen
    });
  }
}
