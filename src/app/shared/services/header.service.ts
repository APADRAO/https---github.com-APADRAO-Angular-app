import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HeaderData } from 'src/app/layout/header/header-data.model';
//import { HeaderData } from 

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private _headerData = new BehaviorSubject<HeaderData>({
    title: 'Início',
    icon: 'home',
    routerUrl: '',
    group: ''
  });
  constructor() { }

  get headerData():HeaderData {
    return this._headerData.value
  }

  set headerData(headerData:HeaderData) {
    this._headerData.next(headerData);
  }
}
