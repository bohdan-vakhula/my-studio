import { Component, OnInit, ElementRef, QueryList, ViewChild } from '@angular/core';
import { MsComponentData } from '../../models/ms-component-data';
import { MsComponentService } from '../../services/ms-component.service';
import { MS_COMPONENT_TYPE, CONNECTOR_POSITION_TYPE, SIDE_BAR_WIDTH, CONNECTOR_CENTER_OFFSET } from '../../appconfig';
import { ConnectionService } from '../../services/connection.service';
import { MsPosition } from '../../models/ms-position';
import * as utils from '../../utils';
import * as $ from 'jquery';
    
@Component({
  selector: 'app-ms-compo',
  templateUrl: './ms-compo.component.html',
  styleUrls: ['./ms-compo.component.scss']
})
export class MsCompoComponent implements OnInit {
  @ViewChild('leftConnector') leftConnector: ElementRef;
  @ViewChild('topConnector') topConnector: ElementRef;
  @ViewChild('rightConnector') rightConnector: ElementRef;
  @ViewChild('bottomConnector') bottomConnector: ElementRef;

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

  getPosstionOfConnector(connectorType: string): MsPosition {
    let elem: Element;

    if (connectorType === CONNECTOR_POSITION_TYPE.TOP_POSITION) {
      elem = this.topConnector.nativeElement;
    } else if (connectorType === CONNECTOR_POSITION_TYPE.LEFT_POSITION) {
      elem = this.leftConnector.nativeElement;
    } else if (connectorType === CONNECTOR_POSITION_TYPE.RIGHT_POSITION) {
      elem = this.rightConnector.nativeElement;
    } else if (connectorType === CONNECTOR_POSITION_TYPE.BOTTOM_POSITION) {
      elem = this.bottomConnector.nativeElement;
    }

    return new MsPosition(
      $(elem).offset().left - SIDE_BAR_WIDTH + CONNECTOR_CENTER_OFFSET ,
      $(elem).offset().top + CONNECTOR_CENTER_OFFSET
    );
  }

}
