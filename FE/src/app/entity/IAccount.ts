import {IAccountRole} from "./IAccountRole";
import {IEmployee} from "./IEmployee";

export interface IAccount {
  accountId: number;
  userName: string;
  encryptPw: string;

  employee: IEmployee;
  accountRoleList: IAccountRole[];

}
