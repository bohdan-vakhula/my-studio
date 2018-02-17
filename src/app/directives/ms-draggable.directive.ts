import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMsDraggable]'
})
export class MsDraggableDirective {

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    // $(this.el.nativeElement).removeClass('add-element');
    this.el.nativeElement.setAttribute('draggable', true);
  }

  @HostListener('dragstart') onDragStart() {
    console.log('00000000000000000000');
  }
}
