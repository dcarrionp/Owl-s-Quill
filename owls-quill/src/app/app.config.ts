import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp } from "firebase/app";


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};

const firebaseConfig = {
  apiKey: "AIzaSyDjWocvmwpfcDFA6p8RfAbLT8my0SOtedw",
  authDomain: "owl-s-quill.firebaseapp.com",
  projectId: "owl-s-quill",
  storageBucket: "owl-s-quill.appspot.com",
  messagingSenderId: "925841380822",
  appId: "1:925841380822:web:5c8c142522465ed3990077"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);