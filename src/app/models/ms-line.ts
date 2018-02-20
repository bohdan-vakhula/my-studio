import {MsPosition} from './ms-position';

export class MsLine {
    position1: MsPosition;
    position2: MsPosition;

    constructor(position1: MsPosition, position2: MsPosition) {
        this.position1 = position1;
        this.position2 = position2;
    }
}