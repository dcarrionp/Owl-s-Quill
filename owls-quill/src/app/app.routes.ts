import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { UserRegComponent } from './components/user-reg/user-reg.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: "signup", component: SignupComponent},
    {path: "home", component: HomeComponent},
    {path: "resgister", component: UserRegComponent},
    {path: "login", component: LoginComponent}
];
