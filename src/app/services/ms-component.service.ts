import { Injectable, ComponentRef } from '@angular/core';
import { MS_COMPONENTS, MS_COMPONENT_TYPE } from '../appconfig';
import { MsComponentData } from '../models/ms-component-data';
import { MsCompoComponent } from '../components/ms-compo/ms-compo.component';
import { _ } from 'underscore';

@Injectable()
export class MsComponentService {
  msComponentDataArray: MsComponentData[] = MS_COMPONENTS;
  selectedComponentUIDs: string[] = [];
  componentRefByUID: any = {};

  constructor() { }

  getEndpoints(): MsComponentData[] {
    return this.msComponentDataArray.filter(item => item.type === MS_COMPONENT_TYPE.ENDPOINT);
  }

  getScopes(): MsComponentData[] {
    return this.msComponentDataArray.filter(item => item.type === MS_COMPONENT_TYPE.SCOPE);
  }

  getMsComponentDataFromUID(uid) {
    return this.msComponentDataArray.find(item => item.uid === uid);
  }

  setSelectedComponentUIDs(uids: string[]) {
    this.selectedComponentUIDs = uids;
  }

  addSelectedComponentUID(uid: string) {
    this.selectedComponentUIDs.push(uid);
  }

  resetSelectedComponents() {
    this.selectedComponentUIDs = [];
  }

  addComponentRef(componentRef: ComponentRef<MsCompoComponent>) {
    this.componentRefByUID[componentRef.instance.uid] = componentRef;
  }

  getMsCompComponent(uid: string) {
    return this.componentRefByUID[uid].instance;
  }

  getSelectedComponents() {
    return _.map(this.selectedComponentUIDs, uid => this.componentRefByUID[uid].instance);
  }

  getSelectedComponentRefs() {
    return _.map(this.selectedComponentUIDs, uid => this.componentRefByUID[uid]);
  }

  deleteSelectedMsComponents() {
    let selectedComponentRefs = this.getSelectedComponentRefs();
    selectedComponentRefs.forEach(selectedComponentRef => {
      delete this.componentRefByUID[selectedComponentRef.instance.uid];
      selectedComponentRef.destroy();
    });
  }

  moveSelectedComponents(currentPos, originPos) {
    let componentsToMove = this.getSelectedComponents();

    if (componentsToMove.length === 1) {
      componentsToMove[0].updatePosition(currentPos.x, currentPos.y);
    } else {
      
      let rects = _.map(componentsToMove, selectedComponent => {
        return {
          left: selectedComponent.containerRef.nativeElement.offsetLeft,
          top: selectedComponent.containerRef.nativeElement.offsetTop,
          right: selectedComponent.containerRef.nativeElement.offsetLeft + selectedComponent.containerRef.nativeElement.offsetWidth,
          bottom: selectedComponent.containerRef.nativeElement.offsetTop + selectedComponent.containerRef.nativeElement.offsetHeight,
        }
      });

      let minLeft = Math.min(..._.map(rects, rect => rect.left));
      let minTop = Math.min(..._.map(rects, rect => rect.top));
      let maxRight = Math.max(..._.map(rects, rect => rect.right));
      let maxBottom = Math.max(..._.map(rects, rect => rect.bottom));

      componentsToMove.forEach(component => {
        let originalLeft: number = originPos.x - minLeft;
        let originalTop: number = originPos.y - minTop;
        component.updatePositionWithOriginal(currentPos.x + component.containerRef.nativeElement.offsetLeft - minLeft,
                                            currentPos.y + component.containerRef.nativeElement.offsetTop - minTop,
                                            originalLeft,
                                            originalTop);
      })
    }
  }

  selectComponentsInRect(rect: any) { //startX, startY, w, h
    let components:MsCompoComponent[] = _.map(_.values(this.componentRefByUID), componentRef => componentRef.instance);
    this.selectedComponentUIDs = [];

    let left: number = rect.w < 0 ? rect.startX + rect.w : rect.startX;
    let top: number = rect.h < 0 ? rect.startY + rect.h : rect.startY;

    components.forEach(component => {
      if (component.containerRef.nativeElement.offsetLeft > left &&
        component.containerRef.nativeElement.offsetTop > top &&
        (component.containerRef.nativeElement.offsetLeft + component.containerRef.nativeElement.offsetWidth) < (left + Math.abs(rect.w)) &&
        (component.containerRef.nativeElement.offsetTop + component.containerRef.nativeElement.offsetHeight) < (top + Math.abs(rect.h)))
      {
        this.addSelectedComponentUID(component.uid);
      }
    });
  }
}
