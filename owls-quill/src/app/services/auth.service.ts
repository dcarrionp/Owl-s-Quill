import { Injectable, inject, signal } from '@angular/core';
import { Auth, signInWithEmailAndPassword, user } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { Observable, from } from 'rxjs';
import { UserInterface} from '../domain/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined)


  register(email: string, 
    username: string, 
    password: string
  ): Observable<void>{
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth, 
      email, 
      password
    ).then((response) => 
      updateProfile(response.user, {displayName: username}),
    );
    
    return from (promise);
  }

  login(email: string, password: string ): Observable<void>{
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth, 
      email, 
      password
    ).then(() => {});
    return from(promise);
  }

  logout(): Observable<void>{
    const promise = signOut(this.firebaseAuth);
    return from (promise);
  }
  
}
