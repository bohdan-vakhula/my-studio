import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { MsCompHostDirective } from '../../directives/ms-comp-host.directive';
import { MsCompoComponent } from '../ms-compo/ms-compo.component';
import { MsComponentService } from '../../services/ms-component.service';
import { ConnectionService } from '../../services/connection.service';
import { MsConnectionPoint } from '../../models/ms-connection';
import { Position } from '../../models/position';

@Component({
  selector: 'app-canvas-panel',
  templateUrl: './canvas-panel.component.html',
  styleUrls: ['./canvas-panel.component.scss']
})
export class CanvasPanelComponent implements OnInit {
  @ViewChild(MsCompHostDirective) appMsCompHost: MsCompHostDirective;
  startPosition: Position = new Position(100, 100);
  endPosition: Position;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private msComponentService: MsComponentService,
              private connectionService: ConnectionService)
  {}

  ngOnInit() {
  }

  allowDrop(event) {
    event.preventDefault();
  }

  handleDrop(event) {
    event.preventDefault();
    let msComponentDataUID: string = event.dataTransfer.getData('MsComponentDataUID');

    if (msComponentDataUID) {
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(MsCompoComponent);
      let viewContainerRef = this.appMsCompHost.viewContainerRef;
      let componentRef = viewContainerRef.createComponent(componentFactory);

      let componentInstance: MsCompoComponent = (<MsCompoComponent>componentRef.instance);
      componentInstance.setComponentData(msComponentDataUID);
      componentInstance.updatePosition(event.clientX, event.clientY);

      this.msComponentService.addMsCompComponent(componentInstance);
    }
  }

  handleMouseMove(event) {
    if (event.button === 0 && this.connectionService.connectionStartPoint) {
      // this.startPosition = new Position(100, 100);
      this.endPosition = new Position(event.clientX, event.clientY);
      console.log('000000000000000000000', this.startPosition);
      console.log('1111111111111111111111111111', this.endPosition);
    }
  }

  handleMouseUp(event) {    
    if (this.connectionService.connectionStartPoint) {
      this.connectionService.cancelConnecting();
    }
  }
}
