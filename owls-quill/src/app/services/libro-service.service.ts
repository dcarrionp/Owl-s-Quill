import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroServiceService {

  private libroSeleccionadoSource = new BehaviorSubject<any>(null);
  libroSeleccionado$ = this.libroSeleccionadoSource.asObservable();

  seleccionarLibro(libro: any) {
    this.libroSeleccionadoSource.next(libro);
  }
}
