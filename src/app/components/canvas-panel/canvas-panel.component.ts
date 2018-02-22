import { Component, OnInit, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { MsCompHostDirective } from '../../directives/ms-comp-host.directive';
import { MsCompoComponent } from '../ms-compo/ms-compo.component';
import { MsGroupComponent } from '../ms-group/ms-group.component';
import { MsComponentService } from '../../services/ms-component.service';
import { ConnectionService } from '../../services/connection.service';
import { MsConnectionPoint } from '../../models/ms-connection';
import { MsPosition } from '../../models/ms-position';
import { SIDE_BAR_WIDTH } from '../../appconfig';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

@Component({
  selector: 'app-canvas-panel',
  templateUrl: './canvas-panel.component.html',
  styleUrls: ['./canvas-panel.component.scss']
})
export class CanvasPanelComponent implements OnInit {
  @ViewChild(MsCompHostDirective) appMsCompHost: MsCompHostDirective;
  startPosition: MsPosition;
  endPosition: MsPosition;
  viewContainerRef: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private msComponentService: MsComponentService,
              private connectionService: ConnectionService,
              private _hotkeysService: HotkeysService)
  {
      this._hotkeysService.add(new Hotkey('shift+g', (event: KeyboardEvent): boolean => {
        console.log('Grop group group');
        this.groupSelectedMsComponents();
        return false; // Prevent bubbling
    }));
  }

  ngOnInit() {
    this.viewContainerRef = this.appMsCompHost.viewContainerRef;
  }

  allowDrop(event) {
    event.preventDefault();
  }

  groupSelectedMsComponents() {
    if (this.msComponentService.selectedComponentUIDs && this.msComponentService.selectedComponentUIDs.length > 1) {

      let groupComponentFactory = this.componentFactoryResolver.resolveComponentFactory(MsGroupComponent);
      let groupComponentRef = this.viewContainerRef.createComponent(groupComponentFactory);
      (<MsGroupComponent>groupComponentRef.instance).moveComponent(this.viewContainerRef);
      this.msComponentService.addComponentRef(groupComponentRef);
    }
  }

  handleDrop(event) {
    event.preventDefault();
    let msComponentDataUID: string = event.dataTransfer.getData('MsComponentDataUID');

    if (msComponentDataUID) {
      let msComponentFactory = this.componentFactoryResolver.resolveComponentFactory(MsCompoComponent);
      let componentRef = this.viewContainerRef.createComponent(msComponentFactory);

      let componentInstance: MsCompoComponent = (<MsCompoComponent>componentRef.instance);
      componentInstance.setComponentData(msComponentDataUID);
      componentInstance.updatePosition(event.clientX - 250, event.clientY);

      this.msComponentService.addComponentRef(componentRef);
    }
  }

  handleMouseMove(event) {
    if (event.buttons && event.button === 0 && this.connectionService.connectionStartPoint) {
      this.startPosition = this.connectionService.getPositionFromPoint(this.connectionService.connectionStartPoint);
      this.endPosition = new MsPosition(event.clientX - SIDE_BAR_WIDTH, event.clientY);
    } else {
      this.endConnect();
    }
  }

  handleMouseUp(event) {
    this.endConnect();
  }

  handleMouseDown(event) {
    this.msComponentService.resetSelectedComponents();
  }

  endConnect() {
    if (this.connectionService.connectionStartPoint) {
      this.connectionService.cancelConnecting();
    }
    this.startPosition = null;
    this.endPosition = null;
  }
}
