import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { MsCompHostDirective } from '../../directives/ms-comp-host.directive';
import { MsCompoComponent } from '../ms-compo/ms-compo.component';
import { MsComponentService } from '../../services/ms-component.service';

@Component({
  selector: 'app-canvas-panel',
  templateUrl: './canvas-panel.component.html',
  styleUrls: ['./canvas-panel.component.scss']
})
export class CanvasPanelComponent implements OnInit {
  @ViewChild(MsCompHostDirective) appMsCompHost: MsCompHostDirective;
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private msComponentService: MsComponentService) { }

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
}
