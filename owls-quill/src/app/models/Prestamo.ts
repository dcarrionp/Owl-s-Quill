export interface Prestamo {
    nombre: string;
    direccion: string;
    fechaDesde: string;
    fechaHasta: string;
    autor: string;
    libroId: number;  // Asume que hay un identificador de libro para asociar la reserva
  }
  