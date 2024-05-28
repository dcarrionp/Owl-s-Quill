import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, HeaderComponent, BodyComponent, FooterComponent, CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  authService= inject(AuthService);

  showHeaderFooter: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user =>{
      if (user){
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
          name: user.displayName!
        })
      }else {
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig())
    })

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHeaderFooter = !['/login', '/registro'].includes(event.urlAfterRedirects);
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
  

  title = 'owls-quill';
}
