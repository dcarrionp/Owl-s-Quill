import { Injectable, inject, signal } from '@angular/core';
import { Auth, signInWithEmailAndPassword, user, updateProfile, updateEmail, sendEmailVerification } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signOut, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { Observable, from } from 'rxjs';
import { UserInterface } from '../domain/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined);

  register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((response) => 
      updateProfile(response.user, { displayName: username })
    );
    
    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {});
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }

  reauthenticate(email: string, password: string): Observable<void> {
    const user = this.firebaseAuth.currentUser;
    if (user) {
      const credential = EmailAuthProvider.credential(email, password);
      const reauthPromise = reauthenticateWithCredential(user, credential);
      return from(reauthPromise.then(() => {}));
    } else {
      return from(Promise.reject('No user is currently logged in.'));
    }
  }

  updateUserProfile(newUsername: string): Observable<void> {
    const user = this.firebaseAuth.currentUser;
    if (user) {
      const updateProfilePromise = updateProfile(user, { displayName: newUsername });
      return from(updateProfilePromise.then(() => {}));
    } else {
      return from(Promise.reject('No user is currently logged in.'));
    }
  }

  sendVerificationEmail(newEmail: string): Observable<void> {
    const user = this.firebaseAuth.currentUser;
    if (user) {
      const updateEmailPromise = updateEmail(user, newEmail);
      const sendVerificationPromise = updateEmailPromise.then(() => sendEmailVerification(user));
      return from(sendVerificationPromise);
    } else {
      return from(Promise.reject('No user is currently logged in.'));
    }
  }
}
