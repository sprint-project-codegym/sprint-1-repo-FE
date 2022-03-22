import {IAccount} from './IAccount';
import {IPosition} from './IPosition';

export interface IEmployee {
  employeeId: string;
  employeeName: string;
  employeeBirthday: string;
  employeeGender: boolean;
  employeeIdCard: string;
  employeeEmail: string;
  employeeAddress: string;
  employeePhone: string;
  employeeSalary: number;
  urlImage: string;
  deleteFlag: boolean;
  account: IAccount;
  position: IPosition;
}
