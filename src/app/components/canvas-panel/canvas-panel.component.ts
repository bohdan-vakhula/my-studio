import { Component, OnInit, ViewChild, ComponentFactoryResolver, ViewContainerRef, ElementRef } from '@angular/core';
import { MsCompHostDirective } from '../../directives/ms-comp-host.directive';
import { MsCompoComponent } from '../ms-compo/ms-compo.component';
import { MsGroupComponent } from '../ms-group/ms-group.component';
import { MsComponentService } from '../../services/ms-component.service';
import { ConnectionService } from '../../services/connection.service';
import { MsConnectionPoint } from '../../models/ms-connection';
import { MsPosition } from '../../models/ms-position';
import { SIDE_BAR_WIDTH } from '../../appconfig';

@Component({
  selector: 'app-canvas-panel',
  templateUrl: './canvas-panel.component.html',
  styleUrls: ['./canvas-panel.component.scss']
})
export class CanvasPanelComponent implements OnInit {
  @ViewChild("canvasPanel") canvasPanel: ElementRef;
  @ViewChild(MsCompHostDirective) appMsCompHost: MsCompHostDirective;
  startPosition: MsPosition;
  endPosition: MsPosition;
  viewContainerRef: ViewContainerRef;
  ctx: CanvasRenderingContext2D;
  canvasWidth: number = 0;
  canvasHeight: number = 0;

  private rect: any = {};
  private drag: boolean = false;

  constructor(public elementRef: ElementRef, private componentFactoryResolver: ComponentFactoryResolver,
              private msComponentService: MsComponentService,
              private connectionService: ConnectionService)
  {
    let self = this;
    window.addEventListener("keyup", function(event){
      if (event.keyCode === 71) { //character : g
        // self.groupSelectedMsComponents();
      } else if (event.keyCode == 46) { // character: DEL
        self.deleteSelectedMsComponents();
      }
    }, false);
  }

  ngOnInit() {
    this.viewContainerRef = this.appMsCompHost.viewContainerRef;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.ctx = this.canvasPanel.nativeElement.getContext("2d");
      this.canvasWidth = window.innerWidth - SIDE_BAR_WIDTH;
      this.canvasHeight = window.innerHeight;
    });
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

  deleteSelectedMsComponents() {
    this.connectionService.removeConnectionsOfSelectedComponents();
    this.msComponentService.deleteSelectedMsComponents();
  }
  draw() {
    this.ctx.setLineDash([6]);
    this.ctx.strokeRect(this.rect.startX, this.rect.startY, this.rect.w, this.rect.h);
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
       if (this.drag && this.ctx) {
        this.rect.w = event.offsetX - this.rect.startX;
        this.rect.h = event.offsetY - this.rect.startY ;
        this.ctx.clearRect(0, 0, this.canvasPanel.nativeElement.width, this.canvasPanel.nativeElement.height);
        this.draw();
      }
      this.endConnect();
    }
  }

  handleMouseUp(event) {
    this.endConnect();
    this.drag = false;

    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvasPanel.nativeElement.width, this.canvasPanel.nativeElement.height);
    }
  }

  handleMouseDown(event) {
    this.msComponentService.resetSelectedComponents();

    this.rect.startX = event.offsetX;
    this.rect.startY = event.offsetY;
    this.drag = true;
  }

  endConnect() {
    if (this.connectionService.connectionStartPoint) {
      this.connectionService.cancelConnecting();
    }
    this.startPosition = null;
    this.endPosition = null;
  }
}
