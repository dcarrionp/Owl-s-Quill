import { Routes } from '@angular/router';
import { HomeComponent } from './paginas/home/home.component';
import { LoginComponent } from './paginas/login/login.component';
import { RegistroComponent } from './paginas/registro/registro.component';
import { CatalagoComponent } from './paginas/catalago/catalago.component';
import { PerfilComponent } from './paginas/perfil/perfil.component';
import { SettingsComponent } from './paginas/settings/settings.component';
import { CatalogCommonComponent } from './paginas/catalog-common/catalog-common.component';
import { ReservaComponent } from './paginas/reserva/reserva.component';
import { HistorialComponent } from './paginas/historial/historial.component';
import { AuthGuard } from './auth.guard';
import { DevueltoComponent } from './paginas/devuelto/devuelto.component';


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: "home", component: HomeComponent },
    { path: "perfil", component: PerfilComponent },
    { path: "registro", component: RegistroComponent },
    { path: "catalogo", component: CatalagoComponent },
    { path: "perfil/settings", component: SettingsComponent },
    { path: "client", component:CatalogCommonComponent},
    { path:"client/reserva", component: ReservaComponent},
    { path:"historial", component: HistorialComponent},
    { path:"reserva", component: ReservaComponent },
    { path:"devuelto", component: DevueltoComponent}
];