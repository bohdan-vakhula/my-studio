import { Component, OnInit, ElementRef } from '@angular/core';
import { MsComponentData } from '../../models/ms-component-data';
import { MsComponentService } from '../../services/ms-component.service';
import { MS_COMPONENT_TYPE } from '../../appconfig';
import * as utils from '../../utils';
import * as $ from 'jquery';

@Component({
  selector: 'app-ms-compo',
  templateUrl: './ms-compo.component.html',
  styleUrls: ['./ms-compo.component.scss']
})
export class MsCompoComponent implements OnInit {
  uid = utils.uniqueID('ms_component');
  msComponentData: MsComponentData = new MsComponentData();
  MS_COMPONENT_TYPE: any = MS_COMPONENT_TYPE;
  originalTop: number = 0;
  originalLeft: number = 0;

  msTitle: string = '';
  msBackgroundColor: string = '';
  msTextColor: string = '';

  constructor(private elmentRef: ElementRef, public msComponentService: MsComponentService) {
  }

  ngOnInit() {
    this.elmentRef.nativeElement.style.position = 'absolute';
  }

  setComponentData(msComponentDataUID: string) {
    this.msComponentData = this.msComponentService.getMsComponentDataFromUID(msComponentDataUID);

    this.msTitle = this.msComponentData.title;
    this.msTextColor = '#fff';
    this.msBackgroundColor =  this.msComponentData.type === 'endpoint' ? '#0c79c5' : '#289023';
  }

  handleContainerClick() {
    this.msComponentService.setSelectedMsComponent(this);
  }

  handleContainerMouseDown(event) {
    this.originalTop = event.pageY - $(this.elmentRef.nativeElement).offset().top;
    this.originalLeft = event.pageX - $(this.elmentRef.nativeElement).offset().left;
  }

  updatePosition(x, y) {
    this.elmentRef.nativeElement.style.left = (x - this.originalLeft) + 'px';
    this.elmentRef.nativeElement.style.top = (y - this.originalTop) + 'px';
  }

}
