import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css']
})
export class TituloComponent implements OnInit {

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
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
}
