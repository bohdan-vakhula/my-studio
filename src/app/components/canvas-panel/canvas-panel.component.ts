import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { MsCompHostDirective } from '../../directives/ms-comp-host.directive';
import { MsCompoComponent } from '../ms-compo/ms-compo.component';
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
  }

  allowDrop(event) {
    event.preventDefault();
  }

  groupSelectedMsComponents() {

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
      componentInstance.updatePosition(event.clientX - 250, event.clientY);

      this.msComponentService.addMsCompComponent(componentInstance);
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
    this.msComponentService.resetSelectedMsComponents();
  }

  endConnect() {
    if (this.connectionService.connectionStartPoint) {
      this.connectionService.cancelConnecting();
    }
    this.startPosition = null;
    this.endPosition = null;
  }
}
