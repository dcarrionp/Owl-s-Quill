import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserService } from './services/user.service';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router, private auth: Auth) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    if(this.auth.currentUser){
      return this.userService.getRoleByEmail(this.auth.currentUser.email).pipe(
        map(role => {
          console.log('ROL: ', role)
          if (role === 'admin') {
            return true;
          } else {
            alert('Sin acceso')
            this.router.navigate(['inicio']);
            return false;
          }
        }),
        catchError((error) => {
          alert('Acceso denegado')
          this.router.navigate(['inicio']);
          return of(false);
        })
      );

      
    }else{
      alert('Acceso denegado')
      this.router.navigate(['inicio']);
      return false;
    }
  }
}