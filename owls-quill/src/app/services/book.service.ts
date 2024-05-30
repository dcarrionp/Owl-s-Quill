import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private collectionName = 'books';

  constructor(private firestore: AngularFirestore) {}

  getBooks() {
    return this.firestore.collection<Book>(this.collectionName).valueChanges({ idField: 'id' });
  }

  addBook(book: Book) {
    return this.firestore.collection<Book>(this.collectionName).add(book);
  }

  updateBook(book: Book) {
    return this.firestore.collection<Book>(this.collectionName).doc(book.id).update(book);
  }

  deleteBook(bookId: string) {
    return this.firestore.collection<Book>(this.collectionName).doc(bookId).delete();
  }
}
