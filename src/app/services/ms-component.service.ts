import { Injectable } from '@angular/core';
import { MS_COMPONENTS, MS_COMPONENT_TYPE } from '../appconfig';
import { MsComponentData } from '../models/ms-component-data';
import { MsCompoComponent } from '../components/ms-compo/ms-compo.component';

@Injectable()
export class MsComponentService {
  msComponentDataArray: MsComponentData[] = MS_COMPONENTS;
  selectedMsComponentUIDs: string[] = [];
  msCompoComponentByUID: any = {};

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

  setSelectedMsComponentUIDs(uids: string[]) {
    this.selectedMsComponentUIDs = uids;
  }

  addSelectedMsComponentUID(uid: string) {
    this.selectedMsComponentUIDs.push(uid);
  }

  resetSelectedMsComponents() {
    this.selectedMsComponentUIDs = [];
  }

  addMsCompComponent(instance: MsCompoComponent) {
    this.msCompoComponentByUID[instance.uid] = instance;
  }

  getMsCompComponent(uid: string) {
    return this.msCompoComponentByUID[uid];
  }
}
