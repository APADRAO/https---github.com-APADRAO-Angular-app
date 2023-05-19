import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el:ElementRef) { }

  // @Input() defaultColor!: string;
  // @Input('myHighLight') highlightColor!: string;

  // @HostListener('')
}
