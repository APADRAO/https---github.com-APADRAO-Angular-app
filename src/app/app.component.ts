import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<app-header><app-menu></app-menu></app-header><router-outlet></router-outlet><app-footer></app-footer>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-App';
}
