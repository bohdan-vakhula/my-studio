import { Directive, ElementRef, HostListener, Input } from '@angular/core';

import {MsComponentData} from '../models/ms-component-data';
import {MsComponentService } from '../services/ms-component.service';
import { SIDE_BAR_WIDTH } from '../appconfig';

@Directive({
  selector: '[appMsDraggable]'
})
export class MsDraggableDirective {
  @Input() msComponentData: MsComponentData;
  dragImage = new Image();

  constructor(private el: ElementRef, public msComponentService: MsComponentService) {
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
    } else if (this.msComponentService.selectedComponentUIDs.length > 1) {
      event.dataTransfer.setData('msOrigPosX', event.clientX - SIDE_BAR_WIDTH);
      event.dataTransfer.setData('msOrigPosY', event.clientY);

      let dragGhost = document.createElement('div');
      document.body.appendChild(dragGhost);
      event.dataTransfer.setDragImage(dragGhost, 0, 0);
    }
  }
}
