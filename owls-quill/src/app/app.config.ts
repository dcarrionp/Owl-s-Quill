import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';


const firebaseConfig = {
  apiKey: "AIzaSyDjWocvmwpfcDFA6p8RfAbLT8my0SOtedw",
  authDomain: "owl-s-quill.firebaseapp.com",
  projectId: "owl-s-quill",
  storageBucket: "owl-s-quill.appspot.com",
  messagingSenderId: "925841380822",
  appId: "1:925841380822:web:5c8c142522465ed3990077"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ]
};
