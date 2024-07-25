import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import Book from '../models/book.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class InformacionService {
  constructor(private firestore: Firestore, private http: HttpClient) { }

  addLibro(libro: Book) {
    const libroRef = collection(this.firestore, 'libros');
    return addDoc(libroRef, libro);
  }

  getLibros(): Observable<Book[]> {
    let url = enviroment.WS_PATH + "/libros"
    return this.http.get<any>(url)
  }

  getlibro(nombre: any): Observable<Book>{
    let url = enviroment.WS_PATH + "/libros/"+ nombre
    return this.http.get<any>(url)
  }

  deleteLibro(libro: Book) {
    const libroDocRef = doc(this.firestore, `libros/${libro.id}`);
    return deleteDoc(libroDocRef);
  }

  updateLibro(libro: Book) {
    const libroDocRef = doc(this.firestore, `libros/${libro.id}`);
    return updateDoc(libroDocRef, {
      nombre: libro.nombre,
      precio: libro.precio,
      autor: libro.autor,
      imagen: libro.imagen
    });
  }
}
