import {IFloor} from './IFloor';

export interface IGround {
  groundId: string;
  groundType: string;
  area: number;
  image: string;
  status: string;
  rentCost: number;
  manageCost: number;
  note: string;
  version: number;
  deleteFlag: boolean;
  floor: IFloor;
}
