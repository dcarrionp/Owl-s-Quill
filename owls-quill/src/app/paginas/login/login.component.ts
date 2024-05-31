import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { user } from '../../domain/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  user: user = new user()

  constructor(private userService: UserService, private router: Router, private authService: AuthService) { }

  loginWithGoogle() {

    this.userService.loginGoogle().
      then(response => {

        console.log(response)
        this.authService.setUser(response.user)
        this.router.navigate(['/home'])

      }).catch(error => console.log(error.code))
  }

  login() {
    this.userService.login(this.user.email, this.user.password).
      then(response => {

        console.log(response)
        this.authService.setUser(response.user)
        this.router.navigate(['/home'])

      }).catch(error => {
        console.log(error.code)
        if (error.code === 'auth/missing-email') {
          alert('Ingrese su email')
        }
        if (error.code === 'auth/missing-password') {
          alert('Ingrese su contraseña')
        }
        if (error.code === 'auth/invalid-credential') {
          alert('Correo o contraseña incorrectos')
        }
        if (error.code === 'auth/invalid-email') {
          alert('El email ingresado no es valido')
        }
        if (error.code === 'auth/too-many-requests') {
          alert('Excedio el limite de intentos de inicio de sesion')
        }
      })
  }

}