import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-catalago',
  templateUrl: './catalago.component.html',
  styleUrls: ['./catalago.component.scss']
})
export class CatalagoComponent {
  selectedBook: any;
  books = [];
  selectedFile: File | null = null;
  downloadURL: string = '';

  constructor(private storage: AngularFireStorage) { }
  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
    }
  }


  addBook(title: string) {
    if (this.selectedFile) {
      const filePath = `covers/${this.selectedFile.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.selectedFile);

      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.downloadURL = url;
            this.saveBookToDatabase(title, this.downloadURL);
          });
        })
      ).subscribe();
    }
  }

  updateBook(title: string) {
    if (this.selectedFile) {
      const filePath = `covers/${this.selectedFile.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.selectedFile);

      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.downloadURL = url;
            this.updateBookInDatabase(title, this.downloadURL);
          });
        })
      ).subscribe();
    } else {
      this.updateBookInDatabase(title, this.selectedBook.imageUrl);
    }
  }

  saveBookToDatabase(title: string, imageUrl: string) {
    // Implementar lógica para guardar el libro en la base de datos
  }

  updateBookInDatabase(title: string, imageUrl: string) {
    // Implementar lógica para actualizar el libro en la base de datos
  }

  selectBook(book: any) {
    this.selectedBook = book;
  }

  clearSelection() {
    this.selectedBook = null;
    this.selectedFile = null;
  }

  deleteBook(book: any) {
    this.selectedBook = book;
  }

}
