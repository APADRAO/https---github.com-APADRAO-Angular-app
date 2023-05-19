import { LogsService } from './services/logs.service'; //from 'src/app/services/logs.service';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ErrorIntercept implements HttpInterceptor {

  constructor(private router: Router, private logsService:LogsService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        //this.salvarLogErro(error);
        let errorMessage = '';
        console.log('ErrorIntercept error.status = ', error.status);

        if (error.status === 401 || error.status === 403) {
          //navigate /delete cookies or whatever
          //this.router.navigateByUrl('/login');
          // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
          errorMessage = error.message;
          return throwError(errorMessage); // or EMPTY may be appropriate here
        }
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  private salvarLogErro(error: HttpErrorResponse) {
    this.logsService.salvarLogErro(error.message).subscribe({
      next: () => {
        console.log('Log de Erro Registrado');
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
