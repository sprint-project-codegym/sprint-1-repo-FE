import {FloorDTO} from './FloorDTO';

export class GroundCreateDTO {
  groundId: string;
  groundType: string;
  area: number;
  image: string;
  status: string;
  rentCost: number;
  manageCost: number;
  note: string;
  version: number;
  floorDTO: FloorDTO;
}
