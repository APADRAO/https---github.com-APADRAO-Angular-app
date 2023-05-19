import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTextovermelho]'
})
export class TextovermelhoDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.color = 'red';
    this.el.nativeElement.style.fontWeight = 'bold';
  }
}
