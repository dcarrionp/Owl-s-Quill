import Categoria from "../domain/categoria";

export default interface Book {
  codigo?: number;
  nombre: string;
  autor: string;
  precio: number;
  imagen: string;
  disponibilidad: boolean;
  categoriaNombre: String;
}
