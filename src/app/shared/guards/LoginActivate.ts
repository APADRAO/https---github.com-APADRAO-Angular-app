import { AuthenticationService } from './../services/authentication.service';
import { UsuarioLogado } from './../interfaces/login';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn:'root'
})
export class LoginActivate implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router, private localStorageService: LocalStorageService)
  {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    let IsAuthorization = this.localStorageService.get('Is.Authorization');
    if (!IsAuthorization) {
      this.router.navigate(['login']);
    }
  this.authService.obterUsuarioLogado().subscribe(
    (data:UsuarioLogado)=>{
      if (!data.valid) {
        this.router.navigate(['login']);
      }
    },
    (error: any) => {
      this.router.navigate(['login']);
    }
  );
  return true;
  }
}
