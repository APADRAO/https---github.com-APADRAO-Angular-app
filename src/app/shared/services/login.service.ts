import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Login } from '../interfaces/login';
import { ConfigService } from './config.service';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private API_URL = '';

  constructor(private http: HttpClient, private localStorageService: LocalStorageService, private configService: ConfigService) {
    this.callgetAPIURL();
  }

  public async callgetAPIURL() {
    await this.configService.getAPIURL()
      .toPromise()
      .then(data => {
        console.log('callgetAPIURL data = ', data);
        this.API_URL = data;
      }, err => {
        console.log('callgetAPIURL err = ', err);
      });
  }

  efeTuarLogin(login: Login, url:string): Observable<any> {
    //this.callgetAPIURL();
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(login);
    console.log(body);
    let urlSTR = url.replace("\"","").replace("'","");
    var retornoLogin = this.http.post(urlSTR + "/Authentication/v2", body, { 'headers': headers })
    
    return retornoLogin;
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
      map(res => res.body),
      //catchError(this.handleError)
    );
  }

  efetuarLogout(){
    let date = new Date();
    date.setDate(date.getDate() - 10);
    localStorage.removeItem("Is.Authorization")
    localStorage.removeItem("Is.User")
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);

  };

  getUserData(usuario:string){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.API_URL = this.configService.getApiUrlFromLocalStorage();

    return this.http
   .get<any>(
     `${this.API_URL}/api/v2/Usuario/getUsuarioCadastro?user=${usuario}`,
     {
       headers
     }
   )
   .pipe(
     tap((data:any)=>
       console.log('Retorno: ', JSON.stringify(data))
     ),
     //catchError(this.handleError)
   );}
}
