import { ConfigService } from 'src/app/shared/services/config.service'; //'src/app/services/config.service';
//import { environment } from 'src/environments/environment';
import { Menu } from 'src/app/shared/interfaces/menu'; //from './../../shared/interfaces/menu';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subscription, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private API_URL = '';
  constructor(private http: HttpClient, private configService: ConfigService) {
  }

  obterMenu(): Observable<any> {
    this.API_URL = this.configService.getApiUrlFromLocalStorage();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(`${this.API_URL}/api/v2/menu/getmenu`, { headers })
      .pipe(
        map(res => res),
        // tap((data: any) =>
        //   console.log('Arquivo Gerado: ', JSON.stringify(data))
        // ),
        catchError(this.handleError)
      )
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
