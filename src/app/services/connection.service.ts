import { Injectable } from '@angular/core';
import { MsConnection, MsConnectionPoint } from '../models/ms-connection';
import { MsPosition } from '../models/ms-position';
import { MsCompoComponent } from '../components/ms-compo/ms-compo.component';
import { MsComponentService } from '../services/ms-component.service';
import { MsLine } from '../models/ms-line';
import { _ } from 'underscore';

@Injectable()
export class ConnectionService {
  connectStarted: boolean = false;
  msConnections: MsConnection[] = [];
  connectionStartPoint: MsConnectionPoint = null;
  msLines: MsLine[] = [];

  constructor(public msComponentService: MsComponentService) { }

  startConnect(msComponentUID: string, connectPosition: string) {
    this.connectStarted = true;
    this.connectionStartPoint = new MsConnectionPoint(msComponentUID, connectPosition);
  }

  endConnect(msComponentUID: string, connectPosition: string) {
    if (this.connectStarted && this.connectionStartPoint) {
      this.connectStarted = false;

      if (this.connectionStartPoint.componentUID !== msComponentUID) {
        let msConnection: MsConnection = new MsConnection(
            this.connectionStartPoint,
            new MsConnectionPoint(msComponentUID, connectPosition)
        );
        this.msConnections.push(msConnection);
        this.updateMsLines();
      }
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
    let msComponent: MsCompoComponent = <MsCompoComponent>this.msComponentService.getMsCompComponent(connectionPoint.componentUID);
    return msComponent.getPosstionOfConnector(connectionPoint.connectorPosition);
  }

  updateMsLines() {
    this.msLines = [];
    this.msConnections.forEach((msConnection) => {
      let pos1: MsPosition = this.getPositionFromPoint(msConnection.startPoint);
      let pos2: MsPosition = this.getPositionFromPoint(msConnection.endPoint);
      this.msLines.push(new MsLine(pos1, pos2));
    });
  }

  removeConnectionsOfSelectedComponents() {
    this.msConnections = _.filter(this.msConnections, msConnection => {
        let msComponent1: MsCompoComponent = <MsCompoComponent>this.msComponentService.getMsCompComponent(msConnection.startPoint.componentUID);
        let msComponent2: MsCompoComponent = <MsCompoComponent>this.msComponentService.getMsCompComponent(msConnection.endPoint.componentUID);

        return !this.msComponentService.selectedComponentUIDs.includes(msComponent1.uid) &&
          !this.msComponentService.selectedComponentUIDs.includes(msComponent2.uid);
    });

    this.updateMsLines();
  }
}
