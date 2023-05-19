import { LoginService } from './../../shared/services/login.service';
import { NotificationService } from './../../shared/services/notification.service';
import { LoadingService } from './../../shared/services/loading.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router'; 
import { Login, UsuarioLogado } from '../../shared/interfaces/login';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { ConfigService } from './../../shared/services/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  form: FormGroup = new FormGroup({});
  mensagem: string = "";
  login: Login = {
    userName: '',
    pass: ''
  };

  constructor(fb: FormBuilder,
    private notificationService: NotificationService,
    private loadingService: LoadingService,
    private loginService: LoginService,
    private authenticationService: AuthenticationService,
    private configService: ConfigService,
    private route: Router) {
    this.criarForm(fb);
  }

  ngOnInit() {
    this.obterUsuarioLogado();
  }

  private obterUsuarioLogado() {
    this.authenticationService.obterUsuarioLogado()
      .subscribe(
        (data: UsuarioLogado) => {
          if (data.valid) {
            this.route.navigate(['']).then(
              () => { window.location.reload(); }
            );
          }
        },
        (error: any) => {
          console.error('Error = ', error);
        }
      );
  }

  getToken(BearerToken: string) {
    console.log('BearerToken', BearerToken);
    document.cookie = 'Token=' + BearerToken;
  }

  setToken(name: string, value: string) {
    var date = new Date(),
      expires = 'Expires=';
    date.setDate(date.getDate() + 1);
    expires += date;
    document.cookie = name + '=' + value + '; ' + expires + '; path=/';
  }

  loginClick() {
    this.loadingService.iniciarCarregamento();
    this.login.userName = this.form.controls['email'].value;
    this.login.pass = this.form.controls['senha'].value;
    this.configService.getAPIURL().subscribe(url => {
      this.loginService.efeTuarLogin(this.login, url)
        .subscribe((data: any) => {
          var auth = data;
          if(auth.status){
          console.log('loginClick data = ', data)
          console.log(data);
          this.setToken("Token", data.dados.authentication);
          localStorage.setItem("Is.Authorization", data.dados.authentication);
          localStorage.setItem("Is.User", data.dados.user);
          let urlSTR = url.replace("\"","").replace("'","");
          localStorage.setItem("Is.ApiUrl", urlSTR);
          this.notificationService.showSuccess('Login efetuado com sucesso', 'SUCESSO');
          this.loadingService.pararCarregamento();

          this.loginService.getUserData(data.dados.user).subscribe(
            (data:any)=>{
              if(data.status){
                if(data.dados.departamentoId){
                  localStorage.setItem("Is.Nome", data.dados.usuarioNome);
                  localStorage.setItem("Is.Email", data.dados.usuarioEmail);
                  this.route.navigate(['']).then(
                    () => { window.location.reload(); }
                  );
                }else{
                  this.route.navigate(['recadastro-user']).then(
                    () => { window.location.reload(); }
                  );
                }
              }else{
                this.route.navigate(['']).then(
                  () => { window.location.reload(); }
                );
                this.notificationService.showWarning(data.message, 'Atenção!')
              }
            }
          )


          
        }else{
          this.notificationService.showError('ERRO', auth.message);
            this.loadingService.pararCarregamento();
        }
        },
          (error) => {
            this.notificationService.showError('ERRO', error);
            this.loadingService.pararCarregamento();
          });
    });
  }

  criarForm(fb: FormBuilder) {
    this.form = fb.group({
      email: [''],
      senha: ['']
    });
  }
}
