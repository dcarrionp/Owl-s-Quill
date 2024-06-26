import { Injectable } from '@angular/core';
import 'firebase/compat/storage';
import { environment } from '../environments/environment';
import { Firestore } from 'firebase/firestore';
import firebase from 'firebase/compat';

// Initialize Firebase App if not already initialized
  firebase.initializeApp(environment.firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor( private firestore: Firestore) { }

  storageRef = firebase.storage().ref();

  async subirImagen(nombre: string, imgBase64: any) {
    try {
      let respuesta = await this.storageRef.child("users/" + nombre).putString(imgBase64, 'data_url');
      console.log(respuesta);
      return respuesta.ref.getDownloadURL();
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
