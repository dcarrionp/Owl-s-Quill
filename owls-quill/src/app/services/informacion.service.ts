import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import Book from '../models/book.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class InformacionService {

  constructor(private http: HttpClient) { }

  addLibro(libro: Book) {
    let url = enviroment.WS_PATH + "/libros";
    return this.http.post<any>(url, libro);
  }

  getLibros(): Observable<Book[]> {
    let url = enviroment.WS_PATH + "/libros";
    return this.http.get<any>(url);
  }

  getLibro(nombre: string): Observable<Book> {
    let url = enviroment.WS_PATH + "/libros/" + nombre;
    return this.http.get<any>(url);
  }

  deleteLibro(nombre: string): Observable<void> {
    const url = `${enviroment.WS_PATH}/libros?nombre=${nombre}`;
    return this.http.delete<void>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateLibro(libro: Book) {
    let url = `${enviroment.WS_PATH}/libros`;
    return this.http.put<any>(url, libro);
  }

  getLibrosPorAutor(autor: string): Observable<Book[]> {
    let url = `${enviroment.WS_PATH}/libros/autor/${autor}`;
    return this.http.get<Book[]>(url);
  }

  getLibrosPorCategoria(categoria: string): Observable<Book[]> {
    let url = `${enviroment.WS_PATH}/libros/categorias/${categoria}`;
    return this.http.get<Book[]>(url);
  }

  toggleLibroDisponibilidad(endpoint: string): Observable<void> {
    return this.http.put<void>(`${enviroment.WS_PATH}${endpoint}`, {});
  }

  crearPrestamo(prestamo: any): Observable<any> {
    return this.http.post<any>(`${enviroment.WS_PATH}/prestamos`, prestamo);
  }
}