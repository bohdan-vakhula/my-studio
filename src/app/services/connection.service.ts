import { Injectable } from '@angular/core';
import { MsConnection, MsConnectionPoint } from '../models/ms-connection';

@Injectable()
export class ConnectionService {
  connectStarted: boolean = false;
  msConnections: MsConnection[] = [];
  connectionStartPoint: MsConnectionPoint = null;

  constructor() { }

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
}
