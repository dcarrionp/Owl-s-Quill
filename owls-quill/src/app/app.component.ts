import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, HeaderComponent, BodyComponent, FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  authService= inject(AuthService);

  ngOnInit(): void {
    this.authService.user$.subscribe(user =>{
      if (user){
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
        })
      }else {
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig())
    })
  }

  logout(): void {
    this.authService.logout();
  }
  

  title = 'owls-quill';
}
