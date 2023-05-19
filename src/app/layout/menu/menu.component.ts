import { LocalStorageService } from 'src/app/shared/services/local-storage.service'; //'src/app/services/local-storage.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menu!: any[];
  constructor(private menuService: MenuService, private localStorageService:LocalStorageService) { }

  ngOnInit() {
    this.iniciarMenu();
  }

  iniciarMenu() {
    if (!this.menu && this.localStorageService.get("Is.Authorization")) {
      this.menuService.obterMenu()
        .subscribe({
          next: (registros) => {
            console.log("MENUS", registros)
            if(registros.status){
            this.menu = registros.dados.menus;
            }else{
              this.menu = [];
            }
            console.log("CARGA", this.menu)
          },
          error: (err: any) => {
            console.log(err)
          },
        });
    }
  }
}
