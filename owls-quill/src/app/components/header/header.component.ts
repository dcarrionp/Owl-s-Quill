import { AfterViewInit, Component, ElementRef, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  authService = inject(AuthService);

  @ViewChild('logout') loggetOutLink!: ElementRef;
  @ViewChild('login') loggetInLink!: ElementRef;
  @ViewChild('admin') adminLink!: ElementRef;
  @ViewChild('common') commonLink!: ElementRef;
  @ViewChild('historialAdmin') historialAdminLink!: ElementRef;
  @ViewChildren('admin3') adminLink3!: QueryList<ElementRef>; // Changed to @ViewChildren

  role: string | null = null;

  constructor(private auth: Auth, private userServices: UserService) { }

  ngAfterViewInit() {
    onAuthStateChanged(this.auth, async (user) => {
      console.log('usuario xd: ', user);
      if (user && user.email) {
        this.userServices.getRoleByEmail(user.email).subscribe(
          role => {
            console.log('Rol recibido: ', role); // Added logging
            this.role = role;
            if (this.adminLink && this.commonLink && this.historialAdminLink && this.adminLink3) {
              if (role === 'admin') {
                this.adminLink.nativeElement.style.display = 'block';
                this.historialAdminLink.nativeElement.style.display = 'block';
                this.commonLink.nativeElement.style.display = 'none';
                this.adminLink3.forEach((link) => {
                  link.nativeElement.style.display = 'block';
                });
              } else {
                this.adminLink.nativeElement.style.display = 'none';
                this.historialAdminLink.nativeElement.style.display = 'none';
                this.commonLink.nativeElement.style.display = 'block';
                this.adminLink3.forEach((link) => {
                  link.nativeElement.style.display = 'none';
                });
              }
            }
          },
          error => {
            console.error('Error fetching role', error);
            this.role = null;
            if (this.adminLink && this.commonLink && this.historialAdminLink) {
              this.adminLink.nativeElement.style.display = 'none';
              this.historialAdminLink.nativeElement.style.display = 'none';
              this.commonLink.nativeElement.style.display = 'block';
            }
          }
        );
      } else {
        if (this.adminLink && this.commonLink && this.historialAdminLink) {
          this.adminLink.nativeElement.style.display = 'none';
          this.historialAdminLink.nativeElement.style.display = 'none';
          this.commonLink.nativeElement.style.display = 'block';
        }
      }

      if (user) {
        if (this.loggetInLink && this.loggetOutLink) {
          this.loggetInLink.nativeElement.style.display = 'none';
          this.loggetOutLink.nativeElement.style.display = 'block';
        }
      } else {
        if (this.loggetInLink && this.loggetOutLink) {
          this.loggetOutLink.nativeElement.style.display = 'none';
          this.loggetInLink.nativeElement.style.display = 'block';
        }
      }
    }, error => {
      console.log('Error en el auth: ', error);
    });
  }
}
