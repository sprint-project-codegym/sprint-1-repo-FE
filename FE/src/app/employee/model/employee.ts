import {IPosition} from "./position";

export interface IEmployee {
  employeeId: string;
  employeeName: string;
  employeeBirthday: string;
  employeeGender: boolean;
  employeeIdCard: string;
  employeeGmail: string;
  employeeAddress: string;
  employeePhone: string;
  employeeSalary: number;
  urlImage:string;
  deleteFlag: boolean;
  position: IPosition;
}
