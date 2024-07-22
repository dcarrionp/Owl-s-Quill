import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { RouterLink } from '@angular/router';
import { onAuthStateChanged } from 'firebase/auth';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, AppComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  authService = inject(AuthService);

  role: string | null = null;

  constructor(private auth: Auth, private userServices: UserService){}

  ngOnInit(){
    const loggetOutLink = document.getElementById('logout');
    const loggetInLink = document.getElementById('login');
    const adminCatalogoLink = document.getElementById('catalogo-admin');
    const commonCatalogoLink = document.getElementById('catalogo-common');
    const adminHistorialLink = document.getElementById('historial-admin');

    onAuthStateChanged(this.auth, async (user) => {
      console.log('usuario xd: ', user);
      if(this.auth.currentUser?.email){
        this.userServices.getRoleByEmail(this.auth.currentUser.email).subscribe(
          role => {
            console.log('Rol: ', role);
            if(adminCatalogoLink && commonCatalogoLink && adminHistorialLink){
              if(role === 'admin'){
                adminCatalogoLink.style.display = 'block';
                commonCatalogoLink.style.display = 'none';
                adminHistorialLink.style.display = 'block';
              }else{
                adminCatalogoLink.style.display = 'none';
                commonCatalogoLink.style.display = 'block';
                adminHistorialLink.style.display = 'none';
              }
            }
          },
          error => {
            console.error('Error fetching role', error);
            this.role = null;
            if(adminCatalogoLink && commonCatalogoLink && adminHistorialLink){
              adminCatalogoLink.style.display = 'none';
              commonCatalogoLink.style.display = 'block';
              adminHistorialLink.style.display = 'none';
            }
          }
        );
      }else{
        if(adminCatalogoLink && commonCatalogoLink && adminHistorialLink){
          adminCatalogoLink.style.display = 'none';
          commonCatalogoLink.style.display = 'block';
          adminHistorialLink.style.display = 'none';
        }
      }
      
      if(user){
        if(loggetInLink && loggetOutLink){
          loggetInLink.style.display = 'none';
          loggetOutLink.style.display = 'block';
        }
      }else{
        if(loggetInLink && loggetOutLink){
          loggetOutLink.style.display = 'none';
          loggetInLink.style.display = 'block';
        }
      }      
    }, error => {
      console.log('Error en el auth: ', error);
    });
  }

}
