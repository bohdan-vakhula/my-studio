import { Component, OnInit, ElementRef } from '@angular/core';
import { MsComponentData } from '../../models/ms-component-data';
import { MsComponentService } from '../../services/ms-component.service';
import { MS_COMPONENT_TYPE, CONNECTOR_POSITION_TYPE } from '../../appconfig';
import { ConnectionService } from '../../services/connection.service';
import * as utils from '../../utils';
    
@Component({
  selector: 'app-ms-compo',
  templateUrl: './ms-compo.component.html',
  styleUrls: ['./ms-compo.component.scss']
})
export class MsCompoComponent implements OnInit {
  uid = utils.uniqueID('ms_component');
  msComponentData: MsComponentData = new MsComponentData();
  MS_COMPONENT_TYPE: any = MS_COMPONENT_TYPE;
  CONNECTOR_POSITION_TYPE: any = CONNECTOR_POSITION_TYPE;
  originalTop: number = 0;
  originalLeft: number = 0;

  msTitle: string = '';
  msBackgroundColor: string = '';
  msTextColor: string = '';

  constructor(private elmentRef: ElementRef, public msComponentService: MsComponentService, private connectionService: ConnectionService) {
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

  handleConnectorMouseDown(event, positionStr:string) {
    event.stopPropagation();
    this.connectionService.startConnect(this.uid, positionStr);
  }

  handleConnectorMouseUp(event, positionStr:string) {
    event.stopPropagation();

    if (this.connectionService.isConnecting()) {
      this.connectionService.endConnect(this.uid, positionStr);
    }
  }

  updatePosition(x, y) {
    this.elmentRef.nativeElement.style.left = x + 'px';
    this.elmentRef.nativeElement.style.top = y + 'px';
  }

}
