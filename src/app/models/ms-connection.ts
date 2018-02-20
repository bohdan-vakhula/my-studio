import * as utils from '../utils';

export class MsConnectionPoint {
    componentUID: string;
    connectorPosition: string;
    
    constructor(uid, position: string) {
        this.componentUID = uid;
        this.connectorPosition = position;
    }
}
export class MsConnection {
    uid: string;
    startPoint: MsConnectionPoint;
    endPoint: MsConnectionPoint;

    constructor(startPoint, endPoint) {
        this.uid = utils.uniqueID('ms_connection');
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }
}