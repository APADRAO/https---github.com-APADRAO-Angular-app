import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgxUiLoaderConfig, NgxUiLoaderModule } from 'ngx-ui-loader';
import { MaterialModule } from '../material.module';
import { BrowserModule } from '@angular/platform-browser';
import { IConfig, NgxMaskModule } from 'ngx-mask';
//import { ModalComponent } from '../components/modal/modal.component';
import { HighlightDirective } from './directives/highlight.directive';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'red',
  bgsOpacity: 0.5,
  bgsPosition: 'bottom-right',
  bgsSize: 60,
  bgsType: 'ball-spin-clockwise',
  blur: 5,
  delay: 0,
  fastFadeOut: true,
  fgsColor: 'red',
  fgsPosition: 'center-center',
  fgsSize: 60,
  fgsType: 'ball-spin-clockwise',
  gap: 24,
  logoPosition: 'center-center',
  logoSize: 120,
  logoUrl: '',
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: 'rgba(40, 40, 40, 0.8)',
  pbColor: 'red',
  pbDirection: 'ltr',
  pbThickness: 3,
  hasProgressBar: false,
  text: 'Carregando. Aguarde...',
  textColor: '#FFFFFF',
  textPosition: 'center-center',
  maxTime: -1,
  minTime: 300,
};

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    HighlightDirective
  ],
  providers: [],
  imports: [
    CommonModule,
    //NgxMaskModule.forRoot(maskConfig),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule],
  exports: [
    CommonModule,
   // NgxMaskModule,
    NgxUiLoaderModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule],
})
export class SharedModule { }
