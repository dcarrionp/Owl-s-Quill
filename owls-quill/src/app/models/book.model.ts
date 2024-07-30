import Categoria from "../domain/categoria";

// book.model.ts
export default interface Book {
  id?: number;
  nombre: string;
  autor: string;
  precio: number;
  imagen: string;

  disponible: boolean;
  categoria: Categoria;
}
