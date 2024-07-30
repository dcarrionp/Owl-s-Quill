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

  private baseUrl: string = `${enviroment.WS_PATH}/libros`;

  constructor(private firestore: Firestore, private http: HttpClient) {}

  addLibro(libro: Book) {
    let url = enviroment.WS_PATH + "/libros";
    return this.http.post<any>(url, libro);
  }

  getLibros(): Observable<Book[]> {
    let url = enviroment.WS_PATH + "/libros";
    return this.http.get<any>(url);
  }

  getLibro(nombre: any): Observable<Book> {
    let url = enviroment.WS_PATH + "/libros/" + nombre;
    return this.http.get<any>(url);
  }

  deleteLibro(nombre: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${nombre}`);
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

  getLibrosPorAutor(autor: string): Observable<Book[]> {
    let url = enviroment.WS_PATH + "/libros/autor/" + autor;
    return this.http.get<Book[]>(url);
  }

  getLibrosPorCategoria(categoria: string): Observable<Book[]> {
    let url = enviroment.WS_PATH + "/libros/categorias/" + categoria;
    return this.http.get<Book[]>(url);
  }

  getLibrosPorDisponibilidad(disponibilidad: boolean): Observable<Book[]> {
    let url = enviroment.WS_PATH + "/libros/disponibilidad/" + disponibilidad;
    return this.http.get<Book[]>(url);
  }
}
