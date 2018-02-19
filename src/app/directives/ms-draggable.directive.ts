import { Directive, ElementRef, HostListener, Input } from '@angular/core';

import {MsComponentData} from '../models/ms-component-data';

@Directive({
  selector: '[appMsDraggable]'
})
export class MsDraggableDirective {
  @Input() msComponentData: MsComponentData;
  dragImage = new Image();

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    this.el.nativeElement.setAttribute('draggable', true);

    if (this.msComponentData) {
      this.dragImage.src = this.msComponentData.dragIcon;
    }
  }

  @HostListener('dragstart', ['$event']) onDragStart(event) {
    if (this.msComponentData) {
      event.dataTransfer.setData('MsComponentDataUID', this.msComponentData.uid);
      event.dataTransfer.setDragImage(this.dragImage, 0, 0);
    }
  }
}
