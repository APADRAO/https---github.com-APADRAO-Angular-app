import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTreeModule } from '@angular/cdk/tree';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { A11yModule } from '@angular/cdk/a11y';
import { HeaderInterceptor } from './shared/header.interceptor';
import { ErrorIntercept } from './shared/error.interceptor';
import { ModalService } from './shared/modal-service.service';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FlexModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule, DatePipe, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { TituloComponent } from './layout/titulo/titulo.component';
import { TextovermelhoDirective } from './shared/directives/textovermelho.directive';
import { ProgressComponent } from './component/progress/progress.component';
import { DndDirective } from './shared/directives/dnd.directive';
import { MenuComponent } from './layout/menu/menu.component';
import { LoginComponent } from './component/login/login.component';
import { FooterComponent } from './layout/footer/footer.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NgxUiLoaderConfig, NgxUiLoaderModule } from 'ngx-ui-loader';
import { HeaderComponent } from './layout/header/header.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';


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
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    MenuComponent,
    DndDirective,
    ProgressComponent,
    TextovermelhoDirective,
    TituloComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FontAwesomeModule,
    FlexModule,
    HttpClientModule,
    TagInputModule,
   // NgbModule,
    NgxPaginationModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    //NgxMaskModule.forRoot(maskConfig),
    ReactiveFormsModule,
    ScrollingModule,
    SharedModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    ModalService,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorIntercept, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    Storage,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
  exports: [
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
  ],
})
export class AppModule {}
