import { Component, OnInit, ElementRef } from '@angular/core';
import { MsComponentData } from '../../models/ms-component-data';
import { MsComponentService } from '../../services/ms-component.service';
import { MS_COMPONENT_TYPE } from '../../appconfig';

@Component({
  selector: 'app-ms-compo',
  templateUrl: './ms-compo.component.html',
  styleUrls: ['./ms-compo.component.scss']
})
export class MsCompoComponent implements OnInit {
  msComponentData: MsComponentData = new MsComponentData();
  MS_COMPONENT_TYPE: any = MS_COMPONENT_TYPE;

  constructor(private elmentRef: ElementRef, private msComponentService: MsComponentService) {
  }

  ngOnInit() {
    this.elmentRef.nativeElement.style.position = 'absolute';
  }

  setComponentData(uid: string) {
    this.msComponentData = this.msComponentService.getMsComponentDataByUID(uid);
  }

  updatePosition(x, y) {
    this.elmentRef.nativeElement.style.left = x + 'px';
    this.elmentRef.nativeElement.style.top = y + 'px';
  }

}
