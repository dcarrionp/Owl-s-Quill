
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import Book from '../../models/book.model';
import { AuthService } from '../../services/auth.service';
import { Prestamo } from '../../models/Prestamo';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../enviroments/enviroment';
import { InformacionService } from '../../services/informacion.service';
import { LibroServiceService } from '../../services/libro-service.service';
import { UserService } from '../../services/user.service';
import { user } from '../../domain/user.interface';
import { Router } from '@angular/router';
import { User } from '@angular/fire/auth';


@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.scss'
})
export class ReservaComponent implements OnInit{
  @ViewChild('modal') modalElement!: ElementRef;
  reservarFormulario: FormGroup;
  libroSeleccionado: any;
  usuarioLoggeado: User | null = null;

  constructor(
    private fb: FormBuilder,
    private libroService: LibroServiceService,
    private informacionService: InformacionService,
    private userService: UserService,
    private router: Router
  ) {
    this.reservarFormulario = this.fb.group({
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.libroService.libroSeleccionado$.subscribe(libro => {
      if (libro) {
        this.libroSeleccionado = libro;
        this.scrollToModal(); // Scroll to the modal when a book is selected
      }
    });

    this.userService.getCurrentUser().subscribe(user => {
      this.usuarioLoggeado = user;
      if (!this.usuarioLoggeado) {
        this.router.navigate(['/login']); // Redirect to login if no user is logged in
      }
    });
  }

  scrollToModal(): void {
    setTimeout(() => {
      this.modalElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  onSubmit(): void {
    if (this.reservarFormulario.valid) {
      if (!this.usuarioLoggeado || !this.usuarioLoggeado.email) {
        console.error('Usuario no loggeado o email no encontrado');
        return;
      }

      const prestamo = {
        estado: 'Reservado',
        fechaInicio: this.reservarFormulario.get('fechaInicio')?.value,
        fechaFin: this.reservarFormulario.get('fechaFin')?.value,
        libroNombre: this.libroSeleccionado.nombre,
        libro: this.libroSeleccionado,
        usuarioEmail: this.usuarioLoggeado.email,
        usuario: {
          codigo: 2, // Ejemplo, deberías obtenerlo dinámicamente si tienes esta información
          rol: 'common', // Ejemplo, deberías obtenerlo dinámicamente si tienes esta información
          usuario: this.usuarioLoggeado.email
        }
      };

      this.informacionService.crearPrestamo(prestamo).subscribe(response => {
        console.log(response);
      });
    }
  }
}
