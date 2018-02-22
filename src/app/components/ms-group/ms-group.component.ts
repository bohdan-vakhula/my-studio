import { Component, OnInit, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MsCompoComponent } from '../ms-compo/ms-compo.component';
import { MsComponentService } from '../../services/ms-component.service';
import { ConnectionService } from '../../services/connection.service';
import { GROUP_MARGIN_OFFSET, SIDE_BAR_WIDTH } from '../../appconfig';
import { MsCompHostDirective } from '../../directives/ms-comp-host.directive';
import * as $ from 'jquery';
import { _ } from 'underscore';

@Component({
  selector: 'app-ms-group',
  templateUrl: './ms-group.component.html',
  styleUrls: ['./ms-group.component.scss']
})
export class MsGroupComponent extends MsCompoComponent implements OnInit {
  @ViewChild(MsCompHostDirective) appMsCompHost: MsCompHostDirective;
  @ViewChild('container') containerRef: ElementRef;
  @ViewChild('leftConnector') leftConnector: ElementRef;
  @ViewChild('topConnector') topConnector: ElementRef;
  @ViewChild('rightConnector') rightConnector: ElementRef;
  @ViewChild('bottomConnector') bottomConnector: ElementRef;
  viewContainerRef: ViewContainerRef;
  isGroup = true;

  constructor(public elementRef: ElementRef, msComponentService: MsComponentService, connectionService: ConnectionService) {
    super(elementRef, msComponentService, connectionService);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  moveComponent(srcViewContainerRef: ViewContainerRef) {
    this.viewContainerRef = this.appMsCompHost.viewContainerRef;

    let selectedComponents = this.msComponentService.getSelectedComponents();
    let rects = _.map(selectedComponents, selectedComponent => {
      return selectedComponent.containerRef.nativeElement.getBoundingClientRect();
    });

    let minLeft = Math.min(..._.map(rects, rect => rect.left));
    let minTop = Math.min(..._.map(rects, rect => rect.top));
    let maxRight = Math.max(..._.map(rects, rect => rect.right));
    let maxBottom = Math.max(..._.map(rects, rect => rect.bottom));

    let groupLeft: number = minLeft - GROUP_MARGIN_OFFSET - SIDE_BAR_WIDTH;
    let groupTop: number = minTop - GROUP_MARGIN_OFFSET;

    this.containerRef.nativeElement.style.left = groupLeft + 'px';
    this.containerRef.nativeElement.style.top = groupTop + 'px';
    this.containerRef.nativeElement.style.width = (maxRight - minLeft) + GROUP_MARGIN_OFFSET*2 + 'px';
    this.containerRef.nativeElement.style.height = (maxBottom - minTop) + GROUP_MARGIN_OFFSET*2 + 'px';

    let selectedComponentRefs = this.msComponentService.getSelectedComponentRefs();

    selectedComponentRefs.forEach(selectedComponentRef => {
      let indexOfRef: number = srcViewContainerRef.indexOf(selectedComponentRef.hostView);
      srcViewContainerRef.detach(indexOfRef);
      this.viewContainerRef.insert(selectedComponentRef.hostView);
    });

    selectedComponents.forEach(selectedComponent => {
      selectedComponent.updatePositionInGroup(groupLeft, groupTop);
    });

    this.msComponentService.setSelectedComponentUIDs([this.uid]);
  }
}
