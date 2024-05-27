import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksCollection = this.firestore.collection<Book>('books');

  constructor(private firestore: AngularFirestore) { }

  getBooks() {
    return this.booksCollection.valueChanges({ idField: 'id' });
  }

  addBook(book: Book) {
    return this.booksCollection.add(book);
  }

  updateBook(book: Book) {
    return this.booksCollection.doc(book.id).update(book);
  }

  deleteBook(bookId: string) {
    return this.booksCollection.doc(bookId).delete();
  }
}
