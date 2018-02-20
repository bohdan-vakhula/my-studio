import { Injectable } from '@angular/core';
import { MsConnection, MsConnectionPoint } from '../models/ms-connection';
import { MsPosition } from '../models/ms-position';
import { MsCompoComponent } from '../components/ms-compo/ms-compo.component';
import { MsComponentService } from '../services/ms-component.service';

@Injectable()
export class ConnectionService {
  connectStarted: boolean = false;
  msConnections: MsConnection[] = [];
  connectionStartPoint: MsConnectionPoint = null;

  constructor(public msComponentService: MsComponentService) { }

  startConnect(msComponentUID: string, connectPosition: string) {
    this.connectStarted = true;
    this.connectionStartPoint = new MsConnectionPoint(msComponentUID, connectPosition);
  }

  endConnect(msComponentUID: string, connectPosition: string) {
    if (this.connectStarted && this.connectionStartPoint) {
      this.connectStarted = false;
      let msConnection: MsConnection = new MsConnection(
          this.connectionStartPoint,
          new MsConnection(msComponentUID, connectPosition)
      );
      this.msConnections.push(msConnection);
    }
  }

  cancelConnecting() {
    this.connectStarted = false;
    this.connectionStartPoint = null;
  }

  isConnecting():boolean {
    return this.connectStarted;
  }

  getPositionFromPoint(connectionPoint: MsConnectionPoint): MsPosition {
    let msComponent: MsCompoComponent = <MsCompoComponent>this.msComponentService.msCompoComponentByUID[connectionPoint.componentUID];
    return msComponent.getPosstionOfConnector(connectionPoint.connectorPosition);
  }
}
