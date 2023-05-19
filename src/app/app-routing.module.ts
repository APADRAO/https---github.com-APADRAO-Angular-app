import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { LoginActivate } from './shared/guards/LoginActivate';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [LoginActivate] },
  { path: 'home', component: HomeComponent, canActivate: [LoginActivate] },
 // { path: 'nflvmh', loadChildren: () => import('./pages/nf-lvmh/nf-lvmh.module').then(m => m.NfLvmhModule), canActivate: [LoginActivate] },
 // { path: '**', redirectTo: '', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
