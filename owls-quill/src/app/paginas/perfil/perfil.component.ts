import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { onAuthStateChanged } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  constructor(private auth: Auth,
    private userService: UserService,
    private router: Router) { }

  displayName = this.auth.currentUser?.displayName
  email = this.auth.currentUser?.email
  photoURL = this.auth.currentUser?.photoURL

  ngOnInit() {
    onAuthStateChanged(this.auth, async (user) => {
      console.log(user?.photoURL)
      if (user) {
        this.displayName = user.displayName
        this.email = user.email
        this.photoURL = user.photoURL
        if (user.photoURL === null) {
          this.photoURL = '/assets/user-photo.png'
        }
      }
    })
  }

  logout() {
    this.userService.logOut().
      then(response => {
        this.router.navigate(['/login'])
        alert('Se cerro correctamente la sesion')
      })

  }

}
