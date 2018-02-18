import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { MsCompHostDirective } from '../../directives/ms-comp-host.directive';
import { MsCompoComponent } from '../ms-compo/ms-compo.component';

@Component({
  selector: 'app-canvas-panel',
  templateUrl: './canvas-panel.component.html',
  styleUrls: ['./canvas-panel.component.scss']
})
export class CanvasPanelComponent implements OnInit {
  @ViewChild(MsCompHostDirective) appMsCompHost: MsCompHostDirective;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  allowDrop(event) {
    event.preventDefault();
  }

  handleDrop(event) {
    event.preventDefault();
    let uid = event.dataTransfer.getData('MsComponentDataUID');

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(MsCompoComponent);
    let viewContainerRef = this.appMsCompHost.viewContainerRef;
    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<MsCompoComponent>componentRef.instance).setComponentData(uid);
    (<MsCompoComponent>componentRef.instance).updatePosition(event.clientX, event.clientY);
  }
}
