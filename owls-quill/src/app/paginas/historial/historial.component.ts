import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Book from '../../models/book.model';
import { InformacionService } from '../../services/informacion.service';
import { enviroment } from '../../enviroments/enviroment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss'
})
export class HistorialComponent {
  reportUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

  }

  generateReport() {
    const startDateInput = (document.getElementById('startDate') as HTMLInputElement).value;
    const endDateInput = (document.getElementById('endDate') as HTMLInputElement).value;

    if (startDateInput && endDateInput) {
      const url = `http://localhost:8080/ProyectoFinal/rs/prestamos/reservas-entre-fechas-pdf?fechaInicio=${startDateInput}&fechaFin=${endDateInput}`;
      this.reportUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

  }

  generateGeneralReport() {
    this.reportUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:8080/ProyectoFinal/reportes.xhtml');
  }
}
