import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InformacionService } from '../../services/informacion.service';
import Book from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { Storage, getDownloadURL, uploadBytes, listAll, deleteObject, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalago',
  templateUrl: './catalago.component.html',
  styleUrls: ['./catalago.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  standalone: true
})
export class CatalagoComponent implements OnInit {
  images: string[] = [];
  formulario: FormGroup;
  libros: Book[] = [];
  libroEnEdicion: Book | null = null;
  nombre: string = '';

  constructor(
    private informacionService: InformacionService,
    private storage: Storage,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      autor: ['', Validators.required],
      imagen: ['']
    });
  }

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.informacionService.getLibros().subscribe(libros => {
      this.libros = libros;
    });
  }

  filtro(): void {
    if (!this.nombre) {
      alert('Ingrese un nombre');
    } else {
      this.informacionService.getlibro(this.nombre).subscribe(libro => {
        this.libros = [libro];
      });
    }
  }

  removeBook(libro: string): void {
    this.informacionService.deleteLibro(libro).subscribe(() => {
      this.cargarLibros();
    });
  }

  async onSubmit(): Promise<void> {
    if (this.formulario.invalid) {
      return;
    }

    const libro: Book = {
      ...this.formulario.value
    };

    if (this.libroEnEdicion) {
      libro.id = this.libroEnEdicion.id;
      if (this.formulario.value.imagen) {
        const imageUrl = await this.uploadImage(this.formulario.value.imagen);
        libro.imagen = imageUrl;
      }
      await this.informacionService.updateLibro(libro);
    } else {
      if (this.formulario.value.imagen) {
        const imageUrl = await this.uploadImage(this.formulario.value.imagen);
        libro.imagen = imageUrl;
      }
      await this.informacionService.addLibro(libro);
    }

    this.formulario.reset();
    this.libroEnEdicion = null;
    this.cargarLibros();
  }

  uploadImage(event: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const file = event.target.files[0];
      if (file) {
        const storageRef = ref(this.storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
          (snapshot) => {
            // Handle progress if needed
          },
          (error) => {
            console.error(error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      } else {
        reject('No file selected');
      }
    });
  }

  edit(libro: Book): void {
    this.libroEnEdicion = libro;
    this.formulario.patchValue(libro);
  }

  delete(book: Book): void {
    console.log('Attempting to delete book:', book);
    if (book.nombre) {
      this.informacionService.deleteLibro(book.nombre).subscribe(() => {
        console.log('Book deleted successfully');
        this.cargarLibros();
      }, (error: any) => {
        console.error('Error deleting book:', error);
      });
    }
  }
}
