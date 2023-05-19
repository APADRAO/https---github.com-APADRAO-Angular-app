
import { MatCardModule } from '@angular/material/card';
import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private headerService:HeaderService) {
    headerService.headerData = {
      title: 'Inicio',
      icon: 'home',
      routerUrl: '',
      group: ''
    }
   }

  ngOnInit(): void {
  }
}
