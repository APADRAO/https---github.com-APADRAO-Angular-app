
import { HeaderService } from 'src/app/shared/services/header.service';
import { NgbDropdown, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { Component, OnInit, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
//import { CookieService } //from 'ngx-cookie-service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'; //from 'src/app/services/local-storage.service';
import { NotificationService } from 'src/app/shared/services/notification.service'; //'src/app/services/notification.service';
import { UsuarioLogado } from 'src/app/shared/interfaces/login';
//import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/shared/services/authentication.service'; //from './../../services/authentication.service';

import { LoadingService } from 'src/app/shared/services/loading.service'; //from './../../services/loading.service';
import { ConfigService } from 'src/app/shared/services/config.service';// from './../../services/config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  pageTitle: string = '';
  usuarioNome!: string;
  usuarioEmail!: string;
  IsAuthorization!: string;
  nomeAmbiente!: string;
  homeAmbiente!: string;
  cookieValue: any;
  
  usuarioLogado: UsuarioLogado = {
    token: '',
    user: '',
    valid: false
  };

  environmentvariables: string = '';

  constructor(
    private _location: Location,
    private headerService: HeaderService,
    private localStorageService: LocalStorageService,
    private loadingService: LoadingService,
    private route: Router,
   // private cookieService: CookieService,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private configService: ConfigService,
    private ngbDropdown: NgbDropdown
  ) {
    //this.verificaUsuario();
  }

  ngOnInit(): void {
    this.verificaAmbiente();
  }

  /** Imprime todos valores dentro do arquivo Environment */
  private verificaAmbiente() {
    this.usuarioEmail = this.localStorageService.get('Is.Email');
    this.usuarioNome = this.localStorageService.get('Is.Nome');
    if(isDevMode())
      this.nomeAmbiente = 'Desenvolvimento';
    else
      this.nomeAmbiente = 'Produção';

    if(!this.localStorageService.get('Is.Authorization'))
      this.redirecionaUsuario();
  }

  // Caso o token fornecido pelo usuário seja inválido, efetua o login.
  // Este login é um mock enquanto a função de Login não estiver em uso
  // Basta trocar as credenciais username e pass
  private efetuarLogin() {
    // Se usuário não tiver token válido , ou seja, não está autenticado
    if (!this.usuarioLogado.valid) {
      //Se usuário estiver rodando aplicação localmente / DEV
      if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
        let usuario = {
          userName: "apadrao",
          pass: "L&nh@m@x1979",
          role: ""
        };
        this.authenticationService.login(usuario).subscribe(
          {
            next: (data) => {
              this.localStorageService.set('Is.User', data.body.user);
              this.usuarioNome = this.localStorageService.get('Is.User');
              this.localStorageService.set('Is.Authorization', data.body.authentication);
              this.IsAuthorization = this.localStorageService.get('Is.Authorization');
             // this.cookieService.set("Token", this.IsAuthorization);
              this.loadingService.pararCarregamento();
            },
            error: (err: any) => {
              this.loadingService.pararCarregamento();
              this.notificationService.showError('A autenticação local do header falhou.', 'ERRO');
              this.redirecionaUsuario();
            },
          });
      }
      else {
        this.redirecionaUsuario();
      }
    }
    else {
      // Para visualizar no console as informações do usuário
      console.log("Usuario logado =", this.usuarioLogado.user);
      console.log("Usuario Token =", this.usuarioLogado.token);
      console.log("Usuario Valid =", this.usuarioLogado.valid);
    }
  }

  redirecionaUsuario() {
    //if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    this.route.navigate(['login']);
    // }
    // else {
    // window.location.href = environment.logoutUrl;
    //}
  }

  onVoltar(): void {
    this._location.back();
  }

  logout() {
    this.loadingService.iniciarCarregamento();
    setTimeout(() => {
      this.localStorageService.clear();
      this.localStorageService.remove('Is.User')
      this.localStorageService.remove('Is.Authorization');
      this.localStorageService.remove("Is.ApiUrl");
      this.eraseCookie('Token')

      this.loadingService.pararCarregamento();
    }, 2000);
    this.loadingService.pararCarregamento();
    this.redirecionaUsuario();
  }
  eraseCookie(name: string) {
    document.cookie = `${name}=; Max-Age=-99999999;`;
  }
  get title(): string {
    return this.headerService.headerData.title;
  }

  get icon(): string {
    return this.headerService.headerData.icon;
  }

  get group(): string {
    return this.headerService.headerData.group;
  }

  logOut() {
    this.loadingService.iniciarCarregamento();
    let date = new Date();
    date.setDate(date.getDate() - 10);
  //  this.cookieService.deleteAll();
  //  this.cookieService.set("Token", "", date);
    localStorage.removeItem("Is.Authorization")
    localStorage.removeItem("Is.User")
    localStorage.removeItem("Is.ApiUrl");
    this.loadingService.pararCarregamento();
    this.redirecionaUsuario();
  }
}
