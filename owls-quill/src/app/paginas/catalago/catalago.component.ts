import { Component } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-catalago',
  templateUrl: './catalago.component.html',
  styleUrls: ['./catalago.component.scss'],
  imports:[FormsModule, CommonModule],
  standalone: true
})
export class CatalagoComponent {

  books: Book[] = [];
  newBook: Book = { title: '', coverUrl: '' };
  selectedFile: File | null = null;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
    });
  }

  cargarImagen(event: any) {
    this.selectedFile = event.target.files[0];
  }

  agregarLibro() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const coverUrl = reader.result as string;
        this.newBook.coverUrl = coverUrl;
        this.bookService.addBook(this.newBook).then(() => {
          this.newBook = { title: '', coverUrl: '' };
          this.selectedFile = null;
          this.loadBooks();
        });
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  modificarLibro(book: Book) {
    this.newBook = { ...book };
  }

  guardarCambios() {
    this.bookService.updateBook(this.newBook).then(() => {
      this.newBook = { title: '', coverUrl: '' };
      this.loadBooks();
    });
  }


  eliminarLibro(bookId: string | undefined) {
    if (!bookId) {
      console.error("Book ID is undefined");
      return;
    }
    this.bookService.deleteBook(bookId).then(() => {
      this.loadBooks();
    });
  }
}
