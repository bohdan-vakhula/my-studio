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
}
