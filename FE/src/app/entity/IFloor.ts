import {IBuilding} from './IBuilding';

export class IFloor {
  floorId: string;
  floorName: string;
  area: number;
  capacity: number;
  status: string;
  floorType: string;
  deleteFlag: boolean;
  building: IBuilding;
}
