import { ReturnBase } from '../models/returnBase'; 
import {
  HttpClient, HttpErrorResponse, HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ILog } from '../interfaces/log';
import { ConfigService } from './config.service';
import { LocalStorageService } from './local-storage.service';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  private API_URL = '';
  usuario: string = this.localStorage.get('Is.User');
  token: string = this.localStorage.get('Is.Authorization');

  constructor(private http: HttpClient, private localStorage: LocalStorageService, private configService: ConfigService) {}
  salvarLogUsuario(modulo: string) {
    this.API_URL = this.configService.getApiUrlFromLocalStorage();
    let dataLog = this.setarDataLog();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let objPost: ILog[] = [{
      loG_BASE64: '',
      loG_JOBID: '',
      loG_TEXTO: `{"userName": "${this.usuario}", "moduloName":"${modulo}","dtAcesso":"${dataLog}"}`,
      loG_TIPO_CODIGO: 'WEBITACESSO'
    }]
    delete objPost[0].loG_BASE64;
    delete objPost[0].loG_JOBID;
    console.log('objPost = ', objPost);
    //let url = 'http://10.220.255.130:9191/api/v2/Log/InsertLogs';
    let url = `${this.API_URL}/api/v2/Log/InsertLogs`;
    console.log(url);
    return this.http.post<ReturnBase>(url, objPost, { headers })
      .pipe(
        tap((data: any) =>
          console.log(`Usuario: ${this.usuario} acessou o módulo ${modulo} - Data = ${data}`)
        ),
        catchError(this.handleError)
      )
  }

  salvarLogErro(erro: string) {
    this.API_URL = this.configService.getApiUrlFromLocalStorage();
    let dataLog = this.setarDataLog();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let objPost: ILog[] = [{
      loG_BASE64: '',
      loG_JOBID: '',
      loG_TEXTO: erro,
      loG_TIPO_CODIGO: 'WEBIT_ERR'
    }]
    delete objPost[0].loG_BASE64;
    delete objPost[0].loG_JOBID;
    console.log('objPostErro = ', objPost);
    //let url = 'http://10.220.255.130:9191/api/v2/Log/InsertLogs';
    let url = `${this.API_URL}/api/v2/Log/InsertLogs`;
    console.log(url);
    return this.http.post<ReturnBase>(url, objPost, { headers })
      .pipe(
        tap((data: any) =>
          console.log(`Erro: ${data}`)
        ),
        catchError(this.handleError)
      )
  }


  private setarDataLog() {
    let dt = this.formatarData(new Date());
    let dataLog = new Date(dt);
    dataLog.setHours(dataLog.getHours() + 3);
    return dataLog;
  }

  private formatarData(dataLog: any) {
    var dd = dataLog.getDate().toLocaleString();
    dd = dd.length < 2 ? `0${dd}` : dd;
    var MM = (dataLog.getMonth() + 1).toLocaleString();
    MM = MM.length < 2 ? `0${MM}` : MM;
    var yyyy = dataLog.getFullYear();
    var HH = dataLog.getHours().toLocaleString();
    HH = HH.length < 2 ? `0${HH}` : HH;
    var mi = dataLog.getMinutes().toLocaleString();
    mi = mi.length < 2 ? `0${mi}` : mi;
    var dt = `${yyyy}-${MM}-${dd}T${HH}:${mi}:00.000Z`;
    console.log(dt.toString());
    return dt;
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
