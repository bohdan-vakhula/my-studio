import { Injectable } from '@angular/core';
import { MS_COMPONENTS, MS_COMPONENT_TYPE } from '../appconfig';
import { MsComponentData } from '../models/ms-component-data';

@Injectable()
export class MsComponentService {
  msComponentDataArray: MsComponentData[] = MS_COMPONENTS;

  constructor() { }

  getEndpoints(): MsComponentData[] {
    return this.msComponentDataArray.filter(item => item.type === MS_COMPONENT_TYPE.ENDPOINT);
  }

  getScopes(): MsComponentData[] {
    return this.msComponentDataArray.filter(item => item.type === MS_COMPONENT_TYPE.SCOPE);
  }

  getMsComponentDataByUID(uid) {
    return this.msComponentDataArray.find(item => item.uid === uid);
  }

}
