import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(public ngxService: NgxUiLoaderService) { }

  iniciarCarregamento() {
    this.ngxService.start();
    this.ngxService.startBackground('do-background-things');
    this.ngxService.stopBackground('do-background-things');
    this.ngxService.startLoader('master');
  }

  pararCarregamento() {
    this.ngxService.stop();
    this.ngxService.stopLoader('master');
  }
}
