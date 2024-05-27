import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { initializeApp } from 'firebase/app';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

if (environment.production) {
  enableProdMode();
}

initializeApp(environment.firebaseConfig);

platformBrowserDynamic().bootstrapModule(AppComponent)
  .catch(err => console.error(err));
