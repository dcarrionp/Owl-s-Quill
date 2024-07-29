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

  constructor(private firestore: Firestore, private http: HttpClient) { }

  addLibro(libro: Book) {
    return this.http.post<Book>(this.baseUrl, libro);
  }

  getLibros(): Observable<Book[]> {
    let url = enviroment.WS_PATH + "/libros"
    return this.http.get<any>(url)
  }

  getlibro(nombre: any): Observable<Book>{
    let url = enviroment.WS_PATH + "/libros/"+ nombre
    return this.http.get<any>(url)
  }

  deleteLibro(nombre: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}?nombre=${encodeURIComponent(nombre)}`);
  }

  updateLibro(libro: Book): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/${libro.id}`, libro);
  }
}
