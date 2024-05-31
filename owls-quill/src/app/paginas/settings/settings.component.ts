import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { onAuthStateChanged } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  displayName: any
  photoURL: any
  
  constructor(private userService: UserService, private authService: AuthService, private auth:Auth, private router: Router){}

  updateProfile(){
    this.userService.updateProfile(this.auth.currentUser, this.displayName, this.photoURL).
    then(response => {
      console.log(this.auth.currentUser)
      alert('Modificacion exitosa')
      this.router.navigate(['perfil'])
    })
    
  }
}
