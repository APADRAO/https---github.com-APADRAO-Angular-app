import { LocalStorageService } from './local-storage.service'; 
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }


  getApiUrlFromLocalStorage(): string {
    return this.localStorageService.get('Is.ApiUrl');
  }

  public getAPIURL(): Observable<any> {
    let url = '';
    if (isDevMode())
      url = 'http://dpv-br-webitapi.us.signintra.com:9999/masteraddress/Get?EnvironmenTipo=development';
    else
      url = 'http://dpv-br-webitapi.us.signintra.com:9999/masteraddress/Get?EnvironmenTipo=production';

    return this.http
      .get(url, { responseType: 'text' })
      .pipe(
        tap((data: any) => {
          //this.APIURLRETURN = JSON.stringify(data);
          console.log('apiUrlService data = ', data)
        }),
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
