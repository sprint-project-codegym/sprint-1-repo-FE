import {IPosition} from './IPosition';
import {IAccount} from './IAccount';

export interface IEmployee {
  employeeId?: string;
  employeeName: string;
  employeeBirthday: string;
  employeeGender: boolean;
  employeeGmail: string;
  employeeIdCard: string;
  employeeAddress: string;
  employeePhone: string;
  employeeSalary: number;
  position: IPosition;
  account: IAccount;
  urlImage: string;
  deleteFlag?:string;
}
