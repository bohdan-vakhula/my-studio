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
  @ViewChild('container') containerRef: ElementRef;
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
  timerId: any;

  constructor(private elmentRef: ElementRef, public msComponentService: MsComponentService, private connectionService: ConnectionService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  setComponentData(msComponentDataUID: string) {
    this.msComponentData = this.msComponentService.getMsComponentDataFromUID(msComponentDataUID);

    this.msTitle = this.msComponentData.title;
    this.msTextColor = '#fff';
    this.msBackgroundColor =  this.msComponentData.type === 'endpoint' ? '#0c79c5' : '#289023';
  }

  handleContainerMouseDown(event) {
    event.stopPropagation();
    
    if (event.shiftKey) {
      this.msComponentService.addSelectedMsComponentUID(this.uid);
    } else {
      this.msComponentService.setSelectedMsComponentUIDs([this.uid]);
    }
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

  handleDragBegin(event) {
    this.timerId = setInterval(() => {
      this.connectionService.updateMsLines();
    }, 30);
  }

  handleDragEnd(event) {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  get shouldSelect() {
    return this.msComponentService.selectedMsComponentUIDs.includes(this.uid);
  }

  updatePosition(x, y) {
    this.containerRef.nativeElement.style.left = x + 'px';
    this.containerRef.nativeElement.style.top = y + 'px';
  }

  getPosstionOfConnector(connectorType: string): MsPosition {
    let elem: Element;
    let offsetX: number = 0;
    let offsetY: number = 0;

    if (connectorType === CONNECTOR_POSITION_TYPE.TOP_POSITION) {
      elem = this.topConnector.nativeElement;
      offsetX = CONNECTOR_CENTER_OFFSET;
    } else if (connectorType === CONNECTOR_POSITION_TYPE.LEFT_POSITION) {
      elem = this.leftConnector.nativeElement;
      offsetY = CONNECTOR_CENTER_OFFSET;
    } else if (connectorType === CONNECTOR_POSITION_TYPE.RIGHT_POSITION) {
      elem = this.rightConnector.nativeElement;
      offsetX = CONNECTOR_CENTER_OFFSET*2;
      offsetY = CONNECTOR_CENTER_OFFSET;
    } else if (connectorType === CONNECTOR_POSITION_TYPE.BOTTOM_POSITION) {
      elem = this.bottomConnector.nativeElement;
      offsetX = CONNECTOR_CENTER_OFFSET;
      offsetY = CONNECTOR_CENTER_OFFSET*2;
    }

    return new MsPosition(
      $(elem).offset().left - SIDE_BAR_WIDTH + offsetX,
      $(elem).offset().top + offsetY
    );
  }

}
