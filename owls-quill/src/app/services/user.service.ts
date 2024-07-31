import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, signOut, updateProfile, User } from '@angular/fire/auth';
import { Firestore, collectionData, doc, docData, updateDoc } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { from, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { user } from '../domain/user.interface';
import { enviroment } from '../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usuarios= collection(this.firestore, 'usuarios');

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private http: HttpClient
  ) { }

  register(email:any, pasword:any){
    const userRef = collection(this.firestore, 'usuarios')
    addDoc(userRef, {email: email, role: 'common'})
    return createUserWithEmailAndPassword(this.auth, email, pasword)
  }

  login(email: any, password: any){
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  loginGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logOut(){
    return signOut(this.auth)
  }

  updateProfile(user: any, displayName: any, picture: any){
    return updateProfile(user, {displayName: displayName, photoURL: picture})
  }

  updateRole(email: any, newRole: any){
    const userRef = doc(this.firestore, `usuarios/${email}`);
    updateDoc(userRef,{email: email, role: newRole})
  }

  getRoleByEmail(email: string | null): Observable<string> {
    const url = `${enviroment.WS_PATH}/usuarios/${email}`;
    return this.http.get<any>(url).pipe(
      map(user => user.rol) // Ensure this matches the key in your response
    );
  }

  getUsuarios(): Observable<user[]> {
    return collectionData(this.usuarios, { idField: 'uid' }) as Observable<user[]>;
  }

  updateUsuario(uid: string, data: Partial<user>): Promise<void> {
    const usuarioDoc = doc(this.firestore, `usuarios/${uid}`);
    return updateDoc(usuarioDoc, data);
  }

  getCurrentUser(): Observable<User | null> {
    return new Observable((subscriber) => {
      this.auth.onAuthStateChanged(subscriber);
    });
  }
}