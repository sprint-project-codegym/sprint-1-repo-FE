import {ICustomer} from './ICustomer';
import {IEmployee} from './IEmployee';
import {IGround} from './IGround';

export interface IContract {
  contractId: string;
  startDate: string;
  endDate: string;
  contractDate: string;
  rentCost: number;
  totalCost: number;
  contractContent: string;
  deleteFlag: boolean;
  customer: ICustomer;
  employee: IEmployee;
  ground: IGround;
}
