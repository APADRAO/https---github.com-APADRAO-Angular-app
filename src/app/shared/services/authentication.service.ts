import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private API_URL = '';
  constructor(private http: HttpClient, private localStorageService: LocalStorageService, private configService: ConfigService) {}

  login(usuario: any): Observable<any> {
    this.API_URL = this.configService.getApiUrlFromLocalStorage();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4200' }),
      observe: 'response' as 'response'
    }

    return this.http
      .post(`${this.API_URL}/Authentication`, usuario, httpOptions)
      .
      pipe(
        map((registros: any) => registros),
        tap((data) => {
          console.log('All => ' + JSON.stringify(data));
        }),
        catchError(this.handleError)
      );
  }

  obterUsuarioLogado(): Observable<any> {
    this.API_URL = this.configService.getApiUrlFromLocalStorage();
    let token: string = this.localStorageService.get('Is.Authorization');
    let body = JSON.stringify({ token: token });
    console.log('body', body);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(
      `${this.API_URL}/Authentication/ValidaToken`, body, { headers, observe: 'response' },
    ).pipe(
      tap(data => console.log('Usuario Logado = ', data)),
      map(res => res.body),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `Ocorreu um erro: ${err.status} . Mensagem de erro :  ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
