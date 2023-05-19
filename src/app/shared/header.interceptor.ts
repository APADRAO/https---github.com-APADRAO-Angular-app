import { LocalStorageService } from './services/local-storage.service'; //from './../services/local-storage.service';
import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  usuarioNome!: string;
  IsAuthorization!: string;

  constructor(private localStorageService: LocalStorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercept request = ', request);
    console.log('intercept next = ', next);
    this.usuarioNome = this.localStorageService.get('Is.User');
    this.IsAuthorization = this.localStorageService.get('Is.Authorization');
    console.log('this.IsAuthorization intercept = ', this.IsAuthorization)
    request = request.clone({
      setHeaders: { Authorization: `${this.IsAuthorization}` }
    });

    return next.handle(request);
  }
}
